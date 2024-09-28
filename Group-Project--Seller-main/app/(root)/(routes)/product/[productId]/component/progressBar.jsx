'use client'

import { Progress } from "@/components/ui/progress"


const ProgressBar = ({
    value,
    stars,
    reviews
}) => {
    return ( 
        <div className="flex gap-x-2 space-y-2 justify-center items-baseline">
            <div className="flex gap-x-1">
                <p className="text-xs">{stars}</p>
                <p className="text-xs">stars</p>
            </div>
            <Progress value={value} className ="w-[500px] h-[10px]"/>
            <p className="text-xs">{reviews}</p>
        </div>
        
     );
}
 
export default ProgressBar;