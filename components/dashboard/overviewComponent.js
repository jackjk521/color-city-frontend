import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Chip,
  CardContent,
  CardActions,
  Button,
  Card,
} from "@mui/material";
import Image from "next/image";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { OverviewCards } from "../utility/get_data";
function OverviewComponent() {
  return (
    <React.Fragment>
      {" "}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Chip icon={<SummarizeIcon />} label="Overview" variant="outlined" size="large"/>
        </Grid>
        {/* Get Data and Create Components  */}
        <OverviewCards />
      </Grid>
    </React.Fragment>
  );
}

export default OverviewComponent;
