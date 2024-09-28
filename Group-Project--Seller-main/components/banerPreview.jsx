'use client'

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FaFacebook,FaYoutube,FaInstagram, FaPhone } from 'react-icons/fa';
import { cn } from "@/lib/utils";


const BannerPreview = ({
    disLabel,
    imagUrl,
    facebook,
    youtube,
    instagram,
    className

}) => {

    return ( 
        <div className="flex justify-center items-center">
            <div className={cn("relative w-full",className)}>
                <AspectRatio ratio={20 / 9}>
                    {imagUrl ? (
                        <Image src={imagUrl} layout="fill" alt="Image" className="flex rounded-md object-cover z-0" />
                    ) : (
                        <div className="bg-black rounded-md" />
                    )}
                    <div className="absolute inset-0 flex justify-center items-center z-0 text-center">
                        <h1 className="font-bold text-stone-950 lg:text-5xl md:text-3xl sm:text-1xl italic ">{disLabel}</h1>
                    </div>
                    <div className="absolute bottom-3 right-3 z-0" >
                       {facebook && <a href={facebook}><FaFacebook className="w-6 h-6 text-blue-800 mt-2 cursor-pointer"/></a>}
                        {youtube && <a href={youtube}><FaYoutube className="w-6 h-6 text-red-800 mt-2 cursor-pointer"/></a>}
                        {instagram && <a href={instagram}><FaInstagram className="w-6 h-6 text-rose-400 mt-2 cursor-pointer"/></a>}
                    </div>
                </AspectRatio>
            </div>
        </div>
    );
}
 
export default BannerPreview;