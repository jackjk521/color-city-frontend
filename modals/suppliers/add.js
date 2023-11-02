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

const url = "/suppliers";
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

    // Add logic
    post_data("supplier", url, supplierData, closeModal, mutate);

    // Reset form fields
    setSupplierData({
      supplier_id: "",
      supplier_name: "",
      contact_num: "",
      discount_rate: "",
    });
  };

  return (
    <React.Fragment>
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
                  type="number"
                  label="Discount Rate"
                  name="discount_rate"
                  onChange={handleChange}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
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
