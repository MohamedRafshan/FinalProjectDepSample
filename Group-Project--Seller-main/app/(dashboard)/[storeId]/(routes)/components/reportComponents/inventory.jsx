'use client'

import { useState,useEffect } from "react";

const Inventory = () => {

    const [isMounted,setIsMounted] = useState(false);


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }

    return ( 
        <div>
            {/* 3. Inventory Reports
                Date Range: Last 7 days, Last 30 days, This month, Last month, Custom range
                Product Category: All categories, Specific category
                Stock Status: All statuses, In stock, Out of stock, Low stock
                Supplier: All suppliers, Specific supplier
                Warehouse/Location: All locations, Specific warehouse/location */}
        </div>
     );
}
 
export default Inventory;