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
import { put_data } from "@/components/utility/api/fetcher";
import { createEditLogData } from "@/components/utility/logger";
import {
  BranchesDropdown,
  get_items,
  ItemsDropdown,
} from "@/components/utility/get_data";
import { UserContext } from "@/contexts/userContext";
import {
  handleDropdownChange,
  calculatePrice,
} from "@/components/inventory/inventory";

export default function EditModal({
  headerColor,
  data,
  setData,
  closeModal,
  mutate,
}) {
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
    setData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const holdingCost = useMemo(() => {
    return calculatePrice(data.item, data.total_quantity, items, setData);
  }, [data.item, data.total_quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inventory_id = data.inventory_id;
    const url = `/inv/${inventory_id}/`;
    // Add log data
    const log_data = createEditLogData(
      user.userCredentials.branch,
      user.userCredentials.branch_name,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "INVENTORY",
      inventory_id,
      data.item_name,
      data.branch_name
    );

    try {
      // Edit Logic
      const result = await put_data(
        "inventory",
        url,
        data,
        closeModal,
        mutate,
        log_data
      );

      // Reset form fields only after the API request is successfully completed
      if (result) {
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
                <ItemsDropdown
                  setAddItemData={setData}
                />
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
                  type="number"
                  name="total_quantity"
                  label="Total Quantity"
                  value={data.total_quantity}
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
                  type="number"
                  name="holding_cost"
                  label="Holding Cost"
                  value={data.holding_cost ? data.holding_cost : holdingCost}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="warning">
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </React.Fragment>
  );
}
