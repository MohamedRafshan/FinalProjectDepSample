
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {

        const sellerExist = await prisma.seller.findUnique({
            where: {
                sellerid:params.userId
            }
        })

        if(sellerExist){
            return new NextResponse("Seller exist", {status: 400})
        }

        const buyer = await prisma.buyer.findUnique({
            where: {
                userId:params.userId
            }
        })

        return NextResponse.json(buyer)

    } catch (error) {
        return new NextResponse("Error inside the getBuyer route: ", {status: 500})
    }
}