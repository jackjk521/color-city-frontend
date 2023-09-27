import React, { useState } from "react";
import {
  Button,
  DialogActions,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
} from "@mui/material";

export default function RemovePurchaseModal({ onClose, headerColor  }) {
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
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography variant="h4" align="center">
          Remove Purchase Order
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="md">
          <Typography variant="body1" gutterBottom>
            Are you sure you want to remove this purchase order?
          </Typography>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRemove} color="secondary">
              Remove
            </Button>
          </DialogActions>
        </Container>
      </DialogContent>
    </>
  );
}
