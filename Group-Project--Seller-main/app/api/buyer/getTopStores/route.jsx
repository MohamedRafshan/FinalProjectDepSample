import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const products = await prisma.product.findMany();


    const sortedProducts = products
      .map(product => ({
        ...product,
        orderCount: product.orderIds.length
      }))
      .sort((a, b) => b.orderCount - a.orderCount); 


    const topProducts = sortedProducts.slice(0, 10);

    const ids = topProducts.map((item)=>item.storeId)

    const stores = await prisma.store.findMany({
      where:{
        id:{
          in:ids
        }
      }
    })


    return NextResponse.json(stores);
  } catch (error) {
    console.error("Error fetching top selling products", error);
    return new NextResponse("Error fetching top selling products", { status: 500 });
  }
}
