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
  ReceiveBtn
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
      branch_name: "",
      user: "",
      username: "",
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
    // open view logic
    setPurchaseData({
      purchaseHeader: {
        purchase_header_id: rowData.purchase_header_id,
        branch: rowData.branch,
        branch_name: rowData.branch_name,
        user: rowData.user,
        username: rowData.username,
        transaction_type: rowData.transaction_type,
        supplier: rowData.supplier,
        supplier_name: rowData.supplier_name,
        total_amount: rowData.total_amount,
        payment_mode: rowData.payment_mode,
        status: rowData.status,
      },
      purchaseLines: rowData.purchase_lines,
    });

    openModal("view");
  };

  const openReceive = () => {
    // open edit logic
    setPurchaseData({
      purchaseHeader: {
        purchase_header_id: rowData.purchase_header_id,
        branch: rowData.branch,
        branch_name: rowData.branch_name,
        user: rowData.user,
        username: rowData.username,
        transaction_type: rowData.transaction_type,
        supplier: rowData.supplier,
        supplier_name: rowData.supplier_name,
        total_amount: rowData.total_amount,
        payment_mode: rowData.payment_mode,
        status: rowData.status,
      },
      purchaseLines: rowData.purchase_lines,
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
            {/* <MenuItem onClick={openEdit}>Edit</MenuItem> */}
            <MenuItem onClick={openRemove}>Remove</MenuItem>
            <MenuItem onClick={openReceive}>Recieve</MenuItem>

          </Menu>
        </>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <ViewBtn openView={openView} />
          {/* <EditBtn openEdit={openEdit} /> */}
          <RemoveBtn openRemove={openRemove} />
          {rowData.status == "APPROVED" && <ReceiveBtn openReceive={openReceive}/>}
        </Box>
      )}
    </>
  );
};

export default ActionFormatter;
