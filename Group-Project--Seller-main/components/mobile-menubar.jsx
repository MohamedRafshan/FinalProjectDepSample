'use client'

import { useState } from "react";
import { SquareKanban ,Folders ,PackagePlus , ShoppingCart, MessageCircle, Settings,Menu} from "lucide-react";
import { cn } from "@/lib/utils";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/themeToggle";
import { UserButton } from "@clerk/nextjs";
  

  
  export default function MobileMenu() {

    const pathname = usePathname();

    const params = useParams();

    const routes = [
        {
            href:`/${params.storeId}`,
            label:"Overview",
            active: pathname === `/${params.storeId}`,
            icon: <SquareKanban className="mr-2 h-4 w-4"/>
        },
        {
            href:`/${params.storeId}/categories`,
            label:"Categories",
            active: pathname === `/${params.storeId}/categories`,
            icon: <Folders className="mr-2 h-4 w-4"/>
        },
        {
            href:`/${params.storeId}/products`,
            label:"Products",
            active: pathname === `/${params.storeId}/products`,
            icon:<PackagePlus className="mr-2 h-4 w-4"/>
        },
        {
            href:`/${params.storeId}/orders`,
            label:"Orders",
            active: pathname === `/${params.storeId}/orders`,
            icon: <ShoppingCart className="mr-2 h-4 w-4"/>
        },
        {
            href:`/${params.storeId}/messages`,
            label:"Messages",
            active: pathname === `/${params.storeId}/messages`,
            icon: <MessageCircle className="mr-2 h-4 w-4"/>
        },
        {
            href:`/${params.storeId}/settings`,
            label:"Settings",
            active: pathname === `/${params.storeId}/settings`,
            icon: <Settings className="mr-2 h-4 w-4"/>
        },
    
    
    ]
    
    return (
       
        <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <div className="flex items-center px-2 w-full">
                <ModeToggle/>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
            </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {routes.map((route) => (
                <DropdownMenuItem key={route.href}>
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary flex items-center px-2 w-full",
                            route.active ? "text-black dark:text-white" : "text-muted-foreground"
                        )}
                    >
                        {route.icon}
                        <span>{route.label}</span>
                    </Link>
                </DropdownMenuItem>
            ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center pl-2 z-100">
          <UserButton afterSignOutUrl="/" />
      </div>
      </>
    )
  }
  