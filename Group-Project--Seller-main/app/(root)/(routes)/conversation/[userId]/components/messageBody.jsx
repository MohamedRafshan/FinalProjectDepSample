'use client'

import React,{useState,useEffect,useRef} from "react";
import MessageBox from "./messageBox";
import axios from "axios";
import { useParams } from "next/navigation";
import { format, isSameDay } from "date-fns";
import { pusherClient } from '@/lib/pusher';
import { find } from "lodash";

const MessageBody = ({currentCov,OtherUserName,receiverId }) => {

    const [messages, setMessages] = useState(currentCov.messages);
    const {userId} = useParams();
    const bottomRef = useRef();

    // useEffect(() => {
    //     axios.patch(`/api/conversation/${userId}/seen`,{
    //         conversationId: currentCov.id
    //     })
    // },[currentCov.id]);

    useEffect(() => {
        pusherClient.subscribe(currentCov.id)
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message) => {
            setMessages((current)=>{
                if(find(current,{id:message.id})){
                    return current;
                }

                return [...current,message];
            })
        }

        pusherClient.bind('messages:new', messageHandler)

        return () => {
            pusherClient.unsubscribe(currentCov.id);
            pusherClient.unbind('messages:new', messageHandler);
        }
    },[currentCov.id])



    const renderMessages = () => {
        let lastMessageDate = null;

        return messages.map((message, index) => {
            const messageDate = new Date(message.createdAt);
            const shouldShowDateSeparator = !lastMessageDate || !isSameDay(lastMessageDate, messageDate);
            lastMessageDate = messageDate;

            return (
                <React.Fragment key={index}>
                    {shouldShowDateSeparator && (
                        <div className="text-muted-foreground font-semibold flex w-full justify-center my-5 text-sm">
                            {format(messageDate, 'MMMM d, yyyy')}
                        </div>
                    )}
                    <MessageBox message={message} OtherUserName={OtherUserName} receiverId={receiverId} />
                    <div ref={bottomRef}/>
                </React.Fragment>
            );
        });
    };

    return (
        <div>
            {currentCov && renderMessages()}
        </div>
    );
};
export default MessageBody;