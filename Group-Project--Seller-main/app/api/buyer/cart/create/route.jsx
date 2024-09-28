import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req,{params}){
    const {userId}= auth()

    if(userId){
        try {
            const {id} = await req.json();

            //check existing cart
            const existingCart = await prisma.cart.findFirst({
                where:{
                    userId
                }
            })

            if(existingCart){

                if (!existingCart.productIds.includes(id)) {
                    // If not, push the new product ID into the array
                    const updatedProductIds = [...existingCart.productIds, id];

                    // Update the cart with the new productIds array
                    const updatedCart = await prisma.cart.update({
                        where: {
                            userId: userId,
                        },
                        data: {
                            productIds: updatedProductIds, // Update the productIds array
                        },
                    });
                }
            }else{
                await prisma.cart.create({
                    data:{
                        userId,
                        productIds:[id]
                    }
                })
            }

        return NextResponse.json({message:"item added to cart"})
        
        } catch (error) {
            console.log("error adding item to cart",error)
        }
    }
}

