import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {
        const {subCategoryId} = params;

        const products = await prisma.product.findMany({
            where:{
                categoryId:subCategoryId
            },
            include:{
                reviews:true
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        return new NextResponse("error in the getSameSubCategoryProducts ",{status:500});
    }
}