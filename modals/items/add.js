import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
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
  ItemNumberField,
  BrandsDropdown,
  CategoriesDropdown,
} from "@/components/utility/get_data";
import { UserContext } from "@/contexts/userContext";
import { createAddLogData } from "@/components/utility/logger";
import { post_data } from "@/components/utility/api/fetcher";

const url = "/items/";
export default function AddModal({ headerColor, closeModal, mutate }) {
  const [itemData, setItemData] = useState({
    item_number: "",
    item_name: "",
    brand: "",
    total_quantity: "",
    category: "",
    unit: "",
    package: "",
    item_price_w_vat: "",
    item_price_wo_vat: "",
    retail_price: "",
    catalyst: 0,
  });
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevOrder) => ({ ...prevOrder, [name]: value }));

    if(name === "item_price_w_vat"){
        const price = value * 0.88
        setItemData((prevOrder) => ({ ...prevOrder, item_price_wo_vat: price }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const log_data = createAddLogData(
      user.userCredentials.branch,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "ITEMS",
      itemData.item_name
    );
    try {
      const result = await post_data(
        "item",
        url,
        itemData,
        closeModal,
        mutate,
        log_data
      );
      
      // Reset form fields only after the API request is successfully completed
      if (result) {
        setItemData({
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
          catalyst: 0,
          created_at: "",
        });
      }
    } catch (error) {
      // Handle the error
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  };



  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Add Item
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
              <Grid item xs={12} md={3}>
                <ItemNumberField />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Item Name"
                  name="item_name"
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
                <CategoriesDropdown
                  selectedCategory={itemData.category}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={1}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="unit"
                  label="Unit"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Package</InputLabel>
                  <Select
                    fullWidth
                    label="Package"
                    name="package"
                    id="demo-simple-select"
                    onChange={handleChange}>
                    <MenuItem value={"L"}>Liter/s</MenuItem>
                    <MenuItem value={"GL"}>Gallons</MenuItem>
                    <MenuItem value={"PC"}>Piece</MenuItem>
                    <MenuItem value={"PCS"}>Pieces</MenuItem>
                    <MenuItem value={"SHTS"}>Sheets</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="item_price_wo_vat"
                  label="Item Price W/O Vat"
                  value={itemData.item_price_wo_vat}
                  onChange={handleChange}
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="item_price_w_vat"
                  label="Item Price W/ Vat"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="retail_price"
                  label="Retail Price"
                  onChange={handleChange}
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
