
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import ModalProvider from "@/providers/modal-provider";
import ClientToastWithRedirect from '@/components/toastCall';

export default async function SetupPageLayout({children}) {

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

      return (
        <ClientToastWithRedirect
          message="You are not allowed to create a seller account because you already have a buyer account."
          redirectTo="/"
        />
      )
    }

    const store = await prisma.store.findFirst({
        where:{
            ownerId:userId
        }
    });

    if(store){
        redirect(`/${store.id}`)
    }


  return (
    <>
     <ModalProvider/>
      {children}
    </>
  )
}