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
import apiClient from "@/components/utility/api/apiClient";
import Swal from "sweetalert2";
import { SuppliersDropdown } from "@/components/utility/get_data";

export default function AddModal({ headerColor, closeModal, mutate }) {
  const [supplierData, setSupplierData] = React.useState({
    supplier_id: "",
    supplier_name: "",
    contact_num: "",
    discount_rate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(`/suppliers`, supplierData);
      if (response.status === 201) {
        closeModal();
        Swal.fire({
          title: "Succcess",
          text: "Successfully added a supplier",
          icon: "success",
        });
        mutate();
      }
    } catch (error) {
      // Handle the error
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
      throw error;
    }
    // Reset form fields
    setSupplierData({
      supplier_id: "",
      supplier_name: "",
      contact_num: "",
      discount_rate: "",
    });
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Add Supplier
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
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Supplier Name"
                  name="supplier_name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="contact_num"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Discount Rate"
                  name="discount_rate"
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
