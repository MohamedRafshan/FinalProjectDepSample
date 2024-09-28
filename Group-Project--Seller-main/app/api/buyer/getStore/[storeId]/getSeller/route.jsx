import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {
        const seller = await prisma.seller.findUnique({
            where:{
                storeId:params.storeId
            },
        })

        if(!seller){
            return new NextResponse("seller not found",{status:404})
        }

        return NextResponse.json(seller)
        
    } catch (error) {
        return new NextResponse("error inside the seller GET",{status:500})
    }

}

