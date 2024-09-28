'use client'

import { useState,useEffect } from "react";

const Delivery = () => {

    const [isMounted,setIsMounted] = useState(false);


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }

    return ( 
        <div>
            {/* Shipping and Fulfillment Reports
            Date Range: Last 7 days, Last 30 days, This month, Last month, Custom range
            Shipping Method: All methods, Standard, Express, etc.
            Order Status: All statuses, Pending, Shipped, Delivered, Cancelled
            Carrier: All carriers, Specific carrier
            Region: All regions, Specific region */}
        </div>
     );
}
 
export default Delivery;