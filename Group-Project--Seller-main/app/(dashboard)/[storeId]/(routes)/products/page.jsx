import prisma from "@/lib/prismadb";
import ProductBoardClient  from "./components/client";
import {format} from "date-fns";
import { formatter } from "@/lib/utils";


const ProductPage = async({params}) => {
    
    const products =await prisma.Product.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
            category:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const FormattedProducts = products.map((product)=>({
        id:product.id,
        name:product.name,
        category:product.category.name,
        imageUrls:product.imageUrls,
        availableCount:product.availableCount,
        isDisplay:product.isDisplay,
        price:formatter.format(product.price.toString()),
        discount:product.discount,
        createdAt:format(product.createdAt,"MMMM do,yyyy")
    }))

    

    return ( 
        <div className="flex-col"> 
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductBoardClient
                    data={FormattedProducts}
                />
            </div>
        </div>
     );
}
 
export default ProductPage;