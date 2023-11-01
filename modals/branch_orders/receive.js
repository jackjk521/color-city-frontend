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
  ItemsDropdown,
  SuppliersDropdown,
  get_items,
} from "@/components/utility/get_data";
import { UserContext } from "@/contexts/userContext";
import Swal from "sweetalert2";
import CheckBoxReactTable from "@/components/utility/tables/checkBoxReactTable";
import {
  ReceivingItemsColumns,
  ReceivingItemsColumnVisibility,
} from "@/components/utility/tables/tableColumns";
import {
  rowSelectionSetup,
  getRowId,
} from "@/components/supplier_orders/supplier_orders";

export default function ReceiveModal({
  headerColor,
  data,
  setData,
  closeModal,
}) {
  // console.log(data.purchaseHeader.purchase_header_id);
    const { user } = useContext(UserContext);
    const [rowSelection, setRowSelection] = useState({});
    const [rowIdSelection, setRowIdSelection] = useState([]);

    useEffect(() => {
      // Get the ids from the table
      get_all_ids();  
      // console.log(rowIdSelection);
    }, [rowIdSelection]);

    const get_all_ids = () => {
      // Retrieve the selected purchase_line_ids
      const selectedRowIds = Object.keys(rowSelection).map((key) => {
        return parseInt(key);
      });
      setRowIdSelection(selectedRowIds);
    };

    // Receiving Items (Purchase Lines)
    const handleRowSave = (e) => {
      const { values, row } = e;

      const item_id = row.original.item;
      const receive_qty = values.receive_qty;

      setData((prevState) => ({
        ...prevState,
        purchaseLines: prevState.purchaseLines.map((line) => {
          if (line.item === item_id) {
            // console.log(line.item === item_id);
            return {
              ...line,
              receive_qty: receive_qty,
            };
          }
          return line;
        }),
      }));

      e.table.setEditingRow(null);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const purchase_header_id = data.purchaseHeader.purchase_header_id;
      const url = `/receiving/${purchase_header_id}/`;

      // Receive log data
      const log_data = createEditLogData(
        user.userCredentials.branch,
        user.userCredentials.branch_name,
        user.userCredentials.user_id,
        user.userCredentials.username,
        "RECEIVE_ORDER",
        purchase_header_id,
        undefined,
        undefined
      );
      
      // Data to send to the backend
      const requestData = {
        from_branch: user.userCredentials.branch,
        completeReceive: JSON.stringify(rowIdSelection),
        purchaseLines: JSON.stringify(data.purchaseLines),
      };
      // console.log(requestData);

      try {
        // Update Purchase Header, Purchase Lines and Inventory
        const result = await put_data(
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
          Receive Supplier Order
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
              {/* Table of Purchase Lines here  */}
              <Grid item xs={12}>
                <Typography variant="h6">Purchase Item List:</Typography>
                <Typography variant="subtitle">
                  Note: The items below are not yet received or partially
                  received
                </Typography>

                <CheckBoxReactTable
                  data_columns={ReceivingItemsColumns}
                  column_visibility={ReceivingItemsColumnVisibility}
                  fetched_data={data.purchaseLines}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  handleRowSave={handleRowSave}
                  rowSelectionSetup={rowSelectionSetup}
                  getRowId={getRowIdsdddd}
                />
              </Grid>
              <Grid item xs={12} align="right">
                <Button type="submit" variant="contained" color="success">
                  Receive
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </React.Fragment>
  );
}
