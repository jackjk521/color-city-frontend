import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Autocomplete,
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

// Items
export const get_items = async () => {
  try {
    const response = await apiClient.get(`/items/`);
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

// Items from Main Inventory
export const get_warehouse_items = async () => {
  try {
    const response = await apiClient.get(`/inventory/?branch=1`);
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

// PO Number generation
export const get_so_number = async () => {
  try {
    const response = await apiClient.get(`/gen_so_number`);
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
export const get_bo_number = async () => {
  try {
    const response = await apiClient.get(`/gen_bo_number`);
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

// Get Item by item-id
export const get_items_by_id = async (id) => {
  try {
    const response = await apiClient.get(`/item/${id}/?item_name=1`);
    if (response.status === 200) {
      const brand_item_format = response.data;
      return brand_item_format;
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

// Update PH status
export const post_purchase = async (id, closeModal, mutate) => {
  try {
    const response = await apiClient.put(`/po_status/${id}/`, {
      status: "POST",
    });
    if (response.status === 200) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully posted the order",
        icon: "success",
      });
      mutate();
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

export const approve_purchase = async (
  id,
  purchase_lines,
  closeModal,
  mutate
) => {
  try {
    const response = await apiClient.put(`/po_status/${id}/`, {
      status: "APPROVE",
      purchase_lines: JSON.stringify(purchase_lines),
    });
    if (response.status === 200) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully approved the order",
        icon: "success",
      });
      mutate();
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

export const decline_purchase = async (id, closeModal, mutate) => {
  try {
    const response = await apiClient.put(`/po_status/${id}/`, {
      status: "DECLINE",
    });
    if (response.status === 200) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully declined the order",
        icon: "success",
      });
      mutate();
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

export function SONumberField({ setData }) {
  const [poNumber, setPONumber] = useState("");
  useEffect(() => {
    get_so_number()
      .then((so_num) => {
        setPONumber(so_num);
        setData((prevState) => ({
          ...prevState,
          purchaseHeader: {
            ...prevState.purchaseHeader,
            po_number: so_num,
          },
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <TextField
      fullWidth
      required
      label="PO Code"
      name="po_number"
      value={poNumber}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}

export function BONumberField({ setData }) {
  const [poNumber, setPONumber] = useState("");
  useEffect(() => {
    get_bo_number()
      .then((bo_num) => {
        setPONumber(bo_num);
        setData((prevState) => ({
          ...prevState,
          purchaseHeader: {
            ...prevState.purchaseHeader,
            po_number: bo_num,
          },
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <TextField
      fullWidth
      required
      label="PO Code"
      name="po_number"
      value={poNumber}
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
      <InputLabel id="items-label" sx={{ paddingRight: "8px" }}>
        Catalysts
      </InputLabel>
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
              {item.brand_name} - {item.item_name}
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

export function BranchesDropdown({
  selectedBranch,
  handleChange = null,
  setData = null,
}) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    get_branches()
      .then((branches) => {
        setBranches(branches);
      })
      .catch((error) => {
        console.error(error);
      });

    if (setData != null && selectedBranch !== "") {
      const branch = branches.find(
        (branch) => branch.branch_id === selectedBranch
      );

      // console.log(branch)
      setData((prevOrder) => ({
        ...prevOrder,
        branch_name: branch ? branch.branch_name : "",
      }));
    }
  }, [selectedBranch, setData]);

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

export function ItemsDropdown({ selectedItem, handleChange, setAddItemData }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    get_items()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleItemChange = (event, value) => {
    if (value) {
      setAddItemData((prevOrder) => ({
        ...prevOrder,
        item: value.item_id,
        brand_item: value.brand_item,
        item_price_w_vat: value.item_price_w_vat,
      }));
    }
  };

  // console.log(items)

  return (
    <FormControl fullWidth>
      <Autocomplete
        options={items}
        name="item"
        // value={selected ? selected : selectedItem}
        onChange={handleItemChange}
        getOptionLabel={(option) => option.brand_item}
        getOptionValue={(option) => option.item_id}
        clearOnEscape
        renderInput={(params) => (
          <TextField {...params} label="Select an Item" variant="outlined" />
        )}
      />
    </FormControl>

    // <FormControl fullWidth>
    //   <InputLabel id="items-label">Items</InputLabel>
    //   <Select
    //     fullWidth
    //     labelId="items-label"
    //     label="items"
    //     id="items-select"
    //     name="item"
    //     value={selectedItem || ""}
    //     onChange={handleChange}>
    //     {items.length > 0 ? (
    //       items.map((item) => (
    //         <MenuItem key={item.item_id} value={item.item_id}>
    //           {item.brand_name} - {item.item_name}
    //         </MenuItem>
    //       ))
    //     ) : (
    //       <MenuItem key={0} value={0}>
    //         NO ITEMS
    //       </MenuItem>
    //     )}
    //   </Select>
    // </FormControl>
  );
}

// Generate the Item Name
export function BrandItemName({ id }) {
  const [brandItem, setBrandItem] = useState("");
  useEffect(() => {
    get_items_by_id(id)
      .then((item_num) => {
        setBrandItem(item_num);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <Typography>{brandItem}</Typography>;
}

export function WarehouseItemsDropdown({ setAddItemData }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    get_warehouse_items()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleItemChange = (event, value) => {
    if (value) {
      setAddItemData((prevOrder) => ({
        ...prevOrder,
        item: value.item,
        brand_item: value.brand_item,
        item_price_w_vat: value.item_price_w_vat,
        available_stock: value.available_stock,
      }));
    }
  };

  // console.log(items)

  return (
    <FormControl fullWidth>
      <Autocomplete
        options={items}
        name="item"
        // value={selected ? selected : selectedItem}
        onChange={handleItemChange}
        getOptionLabel={(option) => option.brand_item}
        getOptionValue={(option) => option.item}
        clearOnEscape
        renderInput={(params) => (
          <TextField {...params} label="Select an Item" variant="outlined" />
        )}
      />
    </FormControl>

    // <FormControl fullWidth>
    //   <InputLabel id="items-label">Items</InputLabel>
    //   <Select
    //     fullWidth
    //     labelId="items-label"
    //     label="items"
    //     id="items-select"
    //     name="item"
    //     value={selectedItem || ""}
    //     onChange={handleChange}>
    //     {items.length > 0 ? (
    //       items.map((item) => (
    //         <MenuItem key={item.item_id} value={item.item_id}>
    //           {item.brand_name} - {item.item_name}
    //         </MenuItem>
    //       ))
    //     ) : (
    //       <MenuItem key={0} value={0}>
    //         NO ITEMS
    //       </MenuItem>
    //     )}
    //   </Select>
    // </FormControl>
  );
}
