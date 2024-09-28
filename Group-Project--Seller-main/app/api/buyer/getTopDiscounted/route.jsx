import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const products = await prisma.product.findMany({
      where: {
        discount: {
          gt: 0,
        },
      },
      include:{
        category:true,
        reviews:true
      },
      orderBy: {
        discount: 'desc', 
      },
      take: 10, 
    });

   
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching top discounted products", error);
    return new NextResponse("Error fetching top discounted products", { status: 500 });
  }
};


