import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { SuccessAlert } from "../../../utils/alertHandler";

export default function AddPurchaseModal({
  headerColor,
  closeModal,
  setAlertStatus,
}) {
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

  const handleSubmit = async () => {
    try {
      // Submit your form data or perform an action here
      setPurchaseOrder({
        orderNumber: "",
        supplier: "",
        totalAmount: "",
        shippingAddress: "",
      });

      closeModal();
      setAlertStatus((prevOrder) => ({
        ...prevOrder,
        status: "Success",
        msg: "Successfully created a purchase",
      }));
    } catch (error) {
      // If there's an error:
      // Set an error message to display
      console.error();
    }
  };

  return (
    <>
      {/* <SuccessAlert msg={"Successfully added purchase"} /> */}

      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Purchase Order
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
