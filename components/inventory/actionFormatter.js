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
import InventoryModalManager from "../../modals/inventory/inventoryModalManager";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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

  const [inventoryData, setInventoryData] = React.useState({
    inventory_id: "",
    item: "",
    item_name: "",
    item_price_w_vat: "",
    branch: "",
    branch_name: "",
    total_quantity: "",
    holding_cost: "",
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  // Action Handlers
  const openView = () => {
    console.log(rowData);
    // open view logic
    setInventoryData({
      inventory_id: rowData.inventory_id,
      item: rowData.item,
      item_name: rowData.item_name,
      item_price_w_vat: rowData.item_price_w_vat,
      branch: rowData.branch,
      branch_name: rowData.branch_name,
      total_quantity: rowData.total_quantity,
      holding_cost: rowData.holding_cost,
    });

    openModal("view");
  };

  const openEdit = () => {
    // open edit logic
    // console.log(rowData);
    setInventoryData({
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
      <InventoryModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        data={inventoryData}
        setData={setInventoryData}
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
