"use client"

import  React ,{useState,useEffect}from "react"
import { Badge } from "@/components/ui/badge"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import SmallCard from "./buyer-components/small-card"
import watchCart from "@/hooks/watchlistStore"
import useCart from "@/hooks/addtocardStore"
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs"
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation"
import { CircleChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';


export function NavigationMenubar() {
  const pathname = usePathname();
  const [isMounted,setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  },[])

  
  const { userId } = useAuth();
  const router = useRouter()
  
  const routeOrders = () => {
    router.push(`/orders/${userId}`)
  }
  
  const routeCart = () => {
    router.push(`/cart/${userId}`)
  }
  
  const routeConversation = () => {
    router.push(`/conversation/${userId}`)
  }
  
  const wishlist = watchCart((state) => state.items)
  const cartlist = useCart((state) => state.items)
  
  const components = [
    {
      title: userId ? "Login to Seller Account" : "Create Seller Account",
      href: "/seller"
    },
    {
      title: userId ? "Login to Buyer Account" : "Create Buyer Account",
      href: "/buyer"
    },
  ]
  
  if(!isMounted) return null
  
  return (
    <NavigationMenu className="">
      <NavigationMenuList>

        {userId && <NavigationMenuItem className={cn("bg-transparent hover:bg-gray-400 rounded-2xl relative",pathname.startsWith("/conversation")&& "bg-gray-400" )} >
          <Badge className=" absolute right-0 bg-green-500 hover:bg-green-300 cursor-pointer">5</Badge>
          <NavigationMenuTrigger className="bg-transparent" onClick={routeConversation} >Messages</NavigationMenuTrigger>
        </NavigationMenuItem>}

        {userId && <NavigationMenuItem className={cn("bg-transparent hover:bg-gray-400 rounded-2xl relative",pathname.startsWith("/orders" )&& "bg-gray-400" )} >
          <NavigationMenuTrigger onClick={routeOrders} className="bg-transparent cursor-pointer">Orders</NavigationMenuTrigger>
        </NavigationMenuItem>}

        <NavigationMenuItem className="bg-transparent hover:bg-gray-400 rounded-2xl relative" >
          <Badge className=" absolute right-0 bg-green-500 hover:bg-green-300 cursor-pointer">{wishlist.length}</Badge>
          <NavigationMenuTrigger className="bg-transparent">Watch List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-72 w-[300px] rounded-md bg-gray-200">
              <div className="flex justify-center">
                <CircleChevronDown className="m-2" />
              </div>
              {wishlist.map((item) => (
                <SmallCard key={item.id} product={item} type="watchlist" />
              ))}
              <div className="my-5"/>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {userId && <NavigationMenuItem className={cn("bg-transparent hover:bg-gray-400 rounded-2xl relative",pathname.startsWith("/cart" )&& "bg-gray-400" )} >
          <Badge className=" absolute right-0 bg-green-500 hover:bg-green-300 cursor-pointer">{cartlist.length}</Badge>
          <NavigationMenuTrigger onClick={routeCart} className="bg-transparent cursor-pointer">Cart</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-72 w-[300px] rounded-md bg-gray-200">
              <div className="flex justify-center">
                <CircleChevronDown className="m-2" />
              </div>
              {cartlist.map((item) => (
                <SmallCard key={item.id} product={item} type="cart" />
              ))}
              <div className="my-5"/>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>}

        <NavigationMenuItem className="bg-transparent hover:bg-gray-400 rounded-2xl relative" >
          <NavigationMenuTrigger className="bg-transparent cursor-pointer">Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col space-y-2 w-[200px] bg-gray-200">
              {components.map((component) => (
                <div key={`${component.title}-${component.href}`} className="flex justify-between items-center px-2 hover:bg-gray-300">
                  <ListItem
                    title={component.title}
                    href={component.href}
                  />
                  <ArrowRight />
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="bg-transparent hover:bg-gray-400 rounded-2xl relative" >
          <Badge variant="destructive" className=" absolute right-0 hover:bg-red-400 cursor-pointer">5</Badge>
          <NavigationMenuTrigger className="bg-transparent">Notifications</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-72 w-[300px] rounded-md bg-gray-200">
              <div className="flex justify-center">
                <CircleChevronDown className="m-2" />
              </div>
              {wishlist.map((item) => (
                <SmallCard key={item.id} product={item} type="watchlist" />
              ))}
              <div className="my-5"/>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <UserButton afterSignOutUrl="/" />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
