'use client'

import  React,{useState,useEffect} from "react"
import StarRatings from 'react-star-ratings';
import { useRouter } from "next/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function StoreCard({store}) {

    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    },[])


    if(!isMounted) return null;

    const storeRouting = () =>{
      router.push(`/store/${store.id}`);
      
    }

  return (
    <Card className="w-[220px] hover:scale-105 transition hover:shadow-md cursor-pointer bg-green-100" onClick={storeRouting}>
        <CardHeader className="relative">
          <div className="absolute inset-y-1">
            <img 
                src={'/best-performance.jpg' }
                alt="performance" 
                className="w-12 h-12 object-cover rounded-lg" 
            />
            </div>
            <img 
                src={store.imageUrl || '/store.jpg' }
                alt="store" 
                className="w-full h-[200px] object-cover rounded-lg" 
            />
        </CardHeader>
      <CardTitle className="px-3 overflow-hidden mr-3 py-2">{store.name}</CardTitle>
      <CardDescription className="ml-3 flex gap-4 my-2">

        {/* have to update after creating the rating schema */}
        <StarRatings
          rating={5}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension="15px"
          starSpacing="0.5px"
          />

      </CardDescription>
    </Card>
  )
}
