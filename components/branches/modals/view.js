import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ViewModal({ data, headerColor, closeModal }) {
  console.log(data);
  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          View Branch
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Container maxWidth="sm">
          {/* Fields Start  */}
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Branch ID"
                value={data.branch_id}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Branch Name"
                value={data.branch_name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Address"
                value={data.address}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}></Grid>
        </Container>
      </DialogContent>
    </>
  );
}
