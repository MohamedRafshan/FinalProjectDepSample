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

        const url = new URL(req.url);
        const category = url.searchParams.get('category') || 'all';
        const product = url.searchParams.get('product') || 'all';
        const duration = url.searchParams.get('duration') || 'last7days';

        const customFrom = url.searchParams.get('customDateRange[from]');
        const customTo = url.searchParams.get('customDateRange[to]');

        let startDate, endDate;
        const currentDate = new Date();

        if (duration === 'CustomRange' &&  customFrom && customTo) {
            startDate = new Date(customFrom);
            endDate = new Date(customTo);
        } else {
            if (duration === 'Last7days') {
                startDate = new Date();
                startDate.setDate(currentDate.getDate() - 7);
            } else if (duration === 'Last30days') {
                startDate = new Date();
                startDate.setMonth(currentDate.getMonth() - 1);
            } else if (duration === 'Last365days') {
                startDate = new Date();
                startDate.setFullYear(currentDate.getFullYear() - 1);
            }
            endDate = currentDate;
        }

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
                order.products = order.products.filter(prod => prod.categoryId === category && prod.storeId === storeId);
            }
            if (product !== 'all') {
                order.products = order.products.filter(prod => prod.id === product);
            }
            return order;
        }).filter(order => order.products.length > 0);

        
        let salesData = filteredOrders.flatMap(order => {
            return order.products.map(product => {
                return {
                    orderId: order.id,
                    payId: order.payId,
                    product: product.name, 
                    "productAmount($)": (product.price * 1 * (1 - (product.discount ? product.discount / 100 : 0))).toFixed(2), // Multiply by quantity and add $ symbol
                    "discount(%)": product.discount ? product.discount : 0, // Add % symbol
                    paymentStatus: order.status,
                    date: order.updatedAt ? new Date(order.updatedAt).toISOString().split('T')[0] : null
                };
            });
        });

        return NextResponse.json(salesData);

    } catch (error) {
        return new NextResponse("Error fetching sales data", { status: 500 });
    }
}
