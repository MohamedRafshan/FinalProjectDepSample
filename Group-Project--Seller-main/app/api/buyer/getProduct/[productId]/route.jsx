
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }){

  try {
    const product = await prisma.product.findUnique({
      where: {
        id:params.productId
      },
      include:{
        category:true,
        reviews:true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Error fetching product", { status: 500 });
  }
};


