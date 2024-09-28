import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {

    

   try {

    const{userId} = auth();
    const body = await req.json();


    const {
        UserFullName,
        UserPhoneNum,
        UserEmail,
        province, 
        district,
        area, 
        address 
    } = body;

    

    if (!userId) {
      return NextResponse.forbidden("Unauthorized");
    }
  
    const buyer = await prisma.buyer.create({

      data: {
        userId,
        name:UserFullName,
        phoneNum:UserPhoneNum,
        email:UserEmail,
        province,
        district,
        area,
        address,
      },
    });
  
    return NextResponse.json(buyer);
    
   } catch (error) {
        return new NextResponse("Failed to create an account. Please try again.",{status:500})
   }
}



