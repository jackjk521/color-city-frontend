
// Purchases
export const PurchasesColumns = [
  {
    key: "id",
    label: "Id",
    fixed: true,
    width: 70,
    align: "center",
    responsive: true,
  },
  {
    key: "title",
    label: "Title",
    // fixed: true,
    width: 130,
    align: "left",
    flexGrow: 1,
    responsive: true,
  },
  {
    key: "price",
    label: "Price",
    width: 200,
    align: "right",
    flexGrow: 1,
    responsive: true,
  },
  {
    key: "rating",
    label: "Ratings",
    align: "right",
    flexGrow: 1,
    responsive: true,
  },
  {
    key: "actions",
    label: "Actions",
    align: "center",
    flexGrow: 1,
    responsive: true,
  },
];

// Items
export const ItemColumns = [
  // {
  //   accessorKey: 'name.firstName', //access nested data with dot notation
  //   header: 'First Name',
  //   size: 150,
  // },
  {
    accessorKey: 'item_id', // Primary key
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'item_name', //normal accessorKey
    header: 'Name',
    size: 200,
  },
  {
    accessorKey: 'brand_name',
    header: 'Brand',
    size: 150,
  },
  {
    accessorKey: 'category_name',
    header: 'Category',
    size: 150,
  },
  {
    accessorKey: 'item_price_w_vat',
    header: 'Item Price',
    size: 150,
  },
  {
    accessorKey: 'retail_price',
    header: 'Retail Price',
    size: 150,
  },

]

// Brands
export const BrandsColumns = [

  {
    accessorKey: 'brand_id', // Primary key
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'brand_name', //normal accessorKey
    header: 'Name',
    size: 200,
  },
  {
    accessorKey: 'supplier_name', //normal accessorKey
    header: 'Supplier',
    size: 200,
  },

]

// Categories
export const CategoriesColumns = [

  {
    accessorKey: 'category_id', // Primary key
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'category_name', //normal accessorKey
    header: 'Name',
    size: 200,
  },

]

// Suppliers
export const SuppliersColumns = [

  {
    accessorKey: 'supplier_id', // Primary key
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'supplier_name', //normal accessorKey
    header: 'Name',
    size: 200,
  },
  {
    accessorKey: 'contact_num', //normal accessorKey
    header: 'Contact',
    size: 200,
  },

]





