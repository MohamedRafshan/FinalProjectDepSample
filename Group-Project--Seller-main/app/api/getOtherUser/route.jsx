import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {

        const body = req.json();
        const {otherUserId} = body;

        if(!otherUserId){
            return new NextResponse("otherUserId is missing",{status:400});
        }

        const seller = await prisma.seller.findUnique({
            where:{
                sellerid:otherUserId
            }
        })

        if(seller){
            return  NextResponse.json(seller);
        }

        const buyer = await prisma.buyer.findUnique({
            where:{
                userId:otherUserId
            }
        })

        if(buyer){
            return  NextResponse.json(buyer);
        }
        
        return NextResponse("user not found",{status:404});

    } catch (error) {
        return new NextResponse("error inside the get other user",{status:500});
    }
}