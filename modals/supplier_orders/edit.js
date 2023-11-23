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
import { put_data } from "@/components/utility/api/fetcher";
import { createEditLogData } from "@/components/utility/logger";
import {
  ItemsDropdown,
  SuppliersDropdown,
  get_items,
} from "@/components/utility/get_data";
import { UserContext } from "@/contexts/userContext";
import Swal from "sweetalert2"
import InlineEditReactTable from "@/components/utility/tables/inlineEditReactTable";
import {
  PurchaseLineColumns,
  PurchaseLineColumnsVisibility,
} from "@/components/utility/tables/tableColumns";
import ActionFormatterPL from "@/components/supplier_orders/actionFormatterPL";

export default function EditModal({
  headerColor,
  data,
  setData,
  closeModal,
  mutate,
}) {
  console.log(data);

  const { user } = React.useContext(UserContext);

  const [addItemData, setAddItemData] = React.useState({
    item: "",
    brand_item: "",
    item_price_w_vat: 0,
    req_quantity: 0,
    subtotal: 0,
  });
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
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
    // setdata((prevOrder) => ({ ...prevOrder, [name]: value }));
    setData((prevState) => ({
      ...prevState,
      purchaseHeader: {
        ...prevState.purchaseHeader,
        [name]: value,
      },
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target; // gets the item id from the items dropdownn
  //   setAddItemData((prevOrder) => ({ ...prevOrder, [name]: value }));
  // };

  // const calculateSubtotal = (item_id, quantity) => {
  //   const item = items.find((item) => item.item_id === item_id);
  //   if (item) {
  //     const subtotal = item.item_price_w_vat * quantity;
  //     setAddItemData((prevOrder) => ({
  //       ...prevOrder,
  //       subtotal: subtotal,
  //     }));
  //     return subtotal;
  //   }
  //   return 0;
  // };

  const calculateTotalAmount = () => {
    const total = data.purchaseLines.reduce(
      (accumulator, item) => accumulator + item.subtotal,
      0
    );
    setData((prevState) => ({
      ...prevState,
      purchaseHeader: {
        ...prevState.purchaseHeader,
        total_amount: total,
      },
    }));
    return total;
  };

  // const subTotal = useMemo(() => {
  //   return calculateSubtotal(addItemData.item, addItemData.req_quantity);
  // }, [addItemData.item, addItemData.req_quantity]);

  const totalAmount = React.useMemo(() => {
    return calculateTotalAmount();
  }, [data.purchaseLines]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const purchase_header_id = data.purchase_header_id;
    const url = `/purchases/${purchase_header_id}/`;
    // Add log data
    const log_data = createEditLogData(
      user.userCredentials.branch,
      user.userCredentials.branch_name,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "SUPP_ORDER",
      purchase_header_id,
      undefined,
      undefined
    );

    try {
      // Edit Logic
      const result = await put_data(
        "supplier_orders",
        url,
        data,
        closeModal,
        mutate,
        log_data
      );

      // Reset form fields only after the API request is successfully completed
      if (result) {
        // Reset form fields
        setData((prevState) => ({
          ...prevState,
          purchaseHeader: {
            branch: "",
            user: "",
            transaction_type: "SUPPLIER",
            supplier: "",
            total_amount: 0,
            payment_mode: "",
            status: "APPROVED",
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
                  Php {data.purchaseHeader.total_amount ? data.purchaseHeader.total_amount :  totalAmount}
                </Typography>
                {/* <TextField
                  required
                  fullWidth
                  type="number"
                  name="total_amount"
                  label="Total Amount"
                  onChange={handlePHChange}
                  value={data.purchaseHeader.total_amount}
                  InputProps={{
                    readOnly: true,
                  }}
                /> */}
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Supplier Dropdown  */}
                <SuppliersDropdown
                  selectedSupplier={data.purchaseHeader.supplier}
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
                    value={data.purchaseHeader.payment_mode}
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
                  value={data.purchaseHeader.username}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Purchase Items
                </Typography>
              </Grid>

              {/* Table of Purchase Lines here  */}
              <Grid item xs={12}>
                {/* Display the purchase lines from purchase data here in JSON format  */}

                <Typography variant="h6">Purchase Lines:</Typography>

                <InlineEditReactTable
                  data_columns={PurchaseLineColumns}
                  column_visibility={PurchaseLineColumnsVisibility}
                  local_data={data.purchaseLines}
                  action_formatter={ActionFormatterPL}
                  setLocalData={setData}
                />
              </Grid>
              <Grid item xs={12} align="right">
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
