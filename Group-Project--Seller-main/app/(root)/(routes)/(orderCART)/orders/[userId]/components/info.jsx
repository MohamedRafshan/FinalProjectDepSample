'use client'


import { useEffect,useState } from "react";


const DelivaryDetails = ({buyer}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
            setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return ( 
        <div className="relative p-2 px-4">
            <h1 className="font-bold text-lg">Address</h1>
            <div className="border p-3">
                <h2 className="text-sm">{buyer.name},{buyer.phoneNum},</h2>
                <h2 className="text-sm">{buyer.address},</h2>
                <h2 className="text-sm">{buyer.area},</h2>
                <h2 className="text-sm">{buyer.district},</h2>
                <h2 className="text-sm">{buyer.province}.</h2>
            </div>
        </div>
     );
}
 
export default DelivaryDetails;