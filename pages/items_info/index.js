import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider, Tabs, Tab } from "@mui/material";

import Swal from "sweetalert2";

// Components
import ItemsContent from "../../components/items/itemsContent";
import CardGrid from "../../components/utility/grids/GridLayout3_even";
import CustomTabPanel from "../../components/utility/customTabPanel";

// Table
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  BrandsColumns,
  CategoriesColumns,
  SuppliersColumns,
  BrandColumnsVisibility,
  CategoryColumnsVisibility,
  SupplierColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import ItemModalManager from "../../components/items/modals/itemModalManager";
import BrandModalManager from "@/components/brands/modals/brandModalManager";
import CategoryModalManager from "@/components/categories/modals/categoryModalManager";
import SupplierModalManager from "@/components/suppliers/modals/supplierModalManager";

import ActionFormatter from "@/components/items/actionFormatter";
import BrandActionFormatter from "@/components/brands/actionFormatter";
import CategoryActionFormatter from "@/components/categories/actionFormatter";
import SupplierActionFormatter from "@/components/suppliers/actionFormatter";

import {
  brandsFetcher,
  categoriesFetcher,
  suppliersFetcher,
} from "../../components/items_info/fetch_data";
import { renderTabContent } from "@/components/items_info/tab_tables";
import withAuth from "@/components/utility/with_auth";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ItemsInfo({ brands, categories, suppliers }) {
  // const [data, setData] = React.useState(rows);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const {
    data: brandsData,
    mutate: brandsMutate,
    error: brandsError,
  } = useSWR("/brands", brandsFetcher, {
    fallbackData: brands,
  });

  const {
    data: categoriesData,
    mutate: categoriesMutate,
    error: categoriesError,
  } = useSWR("/categories", categoriesFetcher, {
    fallbackData: categories,
  });

  const {
    data: suppliersData,
    mutate: suppliersMutate,
    error: suppliersError,
  } = useSWR("/suppliers", suppliersFetcher, {
    fallbackData: suppliers,
  });

  const modalComponents = {
    0: (
      <BrandModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        mutate={brandsMutate}
      />
    ),
    1: (
      <CategoryModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        mutate={categoriesMutate}
      />
    ),
    2: (
      <SupplierModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        mutate={suppliersMutate}
      />
    ),
  };

  const tabName = {
    0: "Brand",
    1: "Category",
    2: "Supplier",
  };

  // console.log(data)
  return (
    <>
      <ItemsContent>
        {/* Modal Config */}
        {modalComponents[value]}

        <Grid container justifyContent="space-between">
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="Brands" {...a11yProps(0)} />
              <Tab label="Categories" {...a11yProps(1)} />
              <Tab label="Suppliers" {...a11yProps(2)} />

              {/* {...a11yProps(0)} */}
            </Tabs>
          </Grid>{" "}
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={() => openModal("add")}>
              {" "}
              Add {tabName[value]}{" "}
            </Button>
          </Grid>
        </Grid>
        <Divider />

        {/* Different Panel Views  */}
        {renderTabContent({
          tabValue: value,
          tabIndex: 0,
          tabName: "Brands",
          tabData: brandsData,
          dataColumns: BrandsColumns,
          column_visibility: BrandColumnsVisibility,
          actionFormatter: BrandActionFormatter,
          tabMutate: brandsMutate,
        })}
        {renderTabContent({
          tabValue: value,
          tabIndex: 1,
          tabName: "Categories",
          tabData: categoriesData,
          dataColumns: CategoriesColumns,
          column_visibility: CategoryColumnsVisibility,
          actionFormatter: CategoryActionFormatter,
          tabMutate: categoriesMutate,
        })}
        {renderTabContent({
          tabValue: value,
          tabIndex: 2,
          tabName: "Suppliers",
          tabData: suppliersData,
          dataColumns: SuppliersColumns,
          column_visibility: SupplierColumnsVisibility,
          actionFormatter: SupplierActionFormatter,
          tabMutate: suppliersMutate,
        })}
      </ItemsContent>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const initialBrandsData = await brandsFetcher();
    const initialCategoriesData = await categoriesFetcher();
    const initialSuppliersData = await suppliersFetcher();

    return {
      props: {
        brands: initialBrandsData,
        categories: initialCategoriesData,
        suppliers: initialSuppliersData,
      },
    };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return {
      props: {
        brands: [],
        categories: [],
        suppliers: [],
      },
    };
  }
}

export default withAuth(ItemsInfo)