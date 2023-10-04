import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Button,
  Grid,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

export default function AddPurchaseModal({ headerColor, closeModal }) {
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
      Swal.fire({
        title: "Success",
        text: "Successful",
        icon: "success",
        // confirmButtonText: "Cool",
      });
    } catch (error) {
      // If there's an error:
      // Set an error message to display
      Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
      console.error();
    }
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Add Purchase Order
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
          {/* Form Start  */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <Typography>Category One</Typography>
              </Grid>
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Php</InputAdornment>
                    ),
                  }}
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
                {/* <Typography> Category Two </Typography> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Total Amount
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Total Amount"
                    name="totalAmount"
                    id="demo-simple-select"
                    value={10000}
                    onChange={handleChange}>
                    <MenuItem value={10000}>10,000</MenuItem>
                    <MenuItem value={20000}>20,000</MenuItem>
                    <MenuItem value={30000}>30,000</MenuItem>
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Php</InputAdornment>
                    ),
                  }}
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
                <Typography> Category One </Typography>
              </Grid>
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Php</InputAdornment>
                    ),
                  }}
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
