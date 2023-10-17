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
import SupplierModalManager from "../../components/suppliers/modals/supplierModalManager";
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

  const [supplierData, setSupplierData] = React.useState({
    supplier_id: "",
    supplier_name: "",
    contact_num: "",
    discount_rate: "",
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  // Action Handlers
  const openView = () => {
    console.log(rowData);
    // open view logic
    setSupplierData({
      supplier_id: rowData.supplier_id,
      supplier_name: rowData.supplier_name,
      contact_num: rowData.contact_num,
      discount_rate: rowData.discount_rate,
    });

    openModal("view");
  };

  const openEdit = () => {
    // open edit logic
    // console.log(rowData);
    setSupplierData({
      supplier_id: rowData.supplier_id,
      supplier_name: rowData.supplier_name,
      contact_num: rowData.contact_num,
      discount_rate: rowData.discount_rate,
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
      <SupplierModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        data={supplierData}
        setData={setSupplierData}
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
