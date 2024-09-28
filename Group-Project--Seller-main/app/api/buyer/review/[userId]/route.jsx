import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function POST(req) {

    try {
  
     const{userId} = auth();
     const body = await req.json();
  
     const {
        productId,
        storeId ,  
        buyerId ,
        payId,  
        rate, 
        comment
     } = body;
  

     if (!userId) {
       return NextResponse.forbidden("Unauthorized");
     }
   
     const review = await prisma.review.create({
        data: {
            productId,
            storeId ,  
            buyerId , 
            payId, 
            rating:rate, 
            comment
        }
     });
   
     return NextResponse.json(review);
     
    } catch (error) {
         return new NextResponse("Failed to create the review. Please try again.",{status:500})
    }
  }