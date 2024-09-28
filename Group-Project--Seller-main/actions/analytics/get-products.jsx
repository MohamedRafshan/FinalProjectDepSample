import prisma from "@/lib/prismadb";

const getProducts = async(storeId) => {

    const products = await prisma.product.findMany({
        where:{
            storeId: storeId
        }
    })

    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
    }))


    return formattedProducts;
}

export default getProducts;