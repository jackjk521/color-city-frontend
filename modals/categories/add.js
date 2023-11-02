import React, { useState, useEffect } from "react";
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
import { post_data } from "@/components/utility/api/fetcher";

const url = "/categories";
export default function AddModal({ headerColor, closeModal, mutate }) {
  const [categoryData, setCategoryData] = React.useState({
    category_id: "",
    category_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add logic
    post_data("category", url, categoryData, closeModal, mutate);

    // Reset form fields
    setCategoryData({
      category_id: "",
      category_name: "",
    });
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Add Category
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
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  label="Category Name"
                  name="category_name"
                  // value={categoryData.brand_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <SuppliersDropdown
                  selectedSupplier={categoryData.supplier}
                  handleChange={handleChange}
                /> */}
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="success">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </React.Fragment>
  );
}
