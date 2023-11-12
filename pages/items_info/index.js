import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider, Tabs, Tab } from "@mui/material";

// Components
import ItemsContent from "../../components/items/itemsContent";

// Table
import {
  BrandsColumns,
  CategoriesColumns,
  SuppliersColumns,
  BrandColumnsVisibility,
  CategoryColumnsVisibility,
  SupplierColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import BrandModalManager from "@/modals/brands/brandModalManager";
import CategoryModalManager from "@/modals/categories/categoryModalManager";
import SupplierModalManager from "@/modals/suppliers/supplierModalManager";

import BrandActionFormatter from "@/components/brands/actionFormatter";
import CategoryActionFormatter from "@/components/categories/actionFormatter";
import SupplierActionFormatter from "@/components/suppliers/actionFormatter";

import { renderTabContent } from "@/components/items_info/tab_tables";
import withAuth from "@/components/utility/with_auth";
import { get_fetcher } from "@/components/utility/api/fetcher";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const brandsUrl = "/brands";
const categoriesUrl = "/categories";
const suppliersUrl = "/suppliers";

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
    isValidating: brandsLoading,
  } = useSWR(brandsUrl, get_fetcher);

  const {
    data: categoriesData,
    mutate: categoriesMutate,
    error: categoriesError,
    isValidating: categoriesLoading,
  } = useSWR(categoriesUrl, get_fetcher);

  const {
    data: suppliersData,
    mutate: suppliersMutate,
    error: suppliersError,
    isValidating: suppliersLoading,
  } = useSWR(suppliersUrl, get_fetcher);

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
          <Grid item mb={2}>
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
        {brandsData &&
          renderTabContent({
            tabValue: value,
            tabIndex: 0,
            tabName: "Brands",
            tabData: brandsData,
            dataColumns: BrandsColumns,
            column_visibility: BrandColumnsVisibility,
            actionFormatter: BrandActionFormatter,
            tabMutate: brandsMutate,
            tabLoading: brandsLoading,
          })}
        {categoriesData &&
          renderTabContent({
            tabValue: value,
            tabIndex: 1,
            tabName: "Categories",
            tabData: categoriesData,
            dataColumns: CategoriesColumns,
            column_visibility: CategoryColumnsVisibility,
            actionFormatter: CategoryActionFormatter,
            tabMutate: categoriesMutate,
            tabLoading: categoriesLoading,
          })}
        {suppliersData &&
          renderTabContent({
            tabValue: value,
            tabIndex: 2,
            tabName: "Suppliers",
            tabData: suppliersData,
            dataColumns: SuppliersColumns,
            column_visibility: SupplierColumnsVisibility,
            actionFormatter: SupplierActionFormatter,
            tabMutate: suppliersMutate,
            tabLoading: suppliersLoading,
          })}
      </ItemsContent>
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   try {
//     const initialBrandsData = await get_fetcher(brandsUrl);
//     const initialCategoriesData = await get_fetcher(categoriesUrl);
//     const initialSuppliersData = await get_fetcher(suppliersUrl);

//     return {
//       props: {
//         brands: initialBrandsData,
//         categories: initialCategoriesData,
//         suppliers: initialSuppliersData,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching API data:", error);
//     return {
//       props: {
//         brands: [],
//         categories: [],
//         suppliers: [],
//       },
//     };
//   }
// }

export default withAuth(ItemsInfo);
