import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function CustomGrid_3({categories, brands, suppliers}) {
  return (
    <>
      {" "}
      <Grid container spacing={3}>

        {/* Categories  */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}>
            {/* Content */}
          </Paper>
        </Grid>

        {/* Brands */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}>
            {/* Content */}
          </Paper>
        </Grid>

        {/* Suppliers */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
