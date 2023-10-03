import * as React from "react";
import Head from "next/head";
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
// import styles from "../styles/Home.module.css";

import useSWR from "swr";

// Material UI
import { Box, Tabs, Tab, Button, Grid, Divider } from "@mui/material";

// Components
import PurchasesContent from "../../components/purchasesContent";
import PurchasesTable from "../../components/utility/ResponsiveTable";
import CardGrid from "../../components/utility/2CardGrid";
import CustomTabPanel from "../../components/utility/customTabPanel";

import CustomTable from "../../components/utility/tables/customDisplayTable";

// Helper Functions
import { createPurchaseData } from "@/utils/createData";
import { PurchaseTableHeaders } from "@/utils/tableCells";

import { PurchasesColumns } from "../../components/utility/tables/tableColumns";
import { PurchaseModalManager } from "../../components/modals/purchases/purchaseModalManager";

const url = "https://dummyjson.com/products";
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
};

export default function Purchases({ rows }) {
  // console.log(rows);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState(0);

  const { data, error } = useSWR(url, fetcher, { fallbackData: rows });

  // console.log(data)
  return (
    <>
      <PurchasesContent>
        <PurchaseModalManager />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Branches" />
              <Tab label="Suppliers" />
              {/* {...a11yProps(0)} */}
            </Tabs>
          </Grid>{" "}
          <Grid item>
            <Button variant="contained" color="success">
              {" "}
              Add Purchase{" "}
            </Button>
          </Grid>
        </Grid>
        <Divider />

        {/* Different Panel Views  */}
        <CustomTabPanel value={value} index={0}>
          <CardGrid>
            <CustomTable tableHeaders={PurchasesColumns} data={data} />
          </CardGrid>
          {/* <CustomTable tableHeaders={PurchasesColumns} data={rows} /> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CardGrid>
            <PurchasesTable rows={rows} headCells={PurchaseTableHeaders} />
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
