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
import {
  BrandsDropdown,
  CategoriesDropdown,
} from "@/components/utility/get_data";

export default function EditPurchaseModal({
  headerColor,
  itemData,
  setItemData,
  closeModal,
  mutate,
}) {
  // console.log(itemData);

  // Get all categories

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item_id = itemData.item_id;
    try {
      const response = await apiClient.put(`/item/${item_id}/`, itemData);
      if (response.status === 200) {
        closeModal();
        Swal.fire({
          title: "Succcess",
          text: "Successfully updated an item",
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
    setItemData({
      item_id: "",
      item_number: "",
      item_name: "",
      brand: "",
      brand_name: "",
      total_quantity: "",
      category: "",
      unit: "",
      package: "",
      item_price_w_vat: "",
      item_price_wo_vat: "",
      retail_price: "",
      catalyst: "",
      created_at: "",
    });
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit Data
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ paddingTop: 0 }}>
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={3}>
                {/* <TextField
                    fullWidth
                    label="Item Number"
                    name="item_number"
                    value={itemData.item_number}
                    InputProps={{
                      readOnly: true,
                    }}
                  /> */}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Item Name"
                  name="item_name"
                  value={itemData.item_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <BrandsDropdown
                  selectedBrand={itemData.brand}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  required
                  fullWidth
                  name="total_quantity"
                  label="Total Quantity"
                  value={itemData.total_quantity}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={2}>
                <CategoriesDropdown
                  selectedCategory={itemData.category}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <TextField
                  required
                  fullWidth
                  name="unit"
                  label="Unit"
                  value={itemData.unit}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <TextField
                  required
                  fullWidth
                  label="Package"
                  value={itemData.package}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  required
                  fullWidth
                  label="Catalyst"
                  value={itemData.catalyst}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  required
                  fullWidth
                  name="item_price_w_vat"
                  label="Item Price W/ Vat"
                  value={itemData.item_price_w_vat}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  required
                  fullWidth
                  name="item_price_wo_vat"
                  label="Item Price W/O Vat"
                  value={itemData.item_price_wo_vat}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  required
                  fullWidth
                  name="retail_price"
                  label="Retail Price"
                  value={itemData.retail_price}
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
