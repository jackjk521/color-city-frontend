import React from "react";
import { Box, Typography, Tabs, Tab, Grid, useMediaQuery } from "@mui/material";

import CardGrid from "./utility/2CardGrid";
import CustomTabPanel from "./utility/customTabPanel";
import PurchasesTable from "./utility/ResponsiveTable";

const rows = [];
const PurchasesContent = () => {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [rows, setRows] = React.useState([]);

  // Fetch API data and populate rows array
  function createData(title, price, rating) {
    return {
      title,
      price,
      rating,
    };
  }

  const url = "https://dummyjson.com/products";
  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Extract the required data from the API response and format it into the desired structure
        const newRows = data.products.map((item) => {
          const { title, price, rating } = item;
          return createData(title, price, rating);
        });
        setRows(newRows);
        // console.log(data);

        // console.log(rows);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: isSmallScreen ? "column" : "row",
            padding: "16px",
          }}>
          <Box sx={{ maxWidth: "lg", width: "100%" }}>
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
              <CardGrid table={<PurchasesTable rows={rows} />} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CardGrid table={<PurchasesTable rows={rows}  />} />
            </CustomTabPanel>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

// export async function getServerSideProps() {
//   const url = "https://dummyjson.com/products";

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const rows = data.map((item) => {
//       const { title, price, rating } = item;
//       return createData(title, price, rating);
//     });
//     console.log(response)

//     console.log(data)

//     console.log(rows)

//     return {
//       props: {
//         rows,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching API data:", error);
//     return {
//       props: {
//         rows: [],
//       },
//     };
//   }
// }

export default PurchasesContent;
