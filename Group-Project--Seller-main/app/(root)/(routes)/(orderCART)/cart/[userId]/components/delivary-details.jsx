'use client'

import { Edit } from "lucide-react";
import { useEffect,useState } from "react";
import useBuyerModal from "@/hooks/useBuyerModal";

const DelivaryDetails = ({buyer}) => {

    const [isMounted, setIsMounted] = useState(false);
    const onOpen = useBuyerModal((state) => state.onOpen);

    useEffect(() => {
            setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return ( 
        <div className="relative p-2 px-4">
            <h1 className="font-bold text-xl">Delivary Info</h1>
            <div className="border p-3">
                <h2 className="text-sm">{buyer.name},{buyer.phoneNum},</h2>
                <h2 className="text-sm">{buyer.address},</h2>
                <h2 className="text-sm">{buyer.area},</h2>
                <h2 className="text-sm">{buyer.district},</h2>
                <h2 className="text-sm">{buyer.province}.</h2>
            </div>
            <Edit
                onClick={onOpen} 
                className="absolute top-5 right-1 w-8 h-8 p-1.5 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 transition"
                />
        </div>
     );
}
 
export default DelivaryDetails;