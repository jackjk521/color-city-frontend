import React from "react";
import { Box, Grid, Tabs, Tab, useMediaQuery } from "@mui/material";
import CardGrid from "./utility/CardGrid";

const SupplierContent = ({ children }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
          <Box sx={{ maxWidth: "lg", width: "100%" }}>{children}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SupplierContent;
