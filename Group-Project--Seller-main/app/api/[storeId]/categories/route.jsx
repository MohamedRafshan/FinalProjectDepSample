import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req,{params}) {
  try {



    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }


    const categories = await prisma.Category.findMany({
      where: {
        storeId:params.storeId
      },
    });


 

    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}




export async function POST(req,{params}) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {name} = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const storebyuserId = await prisma.store.findFirst({
      where:{
        id:params.storeId,
        ownerId:userId
      }
    })

    if(!storebyuserId){
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prisma.Category.create({
      data: {
        name,
        storeId:params.storeId
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}