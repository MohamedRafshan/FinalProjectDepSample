'use client'


import { useState,useEffect } from "react"
import axios from "axios"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formatter } from "@/lib/utils"

  export default function LowStock({storeId}) {

    const [isMounted, setIsMounted] = useState(false)
    const [count, setCount] = useState(10)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setIsMounted(true)
    }, [])


    useEffect(() => {
        if (isMounted) {
            fetchData();
        }
    }, [count,isMounted])


    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/${storeId}/analytics/lowstocks`, {
                params: { count }
            });

            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching  data', error);
        }
    };


    const handleCountChange = (value) => {
        setCount(value);
    }


    if (!isMounted){
        return null
    }


    return (
        <>
        <div className="flex justify-end">
            <div></div>
            <div>
                <Select onValueChange={handleCountChange} defaultValue={20}>
                    <SelectTrigger> 
                        {count}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key="10" value={10}>
                            less than 10
                        </SelectItem>
                        <SelectItem key="20" value={20}>
                            less than 20
                        </SelectItem>
                        <SelectItem key="30" value={30}>
                            less than 30
                        </SelectItem>
                        <SelectItem key="50" value={50}>
                            less than 50
                        </SelectItem>
                        <SelectItem key="100" value={100}>
                            less than 100
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <Table className="my-4">
            <TableHeader>
            <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Stocks</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {products.map((product) => (
                <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{formatter.format(product.price)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </>
    )
  }
  