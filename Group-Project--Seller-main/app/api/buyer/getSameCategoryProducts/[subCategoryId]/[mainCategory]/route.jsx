import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {
        const {mainCategory,subCategoryId} = params;

        const products = await prisma.product.findMany({
            where:{
                mainCategory,
                NOT:{
                    categoryId:subCategoryId
                },
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        return new NextResponse("error in the getSameMainCategoryProducts ",{status:500});
    }
}