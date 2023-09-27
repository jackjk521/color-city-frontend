import * as React from "react";
import Head from "next/head";
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
// import styles from "../styles/Home.module.css";

// Material UI
import { Box, Tabs, Tab } from "@mui/material";

// Components
import InventoryContent from "../../components/inventoryContent";
import InventoryTable from "../../components/utility/ResponsiveTable";
import CardGrid from "../../components/utility/2CardGrid";
import CustomTabPanel from "../../components/utility/customTabPanel";

// Helper Functions
import { createInventoryData } from "@/utils/createData";
import { InventoryTableHeaders } from "@/utils/tableCells";

export default function Inventory({rows}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <InventoryContent>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="All Branches" />
          <Tab label="Branch 1" />
          <Tab label="Branch 2" />
          
          {/* {...a11yProps(0)} */}
        </Tabs>
      </Box>

      {/* Different Panel Views  */}
      <CustomTabPanel value={value} index={0}>
        <CardGrid
          table={
            <InventoryTable
              rows={rows}
              headCells={InventoryTableHeaders}
              tableType={"Inventory"}
            />
          }
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CardGrid
          table={
            <InventoryTable rows={rows} headCells={InventoryTableHeaders} tableType={"Inventory"}/>
          }
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CardGrid
          table={
            <InventoryTable rows={rows} headCells={InventoryTableHeaders} tableType={"Inventory"}/>
          }
        />
      </CustomTabPanel>
    </InventoryContent>
  );
}

export async function getServerSideProps() {
  const url = "https://dummyjson.com/products";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const newRows = data.products.map((item) => {
      const { id, title, price, rating } = item;
      return createInventoryData(id, title, price, rating);
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