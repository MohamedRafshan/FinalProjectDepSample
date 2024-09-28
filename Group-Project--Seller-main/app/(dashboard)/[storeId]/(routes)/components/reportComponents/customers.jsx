'use client'

import { useState,useEffect } from "react";

const Customer = () => {

    const [isMounted,setIsMounted] = useState(false);


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }

    return ( 
        <div>
            {/* Customer Reports
            Date Range: Last 7 days, Last 30 days, This month, Last month, Custom range
            Customer Type: All customers, New customers, Returning customers
            Region: All regions, Specific region
            Purchase Frequency: All frequencies, Single purchase, Multiple purchases
            Spending Range: All ranges, Custom range */}
        </div>
     );
}
 
export default Customer;