  import * as React from "react";
  import Head from "next/head";
  // import Image from 'next/image';
  // import { Inter } from '@next/font/google';
  // import styles from "../styles/Home.module.css";

  import useSWR from "swr";

  // Material UI
  import { Box, Tabs, Tab, Button, Grid, Divider } from "@mui/material";

  import Swal from 'sweetalert2'
  // Components
  import PurchasesContent from "../../components/purchases/purchasesContent";
  import CardGrid from "../../components/utility/grids/2CardGrid";
  import CustomTabPanel from "../../components/utility/customTabPanel";

  import CustomTable from "../../components/utility/tables/customDisplayTable";

  // Helper Functions
  import { PurchasesColumns } from "../../components/utility/tables/tableColumns";
  import PurchaseModalManager from "../../components/purchases/modals/purchaseModalManager";

  const url = "https://dummyjson.com/products";
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      const errorRes = await res.json();
  
      const error = new Error();
      error.info = errorRes;
      error.status = res.status;
      error.message = "An error occurred while fetching data";
      Swal.fire({
        title:  error.info ,
        text: error.message,
        icon: "error",
      }, 1500);
    }
    const data = await response.json();
    return data.products;
  };

  export default function Purchases({ rows }) {
    // console.log(rows);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [activeModal, setActiveModal] = React.useState(null);
    const openModal = (modalType) => {
      setActiveModal(modalType);
    };
    // const [data, setData] = React.useState(null);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const [error, setError] = React.useState(null);
    const { data: fetchedData, error: fetchedError } = useSWR(url, fetcher, {
      fallbackData: rows,
    });


    // React.useEffect(() => {
    //   if (fetchedData) {
    //     setData(fetchedData);
    //     setIsLoading(false);
    //   }

    //   if (fetchedError) {
    //     setError(fetchedError);
    //     setIsLoading(false);
    //   }
    // }, [fetchedData, fetchedError]);

    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }

    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // }

    // console.log(data)
    return (
      <>
        <PurchasesContent>
          {/* Modal Config */}
          <PurchaseModalManager
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />

          <Grid container justifyContent="space-between">
            <Grid item>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example">
                <Tab label="Branches" />
                <Tab label="Suppliers" />
                {/* {...a11yProps(0)} */}
              </Tabs>
            </Grid>{" "}
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={() => openModal("add")}>
                {" "}
                Add Purchase{" "}
              </Button>
            </Grid>
          </Grid>
          <Divider />

          {/* Different Panel Views  */}
          <CustomTabPanel value={value} index={0}>
            <CardGrid>
              <CustomTable
                tableHeaders={PurchasesColumns}
                data={fetchedData}
                tableType="Purchases"
              />
            </CardGrid>
            {/* <CustomTable tableHeaders={PurchasesColumns} data={rows} /> */}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CardGrid>
              {/* <PurchasesTable rows={rows} headCells={PurchaseTableHeaders} /> */}
            </CardGrid>
          </CustomTabPanel>
        </PurchasesContent>
      </>
    );
  }

  export async function getServerSideProps() {
    try {
      const initialData = await fetcher(url);
      return {
        props: {
          rows: initialData,
        },
      };
    } catch (error) {
      console.error("Error fetching API data:", error);
      return {
        props: {
          rows: [],
        },
      };
    }
  }
