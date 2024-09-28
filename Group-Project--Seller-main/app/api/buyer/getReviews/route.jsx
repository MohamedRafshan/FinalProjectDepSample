import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");


        const reviews = await prisma.review.findMany({
            where:{
                productId
            }
        })


        return NextResponse.json(reviews)

    } catch (error) {
        return new NextResponse("error in the reviews fetching",{status:500})
    }
}