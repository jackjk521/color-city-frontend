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
import FaceIcon from "@mui/icons-material/Face";
import { OverviewCards } from "../utility/get_data";
function OverviewComponent() {
  return (
    <React.Fragment>
      {" "}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Chip icon={<FaceIcon />} label="Overview" variant="outlined" />
        </Grid>
        {/* Get Data and Create Components  */}
        <OverviewCards />
      </Grid>
    </React.Fragment>
  );
}

export default OverviewComponent;
