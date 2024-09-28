import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {
        const categories = await prisma.category.findMany({
            where:{
                storeId:params.storeId
            },
            include:{
                products:true
            }
        })

        if(!categories){
            return new NextResponse("categories not found",{status:404})
        }

        return NextResponse.json(categories)
        
    } catch (error) {
        return new NextResponse("error inside the categories GET",{status:500})
    }

}

