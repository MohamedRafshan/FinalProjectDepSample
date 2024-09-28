import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function DELETE(req,{params}){
    const {userId}= auth()

    if(userId){
        try {
            const prodId = params.prodId;
            const existingCart = await prisma.cart.findFirst({
                where:{
                    userId
                }
            })

            let productIds = []

            if(prodId == 'all'){
                productIds = []
            }else{
                productIds = existingCart.productIds.filter((productId) => productId !== prodId);
            }
            
            await prisma.cart.update({
                where:{
                    userId
                },
                data:{
                    productIds
                }
            })
         return NextResponse.json({message:"Item removed from the cart"})
        
        } catch (error) {
            console.log("error remove from the cart")
        }
    }
}