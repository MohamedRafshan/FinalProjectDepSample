import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// in here params should be as a second argument.if it first argument it will not works 
export async function PATCH(req, { params }) {
  
    try {
      const { userId } = auth();

      const { storeId } = params;

      const body = await req.json();
  
      
      const { 
        StoreName,
        UserEmail ,
        UserFullName ,
        UserPhoneNum,
        disLabel,
        imageUrl,
        facebook,
        youtube,
        instagram

      } = body;
    
  
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      if (!StoreName || !UserEmail || !UserFullName || !UserPhoneNum) {
        
        return NextResponse.json({ error: "Contact details are Required" }, { status: 400 });
      }
  
      if (!storeId) {
        return NextResponse.json({ error: "Store Id Is Required" }, { status: 400 });
      }
  
      const store = await prisma.store.update({
        where: {
          id: storeId,
          ownerId:userId
        },
        data: {
          name:StoreName,
          imageUrl,
          disLabel,
        }
      });

      const seller = await prisma.seller.update({
        where:{
          storeId,
          sellerid:userId
        },
        data:{
          email:UserEmail,
          name:UserFullName,
          phoneNum:UserPhoneNum,
          facebook,
          youtube,
          instagram
        }
        
      })
  
      return NextResponse.json(store);
    } catch (error) {
      console.error("error inside the store PATCH", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

// in here params should be as a second argument.if it first argument it will not works 
export async function DELETE( req, {params} ) {

    try {
        const {userId}=  auth();

        if(!userId){
            return new NextResponse({ status: 401 },"Unauthorized");
        }


        if(!params.storeId){
            return new NextResponse({ status: 400 },"Store Id Is Required");
        }

       const store = await prisma.store.deleteMany({
        where:{
            id:params.storeId,
            ownerId:userId
        },
       })   
       
       
      await prisma.seller.delete({
        where:{
          storeId:params.storeId,
          sellerid:userId
        }

      })

        return NextResponse.json(store);
    } catch (error) {
        console.error("error inside the store PATCH",error);
        return new NextResponse({ status: 500 },"Internal Server Error");
        
    }
}