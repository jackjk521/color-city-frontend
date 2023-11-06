import React from "react";
import Skeleton from "@mui/material/Skeleton";
import {Grid} from "@mui/material"

export default function TabsTableSkeleton() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Skeleton animation="wave"  variant="rounded" height={100} />
        </Grid>
        <Grid item xs={3}>
          <Skeleton animation="wave"  variant="rounded" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton animation="wave"  variant="rectangular" height={300} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
