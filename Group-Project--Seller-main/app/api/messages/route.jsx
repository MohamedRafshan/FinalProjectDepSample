import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { pusherServer } from "@/lib/pusher";

export async function POST(req){
    try {

        const {userId} = auth();

        const body = await req.json();

        const {message,image,conversationId,receiverId} = body;

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!receiverId || !conversationId){
            return new NextResponse("receiverId and conversationId are required", { status: 400 });
        }

        // Check if the conversation exists
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId }
        });

        if (!conversation) {
            return new NextResponse("Conversation not found", { status: 404 });
        }

        const newMessage = await prisma.Message.create({
            data:{
                senderId: userId,
                receiverId,
                body: message,   
                image ,
                conversationId 
            }
        });


        const updatedConversation = await prisma.conversation.update({
            where:{
                id: conversationId
            },
            data:{
                lastMessageAt: new Date(),
                messageIds: {
                    push: newMessage.id 
                },
                messages:{
                    connect:{
                        id: newMessage.id
                    }
                }
            },
        
        });


        await pusherServer.trigger(conversationId,'messages:new',newMessage)

        return new NextResponse(newMessage);
        
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}