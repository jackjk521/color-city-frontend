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

export default function EditModal({
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
    const category_id = data.category_id;
    try {
      const response = await apiClient.put(`/category/${category_id}/`, data);
      if (response.status === 200) {
        closeModal();
        Swal.fire({
          title: "Succcess",
          text: "Successfully updated a brand",
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
      category_id: "",
      category_name: "",
    });
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit Category
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
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  label="Category Name"
                  name="category_name"
                  value={data.category_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <SuppliersDropdown
                  selectedSupplier={data.supplier}
                  handleChange={handleChange}
                /> */}
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
