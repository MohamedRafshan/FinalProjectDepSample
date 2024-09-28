import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const products = await prisma.product.findMany(
      {
        include:{
          reviews:true
        }
      }
    );


    const sortedProducts = products
      .map(product => ({
        ...product,
        orderCount: product.orderIds.length
      }))
      .filter((product) => product.orderCount > 0)
      .sort((a, b) => b.orderCount - a.orderCount); 


    const topProducts = sortedProducts.slice(0, 10);

  
    return NextResponse.json(topProducts);
  } catch (error) {
    console.error("Error fetching top selling products", error);
    return new NextResponse("Error fetching top selling products", { status: 500 });
  }
}
