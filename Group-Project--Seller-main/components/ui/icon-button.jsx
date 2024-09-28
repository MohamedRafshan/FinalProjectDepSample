import { cn } from "@/lib/utils";

const IconButton = ({
    icon,
    onClick,
    className
}) => {
    return ( 
        <button 
            onClick={onClick}
            className={cn(
                "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
                ,className
            )}
        >
            {icon}
        </button>
     );
}
 
export default IconButton;