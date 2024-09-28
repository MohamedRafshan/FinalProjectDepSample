import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { userId } = auth();
        const storeId = params.storeId;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!storeId) {
            return new NextResponse("Store ID not provided", { status: 400 });
        }

        const url = new URL(req.url);
        const category = url.searchParams.get('category') || 'all';
        const product = url.searchParams.get('product') || 'all';
        const duration = url.searchParams.get('duration') || 'monthly';



        let startDate, endDate;
        const currentDate = new Date();

        if (duration === 'weekly') {
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 7);
        } else if (duration === 'monthly') {
            startDate = new Date();
            startDate.setMonth(currentDate.getMonth() - 1);
        } else if (duration === 'yearly') {
            startDate = new Date();
            startDate.setFullYear(currentDate.getFullYear() - 1);
        }

        endDate = currentDate;

        const orders = await prisma.order.findMany({
            where: {
                status: "SUCCESS",
                storeIds: {
                    has: storeId,
                },
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                }
            },
            include: {
                products: true,
            },
        });

        
        // Filter products in orders based on selected category or product
        const filteredOrders = orders.map(order => {
            if (category !== 'all') {
                order.products = order.products.filter(prod => prod.categoryId === category);
            }
            if (product !== 'all') {
                order.products = order.products.filter(prod => prod.id === product);
            }
            return order;
        }).filter(order => order.products.length > 0);

        const salesData = {};

        filteredOrders.forEach(order => {
            const date = order.createdAt.toISOString().split('T')[0]; // Extract the date part
            if (!salesData[date]) {
                salesData[date] = 0;
            }
            salesData[date]++;
        });

        const formattedSalesData = Object.entries(salesData).map(([date, count]) => ({
            label: date,
            value: count,
        }));
        
        return NextResponse.json(formattedSalesData);

    } catch (error) {
        return new NextResponse("Error fetching sales data", { status: 500 });
    }
}
