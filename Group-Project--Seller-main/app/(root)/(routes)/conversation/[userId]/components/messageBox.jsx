'use client'

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";


const MessageBox = ({message,OtherUserName,receiverId }) => {

    const {userId} = useParams();

    return ( 
        <div className={cn("flex justify-start mx-3 items-end", (userId === message.senderId) && "justify-end")}>
            <div className="flex flex-col my-2">
                {(message.image === null) ? 
                    <div className={cn("p-2 px-3 relative rounded-md bg-gray-200 text-sm max-w-2/3 mx-3 flex flex-col", (userId === message.senderId) && "bg-blue-500 text-white justify-end")}>
                        <p>{message.body}</p>
                    </div>
                    : 
                    <Image
                        src={message.image}
                        alt="image"
                        width={200}
                        height={200}
                        className={cn("rounded-md mx-3", (userId === message.senderId) && "self-end")}
                    />
                }
                <span className={cn("text-xs font-semibold text-gray-400 mt-1", (userId === message.senderId) ? "self-end mr-3" : "self-start ml-3")}>
                    { format(new Date(message.createdAt), 'h:mm a')}
                </span>
            </div>
        </div>
     );
}
 
export default MessageBox;