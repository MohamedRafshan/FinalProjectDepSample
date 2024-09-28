'use client'

import {  useState,useEffect,useRef } from "react";
import { useRouter } from "next/navigation";
import BadgeAvatars from "./avatar";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { format } from "date-fns";




const ConvItem =({conversation,currentCovId}) => {


    const [lastMessage, setLastMessage] = useState(() => {
        if (conversation.messages.length > 0) {
            const lastMsg = conversation.messages[0];
            if (lastMsg.body) {
                return lastMsg.body;
            } else if (lastMsg.image) {
                return "Sent an Image";
            } else {
                return "No messages yet";
            }
        } else {
            return "No messages yet";
        }
    });

    const [lastMessageTime, setLastMessageTime] = useState(() => {
        if (conversation.messages.length > 0) {
            const lastMsg = conversation.messages[0];
            if (lastMsg.updatedAt) {
                return lastMsg.updatedAt;
            } 
        } else {
            return new Date();
        }
    });

    const router = useRouter();
    const {user} = useUser();
    const bottomRef = useRef();
  


    useEffect(() => {
        pusherClient.subscribe(currentCovId)
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message) => {
            if(message.body !== null){
                setLastMessage(message.body)
                setLastMessageTime(message.updatedAt)
            }else {
                setLastMessage("Send an Image")
                setLastMessageTime(message.updatedAt)
            }

        }

        pusherClient.bind('messages:new', messageHandler)

        return () => {
            pusherClient.unsubscribe(currentCovId);
            pusherClient.unbind('messages:new', messageHandler);
        }
    },[currentCovId])

    const handleRouting =()=>{
        router.push(`/conversation/${user.id}/${conversation.id}`)
    }


    return ( 
        <div className={cn("flex items-center max-w-72 gap-2 p-3 cursor-pointer hover:bg-gray-300",(conversation.id === currentCovId ) && "bg-gray-300")} onClick= {handleRouting}>
            <BadgeAvatars user ={conversation.users[0]?.name || 'User'}/>
            <div className="overflow-hidden px-2 p-1 w-full">
                <div className="flex justify-between items-center w-full">
                    <h4 className="text-lg font-semibold leading-none overflow-hidden text-ellipsis whitespace-nowrap">{conversation.users[0]?.name.split(' ')[0] || 'User'}</h4>
                    <p className="text-gray-500 text-xs leading-none overflow-hidden text-ellipsis whitespace-nowrap">{ format(new Date(lastMessageTime), 'h:mm a')}</p>
                </div>
                <div className="flex mt-1 justify-between items-center w-full">
                    <p className="text-gray-500 text-xs leading-none overflow-hidden text-ellipsis whitespace-nowrap">{lastMessage}</p>
                    <span className="text-xs  p-1 bg-green-600 rounded-full font-semibold">12</span>
                </div>
            </div>
        </div>
     );
}
 
export default ConvItem;