import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {
        const store = await prisma.store.findUnique({
            where:{
                id:params.storeId
            },
        })

        if(!store){
            return new NextResponse("store not found",{status:404})
        }

        return NextResponse.json(store)
        
    } catch (error) {
        return new NextResponse("error inside the getstore GET",{status:500})
    }

}

