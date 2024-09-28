import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import ClientToastWithRedirect from "@/components/toastCall"
import Chat from "@/components/chatBot"


export default async function BuyerPageLayout({children}) {

    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    const buyerExist = await prisma.buyer.findFirst({
        where:{
            userId
        }
    });


    if(buyerExist){
        redirect("/")
    }

    const sellerExist = await prisma.seller.findFirst({
        where:{
            sellerid:userId
        }
    });


    if(sellerExist){
        return (
            <ClientToastWithRedirect
              message="You are not allowed to create buyer account.because you have already seller account."
              redirectTo="/"
            />
          )
    }


  return (
    <>
        <Chat/>
      {children}
    </>
  )
}