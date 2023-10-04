import React, { useState } from "react";
import {
  Button,
  DialogActions,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RemovePurchaseModal({ headerColor, closeModal }) {
  const [purchaseOrder, setPurchaseOrder] = useState({
    orderNumber: "",
    supplier: "",
    totalAmount: "",
    shippingAddress: "",
  });

  const handleRemove = (e) => {
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
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Remove Purchase Order
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
        <Container maxWidth="sm" mt={1}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to remove this purchase order?
          </Typography>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleRemove}>
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={closeModal}>
              No
            </Button>
          </DialogActions>
        </Container>
      </DialogContent>
    </>
  );
}
