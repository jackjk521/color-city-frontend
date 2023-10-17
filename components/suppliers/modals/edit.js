import React, { useState } from "react";
import {
  TextField,
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

export default function EditPurchaseModal({
  headerColor,
  data,
  setData,
  closeModal,
  mutate,
}) {
  // console.log(data);

  // Get all categories

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supplier_id = data.supplier_id;
    try {
      const response = await apiClient.put(`/supplier/${supplier_id}/`, data);
      if (response.status === 200) {
        closeModal();
        Swal.fire({
          title: "Succcess",
          text: "Successfully updated a supplier",
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
    setData({
      brand_id: "",
      brand_name: "",
      supplier: "",
      supplier_name: "",
    });
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit Brand
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
            <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Supplier Name"
                  name="supplier_name"
                  value={data.supplier_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="contact_num"
                  value={data.contact_num}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Discount Rate"
                  name="discount_rate"
                  value={data.discount_rate}
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
