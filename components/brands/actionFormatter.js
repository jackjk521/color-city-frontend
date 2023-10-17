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
import BrandModalManager from "../../components/brands/modals/brandModalManager";
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

  const [brandData, setBrandData] = React.useState({
    brand_id: "",
    brand_name: "",
    supplier: "",
    supplier_name: "",
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  // Action Handlers
  const openView = () => {
    console.log(rowData);
    // open view logic
    setBrandData({
      brand_id: rowData.brand_id,
      brand_name: rowData.brand_name,
      supplier: rowData.supplier,
      supplier_name: rowData.supplier_name,
    });

    openModal("view");
  };

  const openEdit = () => {
    // open edit logic
    // console.log(rowData);
    setBrandData({
      brand_id: rowData.brand_id,
      brand_name: rowData.brand_name,
      supplier: rowData.supplier,
      supplier_name: rowData.supplier_name,
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
      <BrandModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        data={brandData}
        setData={setBrandData}
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
