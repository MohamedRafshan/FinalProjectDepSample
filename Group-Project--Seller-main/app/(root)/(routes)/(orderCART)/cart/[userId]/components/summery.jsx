'use client'

import { useEffect,useState} from "react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/addtocardStore";
import payCart from "@/hooks/addtoPayCart";
import { formatter } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import axios from "axios";



const Summery = ({buyer}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const paycartItems = payCart((state)=>state.itemsToPay);
    const items = useCart((state)=>state.items)

    //subtotal 
    const basePriceTotal = paycartItems.reduce((acc, item) => {
        return acc + item.price;
    },0)

    //discount
    const discountTotal = paycartItems.reduce((acc, item) => {

        const discount_value  = (item.price * (item.discount / 100));

        return acc + discount_value;
    },0)

    //delivery charge
    const deliveryCharge = basePriceTotal*0.05;


    //subtotal
    const subTotal = basePriceTotal - discountTotal + deliveryCharge;

    const data ={
        
        first_name:buyer?.name,
        last_name : "",
        email :buyer?.email,
        phone :buyer?.phoneNum,
        address :buyer?.address,
        city :buyer?.area,
        country :"Sri Lanka",
        productIds : paycartItems.map(item => item.id),
        items:paycartItems.map(item => item.name).join(','),
        currency : "USD",
        amount : parseFloat(subTotal).toFixed(2),
        storeIds : paycartItems.map((item)=>item.storeId)
    }

   
   
    const handlePayment = async () => {
      setIsLoading(true);
      try {
          const res = await axios.post('/api/checkout/createPayment', data);

          if (typeof window.payhere !== 'undefined') {
              window.payhere.startPayment(res.data);
          } else {
              console.error("PayHere SDK not loaded.");
          }
      } catch (error) {
          console.error("Error initiating payment:", error);
      } finally {
          setIsLoading(false);
        //   cart.removeAll();

      }
  };



    return ( 
        <div className="rounded-lg bg-gray-100 px-10 py-5  md:mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-8">
                Order Summery
            </h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 ">
                        Base amount
                    </div>
                    <p>{formatter.format(basePriceTotal)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 ">
                        DiscountValue
                    </div>
                    <p className="text-red-700 font-semibold text-xs">- {formatter.format(discountTotal)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 ">
                    DeliveryCharge
                    </div>
                    <p className="text-green-700 font-semibold text-xs">+ {formatter.format(deliveryCharge)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-semibold text-gray-900 ">
                    SubTotal
                    </div>
                    <p className="font-bold">{formatter.format(subTotal)}</p>
                </div>
            </div>
            <Button
                disabled={paycartItems.length === 0 || isLoading}
                className="w-full mt-6"
                onClick={handlePayment}
            >
                {isLoading ? "Processing..." : "Checkout"}
            </Button>
        </div>
     );
}
 
export default Summery;