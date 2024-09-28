import prisma from "@/lib/prismadb";

const getTotalRevenue = async (storeId) => {
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

    
    const totalRevenue = orders.reduce((sum, order) => {
      
      const relevantProducts = order.products.filter(product => product.storeId === storeId);
      
      
      const orderTotal = relevantProducts.reduce((productSum, product) => productSum + product.price, 0);
      
      return sum + orderTotal;
    }, 0);

    return totalRevenue;

  } catch (error) {
    console.error('Error calculating total revenue:', error);
    throw new Error('Could not calculate total revenue');
  }
};

export default getTotalRevenue;
