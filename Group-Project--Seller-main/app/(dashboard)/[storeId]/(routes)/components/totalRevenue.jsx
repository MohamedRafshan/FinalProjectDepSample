'use client'

import { useEffect,useState } from "react";
import { formatter } from "@/lib/utils";

const TotalRevenue = ({amount}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
    },[]);

    if (!isMounted) {
        return null;
    }


    return ( 
        <>
            {formatter.format(amount)}
        </>
     );
}
 
export default TotalRevenue;