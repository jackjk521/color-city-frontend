import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

export default function TableRowsSkeleton() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton animation="wave" variant="rectangular" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton animation="wave" variant="rectangular" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton animation="wave" variant="rectangular" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton animation="wave" variant="rectangular" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton animation="wave" variant="rectangular" height={100} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
