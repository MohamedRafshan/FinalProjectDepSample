import prisma from "@/lib/prismadb";
import OrderBoardClient  from "./components/client";
import {format} from "date-fns";


const ProductPage = async({params}) => {
    
    const orders =await prisma.order.findMany({
        where:{
            storeIds:{
                has:params.storeId
            },
            status: "SUCCESS"

        },
        include:{
            products:true,
            buyer:true
        },
        orderBy:{
            createdAt:"desc"
        }

    })

    // Filter products within the orders to match the storeId
    const filteredOrders = orders.map(order => ({
        ...order,
        products: order.products.filter(product => product.storeId === params.storeId),
    }));


    const FormattedProducts = filteredOrders.map((order)=>({
        payId:order.payId,
        products:order.products.map((product)=>product.name).join(", "),
        status:order.status,
        amount:order.products.reduce((acc,product)=>acc+product.price,0),
        discount:order.products.reduce((acc,product)=>acc+(product.discount*product.price/100),0),
        name:order.buyer.name,
        phoneNum:order.buyer.phoneNum,
        email:order.buyer.email,
        address:order.buyer.address,
        district:order.buyer.district,
        createdAt:format(order.createdAt,"MMMM do,yyyy")
    }))

    

    return ( 
        <div className="flex-col"> 
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderBoardClient
                    data={FormattedProducts}
                />
            </div>
        </div>
     );
}
 
export default ProductPage;