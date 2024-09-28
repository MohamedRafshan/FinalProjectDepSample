import prisma from "@/lib/prismadb";

import CategoryForm from "./component/category-form";


const Category= async({params}) => {
    
    
    const category = await prisma.Category.findUnique({
        where:{
            id: params.categoryId
        }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-col space-y-4 p-6">
                <CategoryForm 
                    initialData={category}
                />
            </div>
            
        </div>
     );
}
 
export default Category;