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

export default function ViewPurchaseModal({ order, headerColor }) {
  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          View Purchase Order
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
          <Grid container spacing={2} mt={1}>
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
