'use client'

import React,{useState,useEffect} from "react"
import { ProductCard } from "./buyer-components/product-card";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import StarRatings from "react-star-ratings";
import { Search } from 'lucide-react';

const FilterComponents = ({products=[]}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [filteredProducts,setFilteredProducts] = useState(products);    
    const [subCategory,setSubCategory] = useState("all");
    const [rating,setRating] = useState("all");
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(100000);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) return null;

    const subCat = products.map(product=>product.category.name);
    const uniqueSubCat = [...new Set(subCat)];

    const calculateRating = (reviews) => {
        if (!reviews || reviews.length === 0) {
            return 0; 
        }
    
        const totalRating = reviews.reduce((sum, review) => {
            return sum + review.rating;
        }, 0);
    
        return totalRating / reviews.length;
    }

    const filterHandler =()=>{
        let filtered = products;
        if(subCategory !== "all"){
            filtered = filtered.filter(product => product.category.name === subCategory);
        }
        if(rating !== "all"){
            filtered = filtered.filter(product => {
                const averageRating = calculateRating(product.reviews);
                return averageRating >= rating;
            });
        }
        if(minPrice){
            filtered = filtered.filter(product => product.price >= minPrice);
        }
        if(maxPrice){

            filtered = filtered.filter(product => product.price <= maxPrice);
        }
        setFilteredProducts(filtered);
    }

    return ( 
    <div className="grid grid-cols-4 gap-3 mt-3 mx-2">
            <div className="col-span-1">
                <Card className="w-full">
                    <CardContent>
                        <div className="grid w-full items-center gap-4 mt-3">
                            <div></div>
                            <div className="flex flex-col space-y-1.5 mt-2">
                                <Label htmlFor="subCategory">SubCategory</Label>
                                <Select onValueChange={(value) => setSubCategory(value)} value={subCategory}>
                                    <SelectTrigger id="subCategory">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">All</SelectItem>
                                        {uniqueSubCat.map((sub, index) => (
                                            <SelectItem key={index} value={sub}>{sub}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="rating">Ratings</Label>
                                <Select onValueChange={(value) => setRating(value)} value={rating}>
                                    <SelectTrigger id="rating">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value={1}>
                                        <StarRatings
                                            rating={1}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="0.5px"
                                            />
                                        </SelectItem>
                                        <SelectItem value={2}>
                                        <StarRatings
                                            rating={2}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="0.5px"
                                            />
                                        </SelectItem>
                                        <SelectItem value={3}>
                                        <StarRatings
                                            rating={3}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="0.5px"
                                            />
                                        </SelectItem>
                                        <SelectItem value={4}>
                                        <StarRatings
                                            rating={4}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="0.5px"
                                            />
                                        </SelectItem>
                                        <SelectItem value={5}>
                                        <StarRatings
                                            rating={5}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="0.5px"
                                            />
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="priceRange">Price</Label>
                                <div className="flex gap-2">
                                    <Input 
                                        type="number" 
                                        placeholder="Min" 
                                        value={minPrice} 
                                        onChange={(e) => setMinPrice(Number(e.target.value))}
                                    />
                                    <Input 
                                        type="number" 
                                        placeholder="Max" 
                                        value={maxPrice} 
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setFilteredProducts(products)}>Clear</Button>
                        <Button onClick={filterHandler}>Filter</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="col-span-3">
                <div className="col-span-3 text-center my-5">
                    <div className="flex gap-1 items-center">
                        <Search className="w-5 h-5 mr-2"/> 
                        <h1 className="text-2xl font-semibold">Search Results ...</h1>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-1">
                    {filteredProducts.length > 0 ? filteredProducts.map((product,index) => (
                        <div key={index} className="col-span-1">
                            <ProductCard product={product}/>
                        </div>
                    )) : 
                        <div className="col-span-3 text-center mt-10">
                            No Products Found
                        </div>

                    }
                </div>
            </div>
    </div>
    );
}

export default FilterComponents;
