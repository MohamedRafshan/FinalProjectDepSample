

import prisma from "@/lib/prismadb";


const getStoreRating = async(storeId) => {

    const reviews = await prisma.review.findMany({
        where:{
            storeId: storeId
        }
    })

    
    const rating = reviews.reduce((acc, review) => {
        return acc + review.rating;
    }, 0)

    let totalRating = rating / reviews.length;

    return totalRating.toFixed(1);
}

export default getStoreRating;