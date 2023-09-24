import React from "react";
import { Box, Grid, Tabs, Tab, useMediaQuery } from "@mui/material";
import CardGrid from "./utility/CardGrid";
import InventoryTable from "./utility/ResponsiveTable";
import CustomTabPanel from "./utility/customTabPanel";
import TableTemp from "./temp/ResponsiveTable copy";

// const columns = [
//   { id: 1, header: "Name", field: "name" },
//   { id: 2, header: "Age", field: "age" },
//   { id: 3, header: "Email", field: "email" },
// ];

// const data = [
//   { id: 1, name: "John Doe", age: 25, email: "johndoe@example.com" },
//   { id: 2, name: "Jane Smith", age: 32, email: "janesmith@example.com" },
//   { id: 3, name: "Alice Johnson", age: 28, email: "alicejohnson@example.com" },
// ];

const InventoryContent = () => {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                <Tab label="All" />
                <Tab label="Branch 1" />
                <Tab label="Branch 2" />
              </Tabs>
            </Box>
            
            <CustomTabPanel value={value} index={0}>
              <CardGrid
                table={<InventoryTable columns={columns} data={data} />}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CardGrid table={<TableTemp columns={columns} data={data} />} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <CardGrid
                table={<InventoryTable columns={columns} data={data} />}
              />
            </CustomTabPanel>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default InventoryContent;
