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
          View Item
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
        <Container maxWidth="lg">
          {/* Fields Start  */}
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={1}>
              <TextField
                fullWidth
                label="Item ID"
                value={data.item_id}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Item Number"
                value={data.item_number}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Item Name"
                value={data.item_name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Brand"
                value={data.brand_name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Total Quantity"
                value={data.total_quantity}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Category"
                value={data.category_name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <TextField
                fullWidth
                label="Unit"
                value={data.unit}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <TextField
                fullWidth
                label="Package"
                value={data.package}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Catalyst"
                value={data.catalyst}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Item Price W/ Vat"
                value={data.item_price_w_vat}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Item Price W/O Vat"
                value={data.item_price_wo_vat}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Retail Price"
                value={data.retail_price}
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
