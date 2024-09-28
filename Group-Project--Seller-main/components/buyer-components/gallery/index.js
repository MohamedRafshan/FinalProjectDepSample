'use client'

import Image from "next/image";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react"
import GalleryTab from "./galleryTb"


;
const Gallery = ({images}) => {


    
    return ( 
        <TabGroup as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-4 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabPanels className="aspect-square w-full">
                        {images.map((image)=>(
                            <TabPanel key={image.url}>
                                <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                                    <Image
                                        src={image.url}
                                        alt=""
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                            </TabPanel>
                        ))}
                </TabPanels>
                <TabList className="grid grid-cols-4 gap-6 mt-6">
                    {images.map((image)=>(
                        <GalleryTab
                            key={image.url}
                            image={image}
                        />
                    ))}
                </TabList>
            </div>

        </TabGroup>
     );
}
 
export default Gallery;