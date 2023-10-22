import React, { useState } from "react";
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
import {
  BrandsDropdown,
  CategoriesDropdown,
  CatalystsDropdown,
} from "@/components/utility/get_data";
import { put_data } from "@/components/utility/api/fetcher";


export default function EditModal({
  headerColor,
  data,
  setData,
  closeModal,
  mutate,
}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item_id = data.item_id;
    const url = `/item/${item_id}/`

    // Edit Logic
    put_data('item', url, data, closeModal, mutate)
    // Reset form fields
    setData({
      item_id: "",
      item_number: "",
      item_name: "",
      brand: "",
      brand_name: "",
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
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit Item
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
                  label="Item Name"
                  name="item_name"
                  value={data.item_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <BrandsDropdown
                  selectedBrand={data.brand}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <CategoriesDropdown
                  selectedCategory={data.category}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CatalystsDropdown
                  selectedItem={data.catalyst}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={1}>
                <TextField
                  required
                  fullWidth
                  name="unit"
                  label="Unit"
                  value={data.unit}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Package</InputLabel>
                  <Select
                    fullWidth
                    label="Package"
                    name="package"
                    id="demo-simple-select"
                    value={data.package}
                    onChange={handleChange}>
                    <MenuItem value={"L"}>Liter/s</MenuItem>
                    <MenuItem value={"GL"}>Gallons</MenuItem>
                    <MenuItem value={"PC"}>Piece</MenuItem>
                    <MenuItem value={"PCS"}>Pieces</MenuItem>
                    <MenuItem value={"SHTS"}>Sheets</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  required
                  fullWidth
                  name="item_price_w_vat"
                  label="Item Price W/ Vat"
                  value={data.item_price_w_vat}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  required
                  fullWidth
                  name="item_price_wo_vat"
                  label="Item Price W/O Vat"
                  value={data.item_price_wo_vat}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  required
                  fullWidth
                  name="retail_price"
                  label="Retail Price"
                  value={data.retail_price}
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
    </React.Fragment>
  );
}
