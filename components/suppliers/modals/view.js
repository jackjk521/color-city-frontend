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
} from "@mui/material";

export default function ViewPurchaseModal({ order, headerColor }) {
  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography variant="h4" align="center">
          View Purchase Order
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Order Number"
                value={order.orderNumber}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Supplier"
                value={order.supplier}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Total Amount"
                value={order.totalAmount}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Shipping Address"
                value={order.shippingAddress}
                disabled
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleViewModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Container>
      </DialogContent>
    </>
  );
}
