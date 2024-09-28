
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Chat from "@/components/chatBot";

import NavBar from "@/components/navbar";

const DashBoardLayout= async({children,params}) =>{
    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }
    
    const store = await prisma.Store.findFirst({
        where:{
            id: params.storeId,
            ownerId:userId
        }
    });

    if(!store){
        redirect("/seller")
    }

    return (
        <>
            <NavBar/>
            <Chat/>
            {children}
        </>
    )
}

export default DashBoardLayout;