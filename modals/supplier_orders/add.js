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
import Swal from "sweetalert2";
import { post_data } from "@/components/utility/api/fetcher";
import { createAddLogData } from "@/components/utility/logger";
import { UserContext } from "@/contexts/userContext";
import {
  ItemsDropdown,
  SuppliersDropdown,
} from "@/components/utility/get_data";
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  PurchaseLineColumns,
  PurchaseLineColumnsVisibility,
} from "@/components/utility/tables/tableColumns";

import ActionFormatter from "@/components/supplier_orders/actionFormatter";

const url = "/purchases/";

export default function AddModal({ headerColor, closeModal, mutate }) {
  const { user } = useContext(UserContext);
  const [purchaseData, setPurchaseData] = useState({
    purchaseHeader: {
      branch: user.userCredentials.branch,
      user: user.userCredentials.user_id,
      transaction_type: "SUPPLIER",
      supplier: "",
      total_amount: 0,
      payment_mode: "",
      status: "APPROVED",
    },
    purchaseLines: [
      // {
      //   item: "",
      //   req_quantity: 0,
      //   subtotal: 0,
      // },
    ],
  });

  const [addItemData, setAddItemData] = useState({
    item: "",
    req_quantity: 0,
    subtotal: 0,
  });

  const addPurchaseLine = () => {
    setPurchaseData((prevState) => ({
      ...prevState,
      purchaseLines: [
        ...prevState.purchaseLines,
        {
          ...addItemData,
        },
      ],
    }));

    // Reset after every add of the purchase line
    setAddItemData({
      item: "",
      req_quantity: 0,
      subtotal: 0,
    });
  };

  const handlePHChange = (e) => {
    const { name, value } = e.target; // gets the item id from the items dropdownn
    // setPurchaseData((prevOrder) => ({ ...prevOrder, [name]: value }));
    setPurchaseData((prevState) => ({
      ...prevState,
      purchaseHeader: {
        ...prevState.purchaseHeader,
        [name]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // gets the item id from the items dropdownn
    setAddItemData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const log_data = createAddLogData(
      user.userCredentials.branch,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "SUPP_ORDER",
      purchaseData.branch // to be changed or to create another logger
    );

    const requestData = {
      purchaseHeader: purchaseData.purchaseHeader,
      purchaseLines: JSON.stringify(purchaseData.purchaseLines),
    };

    try {
      // Add logic
      const result = await post_data(
        "supplier_orders",
        url,
        requestData,
        closeModal,
        mutate,
        log_data
      );
      // Reset form fields only after the API request is successfully completed
      if (result) {
        // Reset form fields
        setPurchaseData((prevState) => ({
          ...prevState,
          purchaseHeader: {
            ...prevState.purchaseHeader,
            branch: "",
            user: "",
            transaction_type: "SUPPLIER",
            supplier: "",
            total_amount: 0,
            payment_mode: "",
            status: "APPROVED",
          },
        }));
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
          Add a Supplier Order
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
              {/* Purchase Header  */}
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Purchase Header Entry
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Supplier Dropdown  */}
                <SuppliersDropdown
                  selectedSupplier={purchaseData.purchaseHeader.supplier}
                  handleChange={handlePHChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Payment Mode  */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Payment Mode
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Payment Mode"
                    name="payment_mode"
                    id="demo-simple-select"
                    onChange={handlePHChange}>
                    <MenuItem value={"CASH"}>Cash</MenuItem>
                    <MenuItem value={"CHECK"}>Check</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Total Amount  */}
                <TextField
                  required
                  fullWidth
                  name="total_amount"
                  label="Total Amount"
                  onChange={handlePHChange}
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Purchase Items
                </Typography>
              </Grid>
              {/* Adding Item for the Purchase Line  */}
              <Grid item xs={12} md={5}>
                {/* Item Dropdown  */}
                <ItemsDropdown
                  selectedItem={addItemData.item}
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                {/* Requested Quantity  */}
                <TextField
                  required
                  fullWidth
                  name="req_quantity"
                  label="Requested Quantity"
                  value={addItemData.req_quantity}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                {/* Subtotal  */}
                <TextField
                  required
                  fullWidth
                  name="subtotal"
                  label="Subtotal"
                  value={addItemData.subtotal}
                  onChange={handleChange}
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  onClick={addPurchaseLine}
                  variant="contained"
                  color="primary">
                  Add to Order
                </Button>
              </Grid>
              {/* Adding Item for the Purchase Line END */}

              {/* Table of Purchase Lines here  */}
              <Grid item xs={12}>
                {/* Display the purchase lines from purchase data here in JSON format  */}
                <Typography variant="h6">Purchase Lines:</Typography>
                {purchaseData.purchaseLines.map((line, index) => (
                  <div key={index}>
                    <Typography>Item: {line.item}</Typography>
                    <Typography>
                      Requested Quantity: {line.req_quantity}
                    </Typography>
                    <Typography>Subtotal: {line.subtotal}</Typography>
                    <hr />
                  </div>
                ))}

                <BasicReactTable
                  data_columns={PurchaseLineColumns}
                  column_visibility={PurchaseLineColumnsVisibility}
                  fetched_data={purchaseData.purchaseLines}
                  action_formatter={ActionFormatter}
                />

              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit Supplier Order
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </React.Fragment>
  );
}
