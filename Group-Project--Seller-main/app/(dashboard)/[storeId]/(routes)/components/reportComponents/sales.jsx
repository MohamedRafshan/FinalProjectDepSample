'use client'

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,SelectLabel, SelectGroup } from "@/components/ui/select";
import DatePickerWithRange from './datePicker';
import { Button } from "@/components/ui/button";
import axios from "axios";
import ExportReport from './exportFuncion';


const Sales = ({ categories = [], products = [] ,storeId}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('all');
  const [product, setProduct] = useState('all');
  const [duration, setDuration] = useState("Last7days");
  const [customDateRange, setCustomDateRange] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleProductChange = (value) => {
    setProduct(value);
  };

  const handleDurationChange = (value) => {
    setDuration(value);
  };

  const handleDateRangeChange = (range) => {
    setCustomDateRange(range);
  };



  const handleExport = async() => {
    setLoading(true);
    const response = await axios.get(`/api/${storeId}/analytics/reports/sales`,{
      params:{category,product,duration,customDateRange}
    })
    // export function call here 
    ExportReport(response.data);
    setLoading(false);
  }


  if (!isMounted) {
    return null;
  }

  return (
    <div className=" w-full">
      <div className="grid grid-cols-3 gap-3 mt-4">
        <Select onValueChange={handleCategoryChange} disabled={product !== 'all'} defaultValue="all">
          <SelectGroup>
          <SelectLabel>category</SelectLabel>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="all">
              All
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
          </SelectGroup>
        </Select>
        <Select onValueChange={handleProductChange} disabled={category !== 'all'} defaultValue="all">
          <SelectGroup>
          <SelectLabel>product</SelectLabel>
          <SelectTrigger>
            <SelectValue placeholder="Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="all">
              All
            </SelectItem>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
          </SelectGroup>
        </Select>
        <Select onValueChange={handleDurationChange} defaultValue="Last7days">
          <SelectGroup>
            <SelectLabel>Duration</SelectLabel>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last7days">
                  Last 7 days
                </SelectItem>
                <SelectItem value="Last30days">
                  Last 30 days
                </SelectItem>
                <SelectItem value="Last365days">
                  Last 365 days
                </SelectItem>
                <SelectItem value="CustomRange">
                  Custom range
                </SelectItem>
              </SelectContent>
          </SelectGroup>
        </Select>
        {duration === "CustomRange" && (
          <div className="col-span-3 ">
            <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
          </div>
        )}
        <div className="col-span-3 flex justify-end">
          <Button onClick ={handleExport} disabled={loading}>
            Export
          </Button>
        </div>
        </div>
    </div>
  );
};

export default Sales;
