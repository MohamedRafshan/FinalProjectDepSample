import prisma from "@/lib/prismadb";
import CategoryClient  from "./component/client";
import {format} from "date-fns";


const CategoryPage = async({params}) => {
    
    const categories =await prisma.Category.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
            products:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const FormattedCategories = categories.map((category)=>({
        id:category.id,
        name:category.name,
        productCount:category.products.length,
        CreatedAt:format(category.createdAt,"MMMM do,yyyy")
    }))


    return ( 
        <div className="flex-col"> 
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient
                    data={FormattedCategories}
                />
            </div>
        </div>
     );
}
 
export default CategoryPage;