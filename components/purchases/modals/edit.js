import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function EditPurchaseModal({ headerColor, closeModal }) {
  const [purchaseOrder, setPurchaseOrder] = useState({
    orderNumber: "",
    supplier: "",
    totalAmount: "",
    shippingAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log(purchaseOrder);
    // Reset form fields
    setPurchaseOrder({
      orderNumber: "",
      supplier: "",
      totalAmount: "",
      shippingAddress: "",
    });
  };

  return (
    <>
    <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit Purchase Order
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
      <DialogContent sx={{ paddingTop: 0 }}>
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Order Number"
                  name="orderNumber"
                  value={purchaseOrder.orderNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Supplier"
                  name="supplier"
                  value={purchaseOrder.supplier}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Total Amount"
                  name="totalAmount"
                  value={purchaseOrder.totalAmount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Shipping Address"
                  name="shippingAddress"
                  value={purchaseOrder.shippingAddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </>
  );
}
