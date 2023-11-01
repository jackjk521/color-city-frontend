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
import DisplayReactTable from "@/components/utility/tables/displayReactTable";
import {
  PurchaseLineViewColumns,
  PurchaseLineViewColumnsVisibility,
} from "@/components/utility/tables/tableColumns";

export default function ViewModal({ data, headerColor, closeModal }) {
  console.log(data);
  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          View Supplier Order
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
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                name="purchase_header_id"
                label="ID"
                value={data.purchaseHeader.purchase_header_id}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                name="branch_name"
                label="From Branch"
                value={data.purchaseHeader.branch_name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                name="username"
                label="Created By"
                value={data.purchaseHeader.username}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                name="supplier_name"
                label="Supplier"
                value={data.purchaseHeader.supplier_name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                name="total_amount"
                label="Total Amount "
                value={data.purchaseHeader.total_amount}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                name="payment_mode"
                label="Payment Mode"
                value={data.purchaseHeader.payment_mode}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="left">
                Purchase Lines
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* Table  */}
              <DisplayReactTable
                data_columns={PurchaseLineViewColumns}
                column_visibility={PurchaseLineViewColumnsVisibility}
                fetched_data={data.purchaseLines}
              />
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </>
  );
}
