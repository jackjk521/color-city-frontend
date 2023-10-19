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

// Get all brands
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
// Get Categories
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

// Get Suppliers
export const get_suppliers = async () => {
  try {
    const response = await apiClient.get(`/suppliers`);
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

// Get Branches
export const get_branches = async () => {
  try {
    const response = await apiClient.get(`/branches`);
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

// Item Number Generation
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

// Items with category catalyst
export const get_items_by_catalyst = async () => {
  try {
    const response = await apiClient.get(`/items/?category=4`);
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

// Generate components

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

export function SuppliersDropdown({ selectedSupplier, handleChange }) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    get_suppliers()
      .then((suppliers) => {
        setSuppliers(suppliers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="suppliers-label">Suppliers</InputLabel>
      <Select
        fullWidth
        labelId="suppliers-label"
        label="suppliers"
        id="suppliers-select"
        name="supplier"
        value={selectedSupplier || ""}
        onChange={handleChange}>
        {suppliers.map((supplier) => (
          <MenuItem key={supplier.supplier_id} value={supplier.supplier_id}>
            {supplier.supplier_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function CatalystsDropdown({ selectedItem, handleChange }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    get_items_by_catalyst()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="items-label">Catalysts</InputLabel>
      <Select
        fullWidth
        labelId="items-label"
        label="items"
        id="items-select"
        name="catalyst"
        value={selectedItem || ""}
        onChange={handleChange}>
        {items.length > 0 ? (
          items.map((item) => (
            <MenuItem key={item.item_id} value={item.item_id}>
              {item.item_name}
            </MenuItem>
          ))
        ) : (
          <MenuItem key={0} value={0}>
            NO ITEMS
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export function BranchesDropdown({ selectedBranch, handleChange }) {
  const [branches, setItems] = useState([]);

  useEffect(() => {
    get_branches()
      .then((branches) => {
        setItems(branches);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="branches-label">Branches</InputLabel>
      <Select
        fullWidth
        labelId="branches-label"
        label="Branches"
        id="branches-select"
        name="branch"
        value={selectedBranch || ""}
        onChange={handleChange}>
        {branches.length > 0 ? (
          branches.map((branch) => (
            <MenuItem key={branch.branch_id} value={branch.branch_id}>
              {branch.branch_name}
            </MenuItem>
          ))
        ) : (
          <MenuItem key={0} value={0}>
            NO BRANCHES
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}