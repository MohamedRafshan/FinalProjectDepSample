'use client';

import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { pusherClient } from "@/lib/pusher";

const ActiveChannel = ()=>{

    const {set,add,remove} = useActiveList();
    const [activeChannel, setActiveChannel] = useState(null);

    useEffect(()=>{
        let channel = activeChannel;

        if(!channel){
           channel = pusherClient.subscribe("presence-online");
           setActiveChannel(channel);
        }

        channel.bind("pusher:subscription_succeeded", (members) => {

            const initialMembers = [];
            members.each((member) =>initialMembers.push(member.id));
            set(initialMembers);
        });

        channel.bind("pusher:member_added", (member) => {
            add(member.id);
        });


        channel.bind("pusher:member_removed", (member) => {
            remove(member.id);
        });

        return ()=>{
            if(activeChannel){
                pusherClient.unsubscribe("presence-online");
                setActiveChannel(null);
            }
        }
    },[activeChannel,add,remove,set]);

    return null;
};

export default ActiveChannel;