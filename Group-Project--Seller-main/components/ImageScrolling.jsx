
'use client'

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  // Array of image paths
  const images = [
    "/bg-images/brownField.jpg",
    "/bg-images/greenField.jpg",
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Carousel
      loop={true}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div>
              <img 
                src={image} 
                alt={`Slide ${index + 1}`} 
                className="bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[80vh] w-full" 
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default CarouselPlugin;
