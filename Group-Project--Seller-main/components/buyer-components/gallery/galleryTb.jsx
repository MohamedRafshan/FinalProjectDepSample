import Image from "next/image";
import {Tab} from "@headlessui/react"
import {cn} from "@/lib/utils"



const GalleryTab = ({image}) => {
    return ( 
        <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
            {({selected})=>(
                <div>
                    <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                        <Image
                            fill
                            src={image.url}
                            alt="Image"
                            className="object-cover object-center"

                        />

                    </span>
                    <span
                        className={cn(
                            "absolute inset-0 rounded-md ring-2 ring-offset-0",
                            selected ? "ring-gray-600" : "ring-transparent"
                        )}
                    />
                </div>
            )}
        </Tab>
     );
}
 
export default GalleryTab;