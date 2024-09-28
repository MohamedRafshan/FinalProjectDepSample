import prisma from "@/lib/prismadb";

const getTotalOrderCount = async (storeId) => {
  try {
    
    const orders = await prisma.order.findMany({
      where: {
        status:"SUCCESS",
        storeIds: {
          has: storeId, 
        },
      },
      include: {
        products: true, 
      },
    });

    
    const totalOrderCount = orders.reduce((count, order) => {
      
      const relevantProducts = order.products.filter(product => product.storeId === storeId);
      
      return count + relevantProducts.length;
    }, 0);

    return totalOrderCount;

  } catch (error) {
    console.error('Error calculating total Order:', error);
    throw new Error('Could not calculate total Order');
  }
};

export default getTotalOrderCount;
