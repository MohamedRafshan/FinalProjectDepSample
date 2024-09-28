"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/components/ui/heading";

import SearchBar from "@/components/searchbar";
import HighestDesProductList from "@/components/buyer-components/highest-descounted-products";
import getSearchProducts from "@/actions/get-searchProduct";
import FilterComponents from "./filterComponents";
import { Button } from "@/components/ui/button";
import StoreCardlist from "./buyer-components/store-list";



const FrontFullProducts = ({ initialProduct,topSelling,stores}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchResultDisplay, setSearchResultDisplay] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;


  const handleSearch = async (location, category) => {
    try {
        const result = await getSearchProducts(location, category);
        setSearchResult(result);
    } catch (error) {
    }

    setSearchResultDisplay(true);
  }

  const handleClear = () => { 
    setSearchResultDisplay(false);
  }

  return (
    <>
      <div className="flex absolute inset-0 justify-center items-center">
        <SearchBar onSearch={handleSearch} />
        {

        searchResultDisplay && <Button type="destructive" className="mx-3 bg-red-600" onClick={handleClear}>Clear</Button>

        }
      </div>
      
      {!searchResultDisplay && (
        <>
        <div className="flex my-7 w-full items-center justify-center">
            <Heading
            title="Top Discounted Products"
            description="Get the best deals on the top discounted products.Only for today!"
            className="text-center"
            />
        </div>
        <HighestDesProductList products={initialProduct} />
        <div className="flex my-7 w-full items-center justify-center">
            <Heading
            title="Top selling Products"
            description="Top selling products of the week"
            className="text-center"
            />
        </div>

        {/* best selling products  name change but no issue.*/}
        <HighestDesProductList products={topSelling} /> 
        <div className="flex my-7 w-full items-center justify-center">
            <Heading
            title="Top Performing Stores"
            description="Explore more products from the top performing stores"
            className="text-center"
            />
        </div>
        <StoreCardlist plist={stores} />
      </>
      )}

      {searchResultDisplay && 
      <>
          <FilterComponents key={searchResult.length} products={searchResult} />
      </>
      }
    </>
  );
};

export default FrontFullProducts;
