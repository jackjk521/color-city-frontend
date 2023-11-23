import * as React from "react";
import useSWR from "swr";

import { Grid, Typography, Paper, Chip } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

function InventoryOverview({ inventoryOverview }) {
  // console.log(inventoryOverview.high_inventory_count);
  const [inventoryData, setInventoryData] = React.useState([]);
  const [ordersData, setOrdersData] = React.useState([]);

  React.useEffect(() => {
    if (inventoryOverview) {
      // Pie charts
      setInventoryData([
        { id: 1, value: inventoryOverview.high_inventory_count, label: "HIGH" },
        { id: 2, value: inventoryOverview.med_inventory_count, label: "MED" },
        { id: 3, value: inventoryOverview.low_inventory_count, label: "LOW" },
      ]);

      // Bar Charts

      // setOrdersData([
      //   { id: 1, value: inventoryOverview.high_inventory_count, label: "HIGH" },
      //   { id: 2, value: inventoryOverview.med_inventory_count, label: "MED" },
      //   { id: 3, value: inventoryOverview.low_inventory_count, label: "LOW" },
      // ]);
    }
  }, [inventoryOverview]);

  if (!inventoryOverview) {
    // Render a loading state or return null
    return null;
  }

  return (
    <React.Fragment>
      {" "}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Chip
            icon={<FaceIcon />}
            label="Inventory Status"
            variant="outlined"
          />
        </Grid>
        {/* Get Data and Create Components  */}
        {/* Inventory Overview for the whole branch */}
        <Grid item xs={6} sm={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 200,
            }}>
            <PieChart
              series={[
                {
                  data: inventoryData,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={150}
            />
          </Paper>
        </Grid>
        {/* For Approval */}
        <Grid item xs={6} sm={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 200,
            }}>
            {/* <BarChart
              dataset={ordersData}
              xAxis={[{ scaleType: "band", dataKey: "month_name" }]}
              // series={[
              //   { dataKey: "london", label: "London", valueFormatter },
              //   { dataKey: "paris", label: "Paris", valueFormatter },
              //   { dataKey: "newYork", label: "New York", valueFormatter },
              //   { dataKey: "seoul", label: "Seoul", valueFormatter },
              // ]}
              // {...chartSetting}
            /> */}
          </Paper>
        </Grid>
        {/* For Approval */}
        <Grid item xs={6} sm={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 200,
            }}></Paper>
        </Grid>
        {/* For Approval */}
        <Grid item xs={6} sm={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 200,
            }}></Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default InventoryOverview;
