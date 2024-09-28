import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function POST(req){
    try {

        const {userId} = auth();

        const body = await req.json();
        const { storeId } = body;

        if(!storeId || !userId){
            return new NextResponse("storeId or userId is missing",{status:400})
        }

        const seller = await prisma.seller.findFirst({
            where:{
                storeId
            }
        })

        if(!seller){
            return new NextResponse("seller not found",{status:404})
        }

        const convExist = await prisma.conversation.findFirst({
            where:{
                userIds:{
                    hasEvery:[userId,seller.sellerid]
                }
            }
        })

        if(convExist){
            return NextResponse.json(convExist);
        }

        const conversation = await prisma.conversation.create({
            data:{
                userIds:[userId,seller.sellerid]
            }
        }) 

        await pusherServer.trigger(userId,'conversation:new',conversation)
        
        return NextResponse.json(conversation);
        
    } catch (error) {
        return new NextResponse("error in the create the conversation",{status:500})
    }
}