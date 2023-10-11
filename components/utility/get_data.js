import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import apiClient from "./api/apiClient";
import Swal from"sweetalert2"

// Api calls to get data
export const get_brands = async () => {
    try {
        const response = await apiClient.get(`/brands`);
        if (response.status === 200) {
          return response.data
        }
 
      } catch (error) {
        // Handle the error
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
        throw error;
      }
}

export const get_categories = async () => {
    try {
        const response = await apiClient.get(`/categories`);
        if (response.status === 200) {
          return response.data
        }
 
      } catch (error) {
        // Handle the error
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
        throw error;
      }
}

// Dropdown 
export function BrandsDropdown({selectedBrand, handleChange}) {
    const [brands, setBrands] = useState([]);
   
    useEffect(() => {
      get_brands()
        .then((brands) => {
          setBrands(brands);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    // const handleBrandChange = (event) => {
    //   setSelectedBrand(event.target.value);
    // //   console.log(event.target.value)
    // };
  
    return (
      <FormControl fullWidth>
        <InputLabel id="brands-label">Select Brand</InputLabel>
        <Select
          labelId="brands-label"
          id="brands-select"
          name="brand"
          value={selectedBrand || ""}
          onChange={handleChange}
        >
          {brands.map((brand) => (
            <MenuItem key={brand.brand_id} value={brand.brand_id}>
              {brand.brand_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}

export function CategoriesDropdown({selectedCategory, handleChange}) {
    const [categories, setCategories] = useState([]);
   
    useEffect(() => {
      get_categories()
        .then((categories) => {
          setCategories(categories);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    // const handleCategoryChange = (event) => {
    //   setSelectedCategory(event.target.value);
    // //   console.log(event.target.value)
    // };
  
    return (
      <FormControl fullWidth>
        <InputLabel id="categories-label">Select Category</InputLabel>
        <Select
          labelId="categories-label"
          id="categories-select"
          name="category"
          value={selectedCategory || ""}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.category_id} value={category.category_id}>
              {category.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}