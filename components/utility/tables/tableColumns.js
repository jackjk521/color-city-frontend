import React from "react";
import { BrandItemName } from "../get_data";
import { TextField } from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";

// Items
export const ItemColumns = [
  // {
  //   accessorKey: 'name.firstName', //access nested data with dot notation
  //   header: 'First Name',
  //   size: 150,
  // },
  {
    accessorKey: "item_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "brand_name",
    header: "Brand",
    size: 150,
  },
  {
    accessorKey: "item_name", //normal accessorKey
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "category_name",
    header: "Category",
    size: 150,
  },
  {
    accessorKey: "item_price_w_vat",
    header: "Item Price",
    size: 150,
  },
  {
    accessorKey: "retail_price",
    header: "Retail Price",
    size: 150,
  },
];

export const ItemColumnVisibility = {
  item_id: true,
  item_name: false,
  brand_name: false,
  category_name: false,
  item_price_w_vat: false,
  retail_price: false,
};

// Brands
export const BrandsColumns = [
  {
    accessorKey: "brand_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "brand_name", //normal accessorKey
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "supplier_name", //normal accessorKey
    header: "Supplier",
    size: 200,
  },
];
export const BrandColumnsVisibility = {
  brand_id: true,
  brand_name: false,
  supplier_name: false,
};

// Categories
export const CategoriesColumns = [
  {
    accessorKey: "category_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "category_name", //normal accessorKey
    header: "Name",
    size: 200,
  },
];
export const CategoryColumnsVisibility = {
  category_id: true,
  category_name: false,
};

// Suppliers
export const SuppliersColumns = [
  {
    accessorKey: "supplier_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "supplier_name", //normal accessorKey
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "contact_num", //normal accessorKey
    header: "Contact",
    size: 200,
  },
];

export const SupplierColumnsVisibility = {
  supplier_id: true,
  supplier_name: false,
  contact_num: false,
};

// Branches
export const BranchesColumns = [
  {
    accessorKey: "branch_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "branch_name", //normal accessorKey
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "address", //normal accessorKey
    header: "Address",
    size: 200,
  },
];
export const BranchColumnsVisibility = {
  branch_id: true,
  branch_name: false,
  address: false,
};

// Users
export const UsersColumns = [
  {
    accessorKey: "user_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "last_name", //normal accessorKey
    header: "Surname",
    size: 200,
  },
  {
    accessorKey: "username", //normal accessorKey
    header: "Username",
    size: 200,
  },
  {
    accessorKey: "branch_name", //normal accessorKey
    header: "Assigned Branch",
    size: 200,
  },
  {
    accessorKey: "user_role", //normal accessorKey
    header: "Role",
    size: 200,
  },
];
export const UserColumnsVisibility = {
  user_id: true,
  last_name: false,
  user_name: false,
  branch_name: false,
  user_role: false,
};

// Inventory (Admin View)
export const InventoryColumns = [
  {
    accessorKey: "inventory_id", // Primary key
    header: "ID",
    size: 50,
  },

  {
    accessorKey: "brand_item", //normal accessorKey
    header: "Item Name",
    size: 200,
  },
  {
    accessorKey: "branch_name", //normal accessorKey
    header: "Assigned Branch",
    size: 200,
  },
  {
    accessorKey: "total_quantity", //normal accessorKey
    header: "Total Quantity",
    size: 200,
  },
  {
    accessorKey: "holding_cost", //normal accessorKey
    header: "Holding Cost",
    size: 200,
  },
];
export const InventoryColumnsVisibility = {
  inventory_id: true,
  item_name: false,
  branch_name: false,
  total_quantity: false,
  holding_cost: false,
};

// Inventory (Branch View)
export const InventoryBranchColumns = [
  {
    accessorKey: "inventory_id", // Primary key
    header: "ID",
    size: 50,
  },

  {
    accessorKey: "brand_item", //normal accessorKey
    header: "Item Name",
    size: 200,
  },
  {
    accessorKey: "total_quantity", //normal accessorKey
    header: "Total Quantity",
    size: 200,
  },
  {
    accessorKey: "holding_cost", //normal accessorKey
    header: "Holding Cost",
    size: 200,
  },
];
export const InventoryBranchColumnsVisibility = {
  inventory_id: true,
  item_name: false,
  total_quantity: false,
  holding_cost: false,
};


// SupplierOrder
export const SupplierOrderColumns = [
  {
    accessorKey: "purchase_header_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "supplier_name", //normal accessorKey
    header: "Supplier",
    size: 200,
  },
  {
    accessorKey: "total_amount", //normal accessorKey
    header: "Total Amount",
    size: 200,
  },
  {
    accessorKey: "date_created",
    header: "Order Date",
    size: 200,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue());
      const formattedDate = date.toLocaleString("en-US");
      return formattedDate;
    },
  },
  {
    accessorKey: "received_status", //normal accessorKey
    header: "Received Status",
    size: 200,
  },
];

export const SupplierOrderColumnsVisibility = {
  purchase_header_id: true,
  supplier_name: false,
  total_amount: false,
  date_created: false,
  received_status: false,
};

// BranchOrder
export const BranchOrderColumns = [
  {
    accessorKey: "purchase_header_id", // Primary key
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "branch_name", //normal accessorKey
    header: "From Branch",
    size: 200,
  },
  {
    accessorKey: "total_amount", //normal accessorKey
    header: "Total Amount",
    size: 200,
  },
  {
    accessorKey: "date_created",
    header: "Order Date",
    size: 200,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue());
      const formattedDate = date.toLocaleString("en-US");
      return formattedDate;
    },
  },
  {
    accessorKey: "received_status", //normal accessorKey
    header: "Received Status",
    size: 200,
  },
];

export const BranchOrderColumnsVisibility = {
  purchase_header_id: true,
  branch_name: false,
  total_amount: false,
  date_created: false,
  received_status: false,
};

// Purchase Lines (display only)
export const PurchaseLineViewColumns = [
  {
    accessorKey: "item", // Primary key
    header: "Item ID",
    size: 50,
    enableEditing: false,
  },
  {
    accessorKey: "brand_item",
    header: "Item Name",
    size: 100,
    enableEditing: false,
  },
  {
    accessorKey: "req_quantity", //normal accessorKey
    header: "Requested Quantity",
    size: 100,
    muiEditTextFieldProps: ({ cell }) => ({
      name: "req_quantity",
      required: true,
      type: "number",
      inputProps: {
        min: 0,
      },
    }),
  },
  {
    accessorKey: "received_quantity", //normal accessorKey
    header: "Received Quantity",
    size: 100,
    enableEditing: false,
  },
  {
    accessorKey: "item_price_w_vat",
    header: "Item Price",
    size: 100,
    enableEditing: false,
  },
  {
    accessorKey: "subtotal", //normal accessorKey
    header: "Subtotal",
    size: 100,
    enableEditing: false,
  },
  {
    accessorKey: "status", //normal accessorKey
    header: "Status",
    size: 100,
    enableColumnFilterModes: false,
    enableEditing: false,
    Cell: ({ cell }) => {
      const status = cell.getValue();
      if (status == "COMPLETED") {
        return <LensIcon style={{ color: "green" }} />;
      } else if (status == "PARTIAL") {
        return <LensIcon style={{ color: "orange" }} />;
      } else {
        return <LensIcon style={{ color: "red" }} />;
      }
    },
  },
];
export const PurchaseLineViewColumnsVisibility = {
  item: true,
  item_name: false,
  brand_item: false,
  item_price_w_vat: false,
  req_quantity: false,
  subtotal: false,
};

// Purchase Lines (add or edit)
export const PurchaseLineColumns = [
  {
    accessorKey: "item", // Primary key
    header: "Item ID",
    size: 50,
    enableEditing: false,
  },
  {
    accessorKey: "brand_item",
    header: "Item Name",
    size: 100,
    enableEditing: false,
  },
  {
    accessorKey: "req_quantity", //normal accessorKey
    header: "Requested Quantity",
    size: 100,
    muiEditTextFieldProps: ({ cell }) => ({
      name: "req_quantity",
      required: true,
      type: "number",
      inputProps: {
        min: 0,
      },
    }),
  },
  {
    accessorKey: "item_price_w_vat",
    header: "Item Price",
    size: 100,
    enableEditing: false,
  },
  {
    accessorKey: "subtotal", //normal accessorKey
    header: "Subtotal",
    size: 100,
    enableEditing: false,
  },
];
export const PurchaseLineColumnsVisibility = {
  item: true,
  item_name: false,
  brand_item: false,
  item_price_w_vat: false,
  req_quantity: false,
  subtotal: false,
};

// Receiving Items
export const ReceivingItemsColumns = [
  {
    accessorKey: "purchase_line_id", // Primary key
    header: "Order ID",
    size: 20,
    enableEditing: false,
  },
  {
    accessorKey: "brand_item",
    header: "Item Name",
    size: 200,
    enableEditing: false,
  },
  {
    accessorKey: "req_quantity", //normal accessorKey
    header: "Requested Quantity",
    size: 200,
    enableEditing: false,
  },
  {
    accessorKey: "received_quantity",
    header: "Received Quantity",
    size: 200,
    enableEditing: false,

    // muiEditTextFieldProps: ({ cell }) => ({
    //   name: "req_quantity",
    //   required: true,
    //   type: "number",
    //   inputProps: {
    //     min: 0,
    //     max: cell.row.original.req_quantity, // max is the req_quantity
    //   },
    // }),
  },
  {
    accessorKey: "receive_qty",
    header: "To Receive",
    size: 200,
    muiEditTextFieldProps: ({ cell }) => ({
      name: "receive_qty",
      required: true,
      type: "number",
      inputProps: {
        min: 0,
        max:
          cell.row.original.req_quantity - cell.row.original.received_quantity, // max is the req_quantity
      },
    }),
  },
];

export const ReceivingItemsColumnVisibility = {
  purchase_line_id: false,
  brand_item: true,
  req_quantity: true,
  received_quantity: true,
  receive_qty: true,
};
