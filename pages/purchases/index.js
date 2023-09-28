import * as React from "react";
import Head from "next/head";
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
// import styles from "../styles/Home.module.css";

// Material UI
import { Box, Tabs, Tab } from "@mui/material";

// Components
import PurchasesContent from "../../components/purchasesContent";
import PurchasesTable from "../../components/utility/ResponsiveTable";
import CardGrid from "../../components/utility/2CardGrid";
import CustomTabPanel from "../../components/utility/customTabPanel";

// Helper Functions
import { createPurchaseData } from "@/utils/createData";
import { PurchaseTableHeaders } from "@/utils/tableCells";

// Alert
import { SuccessAlert } from "@/utils/alertHandler";

export default function Purchases({ rows }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [alertStatus, setAlertStatus] = React.useState({
    status: "",
    msg: "",
    vertical: "top",
    horizontal: "center",
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAlertStatus({
        status: "",
        msg: "",
        vertical: "top",
        horizontal: "center",
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [alertStatus]);

  return (
    <>
      {/* Alert config  */}
        {alertStatus.status === "Success" && (
        <SuccessAlert alertStatus={alertStatus} />
      )}

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
                setAlertStatus={setAlertStatus}
              />
            }
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CardGrid
            table={
              <PurchasesTable rows={rows} headCells={PurchaseTableHeaders} />
            }
          />
        </CustomTabPanel>
      </PurchasesContent>
    </>
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
