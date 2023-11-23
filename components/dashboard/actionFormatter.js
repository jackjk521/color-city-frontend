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
  ReceiveBtn,
} from "../utility/tables/actionButtonList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Purchase Orders Table
const ActionFormatter = ({ rowData, mutate }) => {
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

  return (
    <>
      <ViewBtn onClick={openView}>View</ViewBtn>
    </>
  );
};

export default ActionFormatter;
