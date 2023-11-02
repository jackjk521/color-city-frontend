import React, { useState, useEffect, useContext, useMemo } from "react";
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
import {
  BranchesDropdown,
  get_items,
  ItemsDropdown,
} from "@/components/utility/get_data";
import { post_data } from "@/components/utility/api/fetcher";
import { createAddLogData } from "@/components/utility/logger";
import { UserContext } from "@/contexts/userContext";
import {
  handleDropdownChange,
  calculatePrice,
} from "@/components/inventory/inventory";

const url = "/inventory/";
export default function AddModal({ headerColor, closeModal, mutate }) {
  const [inventoryData, setInventoryData] = useState({
    item: "",
    item_name: "",
    item_price_w_vat: "",
    brand_item: "",
    branch: "",
    branch_name: "",
    total_quantity: "",
    holding_cost: 0,
  });
  const { user } = useContext(UserContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    get_items()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target; // gets the item id from the items dropdownn
    setInventoryData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };


  const holdingCost = useMemo(() => {
    return calculatePrice(
      inventoryData.item,
      inventoryData.total_quantity,
      items,
      setInventoryData
    );
  }, [inventoryData.item, inventoryData.total_quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const log_data = createAddLogData(
      user.userCredentials.branch,
      user.userCredentials.branch_name,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "INVENTORY",
      inventoryData.item_name,
      inventoryData.branch_name
    );

    try {
      // Add logic
      const result = await post_data(
        "inventory",
        url,
        inventoryData,
        closeModal,
        mutate,
        log_data
      );
      // Reset form fields only after the API request is successfully completed
      if (result) {
        // Reset form fields
        setInventoryData({
          item: "",
          item_name: "",
          item_price_w_vat: "",
          brand_item: "",
          branch: "",
          branch_name: "",
          total_quantity: "",
          holding_cost: "",
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
          Add Item to Inventory Entry
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
                <ItemsDropdown
                  setAddItemData={setInventoryData}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BranchesDropdown
                  selectedBranch={inventoryData.branch}
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="total_quantity"
                  label="Total Quantity"
                  onChange={handleChange}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="item_price_w_vat"
                  label="Item Price W/ Vat"
                  value={inventoryData.item_price_w_vat}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="holding_cost"
                  label="Holding Cost"
                  value={holdingCost}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
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
