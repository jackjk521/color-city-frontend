import * as React from "react";
import {
  Box,
  IconButton,
  Button,
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
import PurchaseLinesModalManager from "../../modals/purchase_lines/purchaseLineModalManager";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Handlers for the inline edit react table
 // Action Handlers
 export const handleEdit = (rowData, local_data, setLocalData) => {
  // open edit logic

  // Compare teh ids and update the whole entry or addItemData in the purchaseLines array
};



// Purchase Line Table
const ActionFormatter = ({ rowData, local_data, setLocalData, table, row }) => {
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

  const handleRemove = async () => {
    // open remove logic
    openModal("remove");
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

 
  return (
    <React.Fragment>
      {/* Modal Config */}
      <PurchaseLinesModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        data={local_data}
        setData={setLocalData}
        rowData={rowData}
      />

      {isTablet ? (
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
            <MenuItem onClick={openEdit}>Edit</MenuItem>
            <MenuItem onClick={openRemove}>Remove</MenuItem>
          </Menu>
        </>
      ) : isMobile ? (
        <IconButton
          aria-label="more-actions"
          onClick={handleClick}
          title="More actions">
          <MoreHorizIcon />
        </IconButton>
      ) : (
        <React.Fragment>
          <EditBtn openEdit={() => table.setEditingRow(row)}/>
          <RemoveBtn openRemove={handleRemove}/>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ActionFormatter;
