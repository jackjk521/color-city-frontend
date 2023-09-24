import * as React from "react";
import Head from "next/head";
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
// import styles from "../styles/Home.module.css";

// Material UI
import { Box, Typography, Tabs, Tab, Grid } from "@mui/material";

// Components
import PurchasesContent from "../components/purchasesContent";
import PurchasesTable from "../components/utility/ResponsiveTable";
import CardGrid from "../components/utility/2CardGrid";
import CustomTabPanel from "../components/utility/customTabPanel";

// Helper Functions
import { createPurchaseData } from "@/utils/createData";
import { PurchaseTableHeaders } from "@/utils/tableCells";

// Fetch API data and populate rows array
// function createData(id, title, price, rating) {
//   return {
//     id,
//     title,
//     price,
//     rating,
//   };
// }

// const headCells = [
//   {
//     id: "id",
//     numeric: true,
//     disablePadding: false,
//     label: "id",
//   },
//   {
//     id: "title",
//     numeric: false,
//     disablePadding: false,
//     label: "title",
//   },
//   {
//     id: "price",
//     numeric: true,
//     disablePadding: false,
//     label: "price",
//   },
//   {
//     id: "rating",
//     numeric: true,
//     disablePadding: false,
//     label: "rating",
//   },
//   {
//     id: "id",
//     numeric: false,
//     disablePadding: false,
//     label: "Actions",
//   },
// ];

export default function Purchases({ rows }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <PurchasesContent>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Branches" />
          <Tab label="Suppliers" />
          {/* {...a11yProps(0)} */}
        </Tabs>
      </Box>

      {/* Different Panel Views  */}
      <CustomTabPanel value={value} index={0}>
        <CardGrid
          table={
            <PurchasesTable
              rows={rows}
              headCells={PurchaseTableHeaders}
              tableType={"Purchases"}
            />
          }
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CardGrid
          table={<PurchasesTable rows={rows} headCells={PurchaseTableHeaders} />}
        />
      </CustomTabPanel>
    </PurchasesContent>
    // <Box sx={{ flexGrow: 1, backgroundColor: "#FFFFF" }}>

    // </Box>
  );
}

export async function getServerSideProps() {
  const url = "https://dummyjson.com/products";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const newRows = data.products.map((item) => {
      const { id, title, price, rating } = item;
      return createPurchaseData(id, title, price, rating);
    });
    return {
      props: {
        rows: newRows,
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
