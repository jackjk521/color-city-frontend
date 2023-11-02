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
import ItemModalManager from "../../modals/items/itemModalManager";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Formatters
// import { format } from "date-fns";
// import numeral from "numeral";

// const formattedDate = (date) => {
//   return format(date, "mm/dd/yy"); // Using date-fns for date formatting
// };
// const formattedNumber = (number) => {
//   return numeral(number).format("$0,0.00");
// };

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

  const [itemData, setItemData] = React.useState({
    item_id: "",
    item_number: "",
    item_name: "",
    brand_item: "",
    brand: "",
    brand_name: "",
    category: "",
    unit: "",
    package: "",
    item_price_w_vat: "",
    item_price_wo_vat: "",
    retail_price: "",
    catalyst: 0,
    created_at: "",
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  // Action Handlers
  const openView = () => {
    console.log(rowData);
    // open view logic
    setItemData({
      item_id: rowData.item_id,
      item_number: rowData.item_number,
      item_name: rowData.item_name,
      brand_item: rowData.brand_item,
      brand: rowData.brand,
      brand_name: rowData.brand_name,
      category: rowData.category,
      category_name: rowData.category_name,
      unit: rowData.unit,
      package: rowData.package,
      item_price_w_vat: rowData.item_price_w_vat,
      item_price_wo_vat: rowData.item_price_wo_vat,
      retail_price: rowData.retail_price,
      catalyst: rowData.catalyst,
      created_at: rowData.created_at,
    });

    openModal("view");
  };

  const openEdit = () => {
    // open edit logic
    // console.log(rowData);
    setItemData({
      item_id: rowData.item_id,
      item_number: rowData.item_number,
      item_name: rowData.item_name,
      brand: rowData.brand,
      category: rowData.category,
      unit: rowData.unit,
      package: rowData.package,
      item_price_w_vat: rowData.item_price_w_vat,
      item_price_wo_vat: rowData.item_price_wo_vat,
      retail_price: rowData.retail_price,
      catalyst: rowData.catalyst,
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
      <ItemModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        data={itemData}
        setData={setItemData}
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
