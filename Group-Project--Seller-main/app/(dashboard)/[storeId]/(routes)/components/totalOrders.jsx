'use client'

import { useEffect,useState } from "react";


const TotalOrders = ({amount}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
    },[]);

    if (!isMounted) {
        return null;
    }


    return ( 
        <>
            {amount}
        </>
     );
}
 
export default TotalOrders;