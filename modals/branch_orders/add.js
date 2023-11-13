import * as React from "react";
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
  WarehouseItemsDropdown,
  get_items,
  BONumberField,
} from "@/components/utility/get_data";
import InlineEditReactTable from "@/components/utility/tables/inlineEditReactTable";
import {
  PurchaseLineColumns,
  PurchaseLineColumnsVisibility,
} from "@/components/utility/tables/tableColumns";

import ActionFormatterPL from "@/components/branch_orders/actionFormatterPL";
import {
  handleRowSave,
  calculateSubtotal,
  calculateTotalAmount,
} from "@/components/branch_orders/branch_orders";

const url = "/purchases/";

export default function AddModal({ headerColor, closeModal, mutate }) {
  const { user } = React.useContext(UserContext);
  const [purchaseData, setPurchaseData] = React.useState({
    purchaseHeader: {
      branch: user.userCredentials.branch,
      user: user.userCredentials.user_id,
      transaction_type: "BRANCH",
      po_number: "",
      total_amount: 0,
      payment_mode: "",
      status: "UNPOSTED",
    },
    purchaseLines: [],
  });
  const [addItemData, setAddItemData] = React.useState({
    item: "",
    brand_item: "",
    item_price_w_vat: 0,
    available_stock: 0,
    req_quantity: 0,
    subtotal: 0,
  });
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    get_items()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const subTotal = React.useMemo(() => {
    return calculateSubtotal(
      items,
      addItemData.item,
      addItemData.req_quantity,
      setAddItemData
    );
  }, [addItemData.item, addItemData.req_quantity]);

  const totalAmount = React.useMemo(() => {
    return calculateTotalAmount(purchaseData, setPurchaseData);
  }, [purchaseData.purchaseLines]);

  const addPurchaseLine = () => {
    // Update the total_amount value
    const total_amount =
      purchaseData.purchaseHeader.total_amount + addItemData.subtotal;

    // Update the Purchase lines data
    setPurchaseData((prevState) => ({
      // Update the total_amount
      purchaseHeader: {
        ...prevState.purchaseHeader,
        total_amount: total_amount,
      },

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
      brand_item: "",
      item_price_w_vat: 0,
      available_stock: 0,
      req_quantity: 0,
      subtotal: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const log_data = createAddLogData(
      user.userCredentials.branch,
      user.userCredentials.branch_name,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "BRANCH_ORDER",
      undefined,
      undefined,
      purchaseData.branch
    );

    const requestData = {
      purchaseHeader: purchaseData.purchaseHeader,
      purchaseLines: JSON.stringify(purchaseData.purchaseLines),
    };

    try {
      // Add logic
      const result = await post_data(
        "branch_orders",
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
            branch: "",
            user: "",
            transaction_type: "BRANCH",
            po_number: "",
            total_amount: 0,
            payment_mode: "",
            status: "UNPOSTED",
          },
          purchaseLines: [],
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
          Add a Branch Order
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
              <Grid item xs={12} md={8}>
                <Typography variant="h5" align="left">
                  Purchase Header Entry
                </Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                {/* Total Amount  */}
                <Typography variant="h5" align="right">
                  Total Amount :
                </Typography>
              </Grid>

              <Grid item xs={12} md={2}>
                {/* Total Amount  */}
                <Typography variant="h5" align="right">
                  Php {totalAmount}
                </Typography>
                {/* <TextField
                  required
                  fullWidth
                  type="number"
                  name="total_amount"
                  label="Total Amount"
                  onChange={handlePHChange}
                  value={purchaseData.purchaseHeader.total_amount}
                  InputProps={{
                    readOnly: true,
                  }}
                /> */}
              </Grid>

              <Grid item xs={12} md={4}>
                <BONumberField setData={setPurchaseData} />
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
                {/* Created by  */}
                <TextField
                  required
                  fullWidth
                  label="Created By"
                  value={user.userCredentials.username}
                  disabled
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
                <WarehouseItemsDropdown
                  // selectedItem={addItemData.item}
                  // handleChange={handleChange}
                  setAddItemData={setAddItemData}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                {/* Requested Quantity  */}
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="req_quantity"
                  label="Requested Quantity"
                  value={addItemData.req_quantity}
                  onChange={handleChange}
                  helperText={`Max in stock: ${addItemData.available_stock}`}
                  InputProps={{
                    inputProps: { min: 0, max: addItemData.available_stock },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                {/* Subtotal  */}
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="subtotal"
                  label="Subtotal"
                  value={subTotal}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  onClick={addPurchaseLine}
                  variant="contained"
                  color="success">
                  Add to Order
                </Button>
              </Grid>
              {/* Adding Item for the Purchase Line END */}

              {/* Table of Purchase Lines here  */}
              <Grid item xs={12}>
                {/* Display the purchase lines from purchase data here in JSON format  */}

                <Typography variant="h6">Purchase Lines:</Typography>

                <InlineEditReactTable
                  data_columns={PurchaseLineColumns}
                  column_visibility={PurchaseLineColumnsVisibility}
                  local_data={purchaseData.purchaseLines}
                  action_formatter={ActionFormatterPL}
                  setLocalData={setPurchaseData}
                  handleRowSave={handleRowSave}
                />

                {/* {purchaseData.purchaseLines.map((line, index) => (
                  <div key={index}>
                    <Typography>Item: {line.item}</Typography>
                    <Typography>
                      Requested Quantity: {line.req_quantity}
                    </Typography>
                    <Typography>Subtotal: {line.subtotal}</Typography>
                    <hr />
                  </div>
                ))} */}
              </Grid>
              <Grid item xs={12} align="right">
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
