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
        disLabel,
        UserEmail,
        UserFullName,
        UserPhoneNum,
        facebook,
        youtube,
        instagram,
        imageUrl,

       } = body;
    
  
      if (!userId) {
        
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      if (!storeId) {
       
        return NextResponse.json({ error: "Store Id Is Required" }, { status: 400 });
      }
  
      const store = await prisma.store.updateMany({
        where: {
          id: storeId,
          ownerId:userId
        },
        data: { 
            name :StoreName,
            disLabel,
            imageUrl
        }
      });

      await prisma.seller.updateMany({
        where:{
            sellerid:userId,
            storeId
            },
        data:{
            name:UserFullName,
            email:UserEmail,
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

       const store = await prisma.store.delete({
        where:{
            id:params.storeId,
            ownerId:userId
        },

       });
       
       await prisma.category.deleteMany({
        where:{
            storeId:params.storeId
        }
       });

       await prisma.product.deleteMany({
        where:{
            storeId:params.storeId
        }
        })

        await prisma.seller.delete({
            where:{
                sellerid:userId,
                storeId:params.storeId
        }})

        return NextResponse.json(store);
    } catch (error) {
        console.error("error inside the store PATCH",error);
        return new NextResponse({ status: 500 },"Internal Server Error");
        
    }
}