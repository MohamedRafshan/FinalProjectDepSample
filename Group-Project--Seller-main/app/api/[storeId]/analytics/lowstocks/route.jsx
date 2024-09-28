
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";


export async function GET(req,{ params }){
    try {
        const {userId} = auth();
        const storeId = params.storeId;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = new URL(req.url);
        const count = parseInt(url.searchParams.get('count'), 10) || 10;

        const products = await prisma.product.findMany({
            where:{
                storeId,
                availableCount: {
                    lt: count
                }
            },
            include:{
                category: true
            },
            orderBy:{
                availableCount: 'asc'
            }
            
        })
        const formattedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            category: product.category.name,
            price: product.price,
            stock: product.availableCount
        }));
        
        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error('Error fetching  data', error);
        return new NextResponse("Error fetching  data", { status: 500 });
    }
}