'use client'

import { useState,useEffect } from "react";
import Sales from "./reportComponents/sales";
import Revenue from "./reportComponents/revenue";
import Inventory from "./reportComponents/inventory";
import Delivery from "./reportComponents/deliveries";
import Customer from "./reportComponents/customers";
import { Separator } from "@/components/ui/separator";

const Reports = ({categories,products,storeId}) => {

    const [isMounted,setIsMounted] = useState(false);


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return (
            <div>Loading...</div>
        )
    }

    return ( 
        <div>
            <Sales categories={categories} products={products} storeId={storeId}/>
            <Separator className="my-3"/>
            <Revenue/>
            <Separator className="my-3"/>
            <Inventory/>
            <Separator className="my-3"/>
            <Delivery/>
            <Separator className="my-3"/>
            <Customer/>
        </div>
     );
}
 
export default Reports;