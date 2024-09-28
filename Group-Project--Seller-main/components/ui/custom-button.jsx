import { Button } from "./button";
import { cn } from "@/lib/utils";

const CustomButton = ({
    onClick,
    className,
    icon,
    name,
    variant,
    disabled
}) => {
    return ( 
        <Button
            onClick={onClick}
            className={cn("flex gap-3 rounded-lg",className)}
            variant={variant}
            disabled={disabled}
        >
            {icon}
            {name}
        </Button>
     );
}
 
export default CustomButton;