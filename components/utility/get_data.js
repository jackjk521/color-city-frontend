import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import apiClient from "./api/apiClient";
import Swal from "sweetalert2";

// Api calls to get data
export const get_brands = async () => {
  try {
    const response = await apiClient.get(`/brands`);
    if (response.status === 200) {
      return response.data;
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
};

export const get_categories = async () => {
  try {
    const response = await apiClient.get(`/categories`);
    if (response.status === 200) {
      return response.data;
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
};

export const get_item_number = async () => {
  try {
    const response = await apiClient.get(`/gen_item_number`);
    if (response.status === 200) {
      return response.data;
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
};

// Auto generate text fields
export function ItemNumberField() {
  const [itemNumber, setItemNumber] = useState("");
  useEffect(() => {
    get_item_number()
      .then((item_num) => {
        setItemNumber(item_num);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <TextField
      fullWidth
      label="Item Number"
      name="item_number"
      value={itemNumber}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}

// Dropdown
export function BrandsDropdown({ selectedBrand, handleChange }) {
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
      <InputLabel id="brands-label">Brand</InputLabel>
      <Select
        fullWidth
        labelId="brands-label"
        label="Brands"
        id="brands-select"
        name="brand"
        value={selectedBrand || ""}
        onChange={handleChange}>
        {brands.map((brand) => (
          <MenuItem key={brand.brand_id} value={brand.brand_id}>
            {brand.brand_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function CategoriesDropdown({ selectedCategory, handleChange }) {
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

  return (
    <FormControl fullWidth>
      <InputLabel id="categories-label">Category</InputLabel>
      <Select
        fullWidth
        labelId="categories-label"
        label="Categories"
        id="categories-select"
        name="category"
        value={selectedCategory || ""}
        onChange={handleChange}>
        {categories.map((category) => (
          <MenuItem key={category.category_id} value={category.category_id}>
            {category.category_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
