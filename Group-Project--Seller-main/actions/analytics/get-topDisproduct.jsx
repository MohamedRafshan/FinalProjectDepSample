

import prisma from "@/lib/prismadb";


const getTopDiscountedProducts = async(storeId) => {

    const products = await prisma.product.findMany({
        where:{
            storeId: storeId,
            discount:{
                gt: 0
            }
        },
        orderBy:{
            discount: 'desc'
        },
    })

    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        imageUrl: product.imageUrls[0].url
    }))


    return formattedProducts;
}

export default getTopDiscountedProducts;