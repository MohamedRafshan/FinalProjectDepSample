'use client'

import { useState,useEffect } from "react";

const Revenue = () => {

    const [isMounted,setIsMounted] = useState(false);


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }

    return ( 
        <div>
            {/* Order Reports
                Date Range: Last 7 days, Last 30 days, This month, Last month, Custom range
                Order Status: All statuses, Pending, Shipped, Delivered, Cancelled
                Customer: All customers, Specific customer
                Shipping Method: All methods, Standard, Express, etc.
                Region: All regions, Specific region */}
        </div>
     );
}
 
export default Revenue;