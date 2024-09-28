'use client'
import React,{useState,useEffect} from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from './ui/button';


const districtsOfSriLanka = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya"
];


const mainCategories = [
    "Crops",
    "Livestock",
    "Dairy Products",
    "Poultry Products",
    "Horticulture",
    "Fibers",
    "Beverage Crops",
    "Spices and Herbs",
    "Oilseeds",
    "Sugar Crops",
    "Forage and Fodder",
    "Forestry Products",
    "Organic Products",
    "Processed and Packaged Foods",
    "Agricultural Inputs",
    "Animal Feed and Supplements",
    "Agrochemicals",
    "Biotechnology"
  ];
  

const SearchBar = ({onSearch}) => {

    const [isMounted, setIsMounted] = useState(false);
    const [location, setLocation] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[])

    if(!isMounted) return null; 

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
      };
    
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };

    const handleSearch = async () => {
        setLoading(true);
        await onSearch(location, category);
        setLoading(false);
      };

    return ( 
        <div className='flex flex-row text-center justify-center items-center bg-gray-50 bg-opacity-55 rounded-lg '>
            <Box sx={{ minWidth: 200, margin:2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        label="Location"
                        onChange={handleLocationChange}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        {districtsOfSriLanka.map((district,index)=>(
                            <MenuItem key={index} value={district}>{district}</MenuItem>
                        ))}
                        
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 , margin:2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        {mainCategories.map((category,index)=>(
                            <MenuItem key={index} value={category}>{category}</MenuItem>)
                        )}
                    </Select>
                </FormControl>
            </Box>

            <Button onClick={handleSearch} className='bg-green-500 mr-3 text-white rounded-md hover:bg-green-300' disabled={loading}>
                Search Products
            </Button>

        </div>

     );
}
 
export default SearchBar;