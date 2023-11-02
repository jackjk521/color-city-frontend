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
  RemoveBtn,
  ReceiveBtn,
  PostBtn,
  ApproveBtn,
  DeclineBtn,
} from "../utility/tables/actionButtonList";
import { get_data } from "../utility/api/fetcher";
import BranchOrdersModalManager from "../../modals/branch_orders/branchOrdersModalManager";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Swal from "sweetalert2";
import { UserContext } from "@/contexts/userContext";
// Branch Orders Table
const ActionFormatter = ({ rowData, mutate }) => {
  // console.log(rowData);
  const { user } = React.useContext(UserContext);
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
        supplier_name: rowData.supplier_name,
        total_amount: rowData.total_amount,
        payment_mode: rowData.payment_mode,
        status: rowData.status,
      },
      purchaseLines: rowData.purchase_lines,
    });

    openModal("view");
  };

  const openReceive = async () => {
    const purchase_header_id = rowData.purchase_header_id;
    const url = `/receiving/${purchase_header_id}/`;
    try {
      // Edit Logic
      const result = await get_data(url);
      console.log(result);
      // Populate form fields only after the API request is successfully completed
      if (result) {
        console.log(result);
        const updatedPurchaseLines = result.map((line) => {
          // Add a new field to each object in the purchaseLines array
          return {
            ...line,
            receive_qty: 0,
          };
        });

        console.log(updatedPurchaseLines);

        setPurchaseData({
          purchaseHeader: {
            purchase_header_id: rowData.purchase_header_id,
            branch: rowData.branch,
            branch_name: rowData.branch_name,
            user: rowData.user,
            username: rowData.username,
            transaction_type: rowData.transaction_type,
            supplier_name: rowData.supplier_name,
            total_amount: rowData.total_amount,
            payment_mode: rowData.payment_mode,
            status: rowData.status,
          },
          purchaseLines: updatedPurchaseLines,
        });
        openModal("receive");
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

  const openPost = async () => {
    // open remove logic
    openModal("post");
  };

  const openApprove = async () => {
    // open remove logic
    openModal("approve");
  };

  const openDecline = async () => {
    // open remove logic
    openModal("decline");
  };

  const openRemove = async () => {
    // open remove logic
    openModal("remove");
  };

  return (
    <>
      {/* Modal Config */}
      <BranchOrdersModalManager
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
            <MenuItem onClick={openReceive}>Receive</MenuItem>
            <MenuItem onClick={openPost}>Post</MenuItem>
            <MenuItem onClick={openApprove}>Approve</MenuItem>
            <MenuItem onClick={openDecline}>Decline</MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <ViewBtn openView={openView} />
          {rowData.status !== "APPROVED" && rowData.status !== "POSTED" && (
            <RemoveBtn openRemove={openRemove} />
          )}
          {rowData.status == "UNPOSTED" && <PostBtn openPost={openPost} />}
          {rowData.status == "POSTED" &&
            user.userCredentials.user_role == "Administrator" && (
              <>
                <ApproveBtn openApprove={openApprove} />
                <DeclineBtn openDecline={openDecline} />
              </>
            )}
          {rowData.status == "APPROVED" &&
            rowData.received_status !== "COMPLETED" &&
            user.userCredentials.user_role == "Manager" && (
              <ReceiveBtn openReceive={openReceive} />
            )}

          {/* Add a disabled version of the receive btn once the status is completed  */}
        </Box>
      )}
    </>
  );
};

export default ActionFormatter;
