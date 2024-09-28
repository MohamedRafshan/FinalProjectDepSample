import prisma from "@/lib/prismadb";

const getTopSellingProducts = async (storeId) => {
    
    const orders = await prisma.order.findMany({
        where: {
            status: 'SUCCESS',
            storeIds: {
                has: storeId 
            }
        },
        include: {
            products: true
        }
    });

    
    const productOrderMap = new Map();

    orders.forEach(order => {
        order.products.forEach(product => {
            if (product.storeId === storeId) { 
                if (productOrderMap.has(product.id)) {
                    productOrderMap.set(product.id, productOrderMap.get(product.id) + 1);
                } else {
                    productOrderMap.set(product.id, 1);
                }
            }
        });
    });

    
    const productIds = Array.from(productOrderMap.keys());
    const products = await prisma.product.findMany({
        where: {
            id: { in: productIds },
            storeId: storeId
        }
    });

    
    const productOrderCounts = products.map(product => ({
        ...product,
        orderCount: productOrderMap.get(product.id) || 0
    }));

    
    const sortedProducts = productOrderCounts.sort((a, b) => b.orderCount - a.orderCount).slice(0, 20);

    
    const formattedProducts = sortedProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        orderCount: product.orderCount,
        imageUrl: product.imageUrls[0]?.url || '' 
    }));

    return formattedProducts;
}

export default getTopSellingProducts;
