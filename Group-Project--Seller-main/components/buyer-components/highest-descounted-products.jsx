'use client'

import * as React from "react"
 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { ProductCard } from "./product-card";


const HighestDesProductList = ({products}) => {
    return ( 
        <>
        <Carousel
            opts={{
                align: "center",
            }}
            className="relative overflow-hidden sm:px-15 md:px-20"
            >
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20" />
            <CarouselContent>
                {products && products.map((product, index) => (
                <CarouselItem key={index} className="sm:basis-1/3 md:basis-2/5 lg:basis-1/5">
                    <ProductCard key={index} product={product}/>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20" />
        </Carousel>
        </>
   
     );
}
 
export default HighestDesProductList;

