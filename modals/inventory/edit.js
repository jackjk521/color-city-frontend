import React, { useState, useEffect, useContext } from "react";
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
import { createEditLogData } from "@/components/utility/logger";
import { BranchesDropdown } from "@/components/utility/get_data";
import { get_items } from "@/components/utility/get_data";
import { UserContext } from "@/contexts/userContext";

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

  const {user } = useContext(UserContext)

  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    get_items()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target; // gets the item id from the items dropdownn
  //   setItemData((prevOrder) => ({ ...prevOrder, [name]: value }));
  // };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target; // gets the item id from the items dropdownn

    const item = items.find((item) => item.item_id === value);
    setData((prevOrder) => ({
      ...prevOrder,
      item_price_w_vat: item.item_price_w_vat,
      [name]: value,
    }));
  };

  const handleQuantityChange = (e) => {
    const { name, value } = e.target;
    setTotalQuantity(value);
    calculatePrice(data.item, value);
    setData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const calculatePrice = (selectedItem, quantity) => {
    const item = items.find((item) => item.item_id === selectedItem);
    if (item) {
      const price = item.item_price_w_vat * quantity;
      setCalculatedPrice(parseFloat(price.toFixed(2)));
      setData((prevOrder) => ({
        ...prevOrder,
        holding_cost: calculatedPrice,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inventory_id = data.inventory_id;
    const url = `/inv/${inventory_id}/`;
    // Add log data
    const log_data = createEditLogData(
      user.userCredentials.branch,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "INVENTORY",
      inventory_id,
      data.item_name
    );
    // Edit Logic
    put_data("inventory", url, data, closeModal, mutate, log_data);

    // Reset form fields
    setData({
      item: "",
      item_name: "",
      item_price_w_vat: "",
      branch: "",
      branch_name: "",
      total_quantity: "",
      holding_cost: 0,
    });
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit Inventory Entry
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
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="items-label">Items</InputLabel>
                  <Select
                    fullWidth
                    labelId="items-label"
                    label="items"
                    id="items-select"
                    name="item"
                    value={data.item}
                    onChange={handleDropdownChange}>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <MenuItem key={item.item_id} value={item.item_id}>
                          {item.brand_name} - {item.item_name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem key={0} value={0}>
                        NO ITEMS
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <BranchesDropdown
                  selectedBranch={data.branch}
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  name="total_quantity"
                  label="Total Quantity"
                  value={data.total_quantity}
                  onChange={handleQuantityChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  name="item_price_w_vat"
                  label="Item Price W/ Vat"
                  value={data.item_price_w_vat}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  name="holding_cost"
                  label="Holding Cost"
                  value={parseFloat(data.holding_cost).toFixed(2)} // bug here
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
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
