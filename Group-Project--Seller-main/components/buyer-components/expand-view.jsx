'use client'

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import StarRatings from 'react-star-ratings';


import usePreviewModal from "@/hooks/usePreviewModal";
import IconButton from "../ui/icon-button";
import { X } from "lucide-react";
import Gallery from "./gallery";
import CustomButton from "../ui/custom-button";
import { formatter } from "@/lib/utils";
import { ShoppingCart, Bookmark, CreditCard } from "lucide-react";
import { Separator } from "../ui/separator";
import useCart from "@/hooks/addtocardStore";
import payCart from "@/hooks/addtoPayCart";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from '@clerk/clerk-react'


  export function ProductPreview() {

    const [loading, setLoading] = useState(false);
    const {userId} = useAuth();
    const {isOpen,close} = usePreviewModal();
    const cart = useCart();
    const paycart = payCart();
    const product = usePreviewModal((state) => state.product);
    const router = useRouter();

    if (!product) {
      return null;
    }

    //add product to cart
    const onAddToCard =(event)=>{
      event.stopPropagation();

      cart.addItem(product);
    }
   
    //buy now handler
    const onBuyNow = ()=>{
      setLoading(true);
      cart.addItem(product);
      paycart.addItemToPay(product);
      setLoading(false);
      close();
      router.push(`/cart/${userId}`)
    }

    //calculate the discount price
    const discountPrice = product.price - (product.price * product.discount / 100);

    return (
      <AlertDialog open={isOpen} onOpenChange={close} >
        <AlertDialogContent className ="max-w-4xl">
         <IconButton icon={<X size={15}/>} onClick={close}  className="absolute right-3 top-3"/>
          <AlertDialogHeader>
            
            <div className="flex flex-row gap-5">
                    <div className="w-1/2">
                        <Gallery images={product.imageUrls} />
                    </div>
                    <div className="w-1/2">
                        <AlertDialogDescription>
                              <AlertDialogTitle className=" text-gray-800 text-xl">{product.name}</AlertDialogTitle>
                              <h1 className="font-medium text-gray-800 text-semibold">{product.mainCategory} | {product?.category?.name}</h1>
                              <div className="flex gap-4 my-1">
                                  {/* have to update after creating the rating schema */}
                                  <StarRatings
                                    rating={4}
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="15px"
                                    starSpacing="0.5px"
                                    />

                                    {/* have to update after create the orders schema */}
                                  <p className="text-sm text-muted-foreground">5000+ sold</p>
                              </div>
                              <div className="flex items-baseline gap-x-3 gap-y-0 my-3">
                                <p className={cn("text-2xl font-bold text-black  ", (product.discount >0) && "line-through text-muted-foreground text-lg font-semibold italic")}>{formatter.format(product.price)}</p> 
                                { (product.discount >0) &&<p className={cn("text-3xl font-bold text-rose-800 ")}>{formatter.format(discountPrice)}</p>}
                              </div>
                              <Separator/>
                              <div className="flex gap-4 mt-2">
                                <CustomButton
                                    onClick={onAddToCard}
                                    icon={<ShoppingCart size={20} className="text-gray-600"/>}
                                    name="Add to cart"
                                    disabled={loading}
                                />
                                <CustomButton
                                    onClick={onBuyNow}
                                    icon={<CreditCard size={20} className="text-gray-600"/>}
                                    name="Buy now"
                                    disabled={loading}
                                />
                              </div>
                              <div className="mt-3">
                                <h2 className="text-md font-semibold text-gray-800">Description</h2>
                                <p>{product.description}</p>
                              </div>
                              
                        </AlertDialogDescription>
                    </div>
                </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  