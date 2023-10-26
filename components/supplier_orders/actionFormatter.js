import * as React from "react";
import {
  Box,
  IconButton,
  Grid,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ViewBtn,
  EditBtn,
  RemoveBtn,
} from "../utility/tables/actionButtonList";
import SupplierOrdersModalManager from "../../modals/supplier_orders/supplierOrdersModalManager";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Suppleir Orders Table
const ActionFormatter = ({ rowData, mutate }) => {
  // console.log(rowData)
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [purchaseData, setPurchaseData] = React.useState({
    purchaseHeader: {
      purchase_header_id: "",
      branch: "",
      user: "",
      transaction_type: "",
      supplier: "",
      total_amount: 0,
      payment_mode: "",
      status: "",
    },
    purchaseLines: [],
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  // Action Handlers
  const openView = () => {
    console.log(rowData);
    // open view logic
    setPurchaseData({
      purchaseHeader: {
        branch: rowData.branch,
        user: rowData.user,
        transaction_type: rowData.transaction_type,
        supplier: rowData.supplier,
        total_amount: rowData.total_amount,
        payment_mode: rowData.payment_mode,
        status: rowData.status,
      },
      purchaseLines: [],
    });

    openModal("view");
  };

  const openEdit = () => {
    // open edit logic
    // console.log(rowData);
    setPurchaseData({
      inventory_id: rowData.inventory_id,
      item: rowData.item,
      item_name: rowData.item_name,
      item_price_w_vat: rowData.item_price_w_vat,
      branch: rowData.branch,
      branch_name: rowData.branch_name,
      total_quantity: rowData.total_quantity,
      holding_cost: rowData.holding_cost,
    });
    openModal("edit");
  };

  const openRemove = async () => {
    // open remove logic
    openModal("remove");
  };

  return (
    <>
      {/* Modal Config */}
      <SupplierOrdersModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        data={purchaseData}
        setData={setPurchaseData}
        rowData={rowData}
        mutate={mutate}
      />

      {isMobile || isTablet ? (
        <>
          <IconButton
            aria-label="actions-menu"
            aria-controls="actions-menu"
            aria-haspopup="true"
            onClick={handleClick}
            title="Click for more actions">
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="actions-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "actions-menu",
            }}>
            <MenuItem onClick={openView}>View</MenuItem>
            <MenuItem onClick={openEdit}>Edit</MenuItem>
            <MenuItem onClick={openRemove}>Remove</MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <ViewBtn openView={openView} />
          <EditBtn openEdit={openEdit} />
          <RemoveBtn openRemove={openRemove} />
        </Box>
      )}
    </>
  );
};

export default ActionFormatter;
