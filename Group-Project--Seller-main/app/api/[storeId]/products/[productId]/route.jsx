import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";




export async function GET( req, {params} ) {

  const { productId,storeId } = params;

  try {

      if (!productId) {
        return NextResponse.json({ error: "productId Id Is Required" }, { status: 400 });
      }

      if (!storeId) {
        return NextResponse.json({ error: "storeId Id Is Required" }, { status: 400 });
      }

     const product = await prisma.Product.findUnique({
      where:{
          id:productId,
      },
      include:{
        category:true,

      }

     })     

      return NextResponse.json(product);
  } catch (error) {
      console.error("error inside the product GET",error);
      return new NextResponse({ status: 500 },"Internal Server Error");
      
  }
}


// in here params should be as a second argument.if it first argument it will not works 
export async function PATCH(req, { params }) {
  
    try {
      const { userId } = auth();
      const { productId,storeId } = params;

      const body = await req.json();


      const {
        name,
        imageUrls,
        price,
        categoryId,
        discount,
        isDisplay,
        availableCount,
        description,
        mainCategory
      } = body;
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!name) {
        return new NextResponse("label is required", { status: 400 });
      }
      if (!imageUrls || !imageUrls.length) {
        return new NextResponse("images is required", { status: 400 });
      }
      if (!price) {
        return new NextResponse("price is required", { status: 400 });
      }
      if (!categoryId) {
        return new NextResponse("categoryId is required", { status: 400 });
      }
      if (!availableCount) {
        return new NextResponse("availableCount is required", { status: 400 });
      }
      if (!productId) {
        return NextResponse.json({ error: "productId Id Is Required" }, { status: 400 });
      }
      if (!storeId) {
        return NextResponse.json({ error: "storeId Id Is Required" }, { status: 400 });
      }
      
      const storebyuserId = await prisma.store.findFirst({
        where:{
          id:storeId,
          ownerId:userId
        }
      })
  
      if(!storebyuserId){
        return new NextResponse("Unauthorized", { status: 403 });
      }
  
  
      const product = await prisma.Product.update({
          where: {
            id: productId,
          },
          data: {
            storeId ,
            name,
            price ,
            discount ,
            categoryId,
            imageUrls,
            isDisplay,
            availableCount,
            description,
            mainCategory
          }
        
      });
  
      return NextResponse.json(product);

    } catch (error) {
      console.error("error inside the product PATCH", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

// in here params should be as a second argument.if it first argument it will not works 
export async function DELETE( req, {params} ) {

  try {
        const {userId}=  auth(); 
        const { productId,storeId } = params;
        
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!productId) {
          return NextResponse.json({ error: "productId Id Is Required" }, { status: 400 });
        }
        if (!storeId) {
         
          return NextResponse.json({ error: "storeId Id Is Required" }, { status: 400 });
        }
        const storebyuserId = await prisma.store.findFirst({
          where:{
            id:storeId,
            ownerId:userId
          }
        })
    
        if(!storebyuserId){
          return new NextResponse("Unauthorized", { status: 403 });
        }
       const product = await prisma.Product.deleteMany({
        where:{
            id:productId,
        },

       })     

        return NextResponse.json(product);
    } catch (error) {
        console.error("error inside the product PATCH",error);
        return new NextResponse({ status: 500 },"Internal Server Error");
        
    }
}