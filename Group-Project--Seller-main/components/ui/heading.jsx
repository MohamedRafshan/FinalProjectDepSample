'use client'

import { cn } from "@/lib/utils";

const Heading = ({
    title,
    description,
    className
}) => {
    return ( 
        <div className={cn(className)}>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
     );
}
 
export default Heading;