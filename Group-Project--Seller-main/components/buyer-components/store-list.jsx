
'use client'
import * as React from "react"
 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {StoreCard} from "@/components/buyer-components/store-card";

const StoreCardlist = ({plist =[]}) => {
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
                {plist && plist.map((store, index) => (
                <CarouselItem key={index} className="sm:basis-1/3 md:basis-2/5 lg:basis-1/5">
                    <StoreCard key={index} store={store} />
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20" />
        </Carousel>
        </>
   
     );
}
 
export default StoreCardlist;

