'use client';

import React,{useState,useEffect} from 'react';
import { formatter } from '@/lib/utils';

const TopSellingList = ({list =[]}) => {
    const [isMounted, setIsMounted] = useState(false);  

    useEffect(() => {
        setIsMounted(true);
        
    },[])

    if(!isMounted){
        return <div>Loading...</div>
    }



    return ( 
        <>
        {list.map((item,index) => (
            <div key={index} className='flex justify-between items-center items-base my-3 py-2 px-3 w-full rounded-lg border-2 hover:scale-105'>
                <div>
                    <img src={item.imageUrl} alt="image" className="w-12 h-12 rounded-lg object-cover"/>
                </div>
                <div>   
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className='text-sm font-semibold'>{formatter.format(item.price)}</p>
                </div>
                <div>
                    <span>
                        {item.orderCount}
                    </span>
                </div>
            </div>
        ))}
        </>
     );
}
 
export default TopSellingList;