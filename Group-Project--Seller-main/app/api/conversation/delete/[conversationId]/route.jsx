import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function DELETE(req,{params}){
    try {

        const {userId} = auth();
        const { conversationId } = params;


        if(!userId){
            return new NextResponse("Unauthorized")
        }

        if(!conversationId){
            return new NextResponse("conversationId is missing")
        }

        // Delete the messages related to the conversation
        const deleteMessages = await prisma.message.deleteMany({
            where: {
                conversationId: conversationId,
            },
        });

        

        // Delete the conversation itself
        const delconversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
            },
        });

        await pusherServer.trigger(delconversation.id,'delete:new',delconversation)

        return NextResponse.json(delconversation)

    } catch (error) {
        return new NextResponse("error in the delete the conversation",{status:500})
    }
}