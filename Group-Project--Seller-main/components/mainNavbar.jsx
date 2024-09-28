'use client'


import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { SquareKanban ,Folders ,PackagePlus , ShoppingCart, MessageCircle, Settings} from "lucide-react";


const MainNavbar = ({className,userId,...props}) => {

    const pathname = usePathname();

    const params = useParams();
    

    const routes = [
        {
            href:`/${params.storeId}`,
            label:"Overview",
            active: pathname === `/${params.storeId}`,
            icon: <SquareKanban />
        },
        {
            href:`/${params.storeId}/categories`,
            label:"Categories ",
            active: pathname === `/${params.storeId}/categories`,
            icon: <Folders />
        },
        {
            href:`/${params.storeId}/products`,
            label:"Products",
            active: pathname === `/${params.storeId}/products`,
            icon:<PackagePlus />
        },
        {
            href:`/${params.storeId}/orders`,
            label:"Orders",
            active: pathname === `/${params.storeId}/orders`,
            icon: <ShoppingCart />
        },
        {
            href:`/conversation/${userId}`,
            label:"Messages",
            active: pathname === `/${params.storeId}/messages`,
            icon: <MessageCircle />
        },
        {
            href:`/${params.storeId}/settings`,
            label:"Settings",
            active: pathname === `/${params.storeId}/settings`,
            icon: <Settings />
        },


    ]
    return ( 
        <nav
            className={cn("flex items-center space-x-4",className)}
        >
            
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}

        </nav>
     );
}
 
export default MainNavbar;