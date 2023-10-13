import * as React from "react";
import { Box, IconButton, Grid, useMediaQuery } from "@mui/material";
import {
  ViewBtn,
  EditBtn,
  RemoveBtn,
} from "../utility/tables/actionButtonList";
import ItemModalManager from "../../components/items/modals/itemModalManager";
import apiClient from "../utility/api/apiClient";
import Swal from "sweetalert2";

// Formatters
import { format } from "date-fns";
import numeral from "numeral";

import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const formattedDate = (date) => {
  return format(date, "mm/dd/yy"); // Using date-fns for date formatting
};
const formattedNumber = (number) => {
  return numeral(number).format("$0,0.00");
};

// export const ItemCells = ({ rowData, dataKey }) => {
//   // Custom formatting logic
//   const formatConfig = {
//     item_id: (value) => value,
//     item_name: (value) => value,
//     brand: (value) => value,
//     item_price_w_vat: (value) =>
//       typeof value === "number" ? formattedNumber(value) : value,
//     retail_price: (value) =>
//       typeof value === "number" ? formattedNumber(value) : value,
//   };

//   const formatValue = formatConfig[dataKey] || ((value) => value);
//   return formatValue(rowData[dataKey]);
// };

const ActionFormatter = ({ rowData, mutate }) => {
  // console.log(rowData)
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const [itemData, setItemData] = React.useState({
    item_id: "",
    item_number: "",
    item_name: "",
    brand: "",
    brand_name: "",
    total_quantity: "",
    category: "",
    unit: "",
    package: "",
    item_price_w_vat: "",
    item_price_wo_vat: "",
    retail_price: "",
    catalyst: "",
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
      brand: rowData.brand,
      brand_name: rowData.brand_name,
      total_quantity: rowData.total_quantity,
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
      total_quantity: rowData.total_quantity,
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
        itemData={itemData}
        setItemData={setItemData}
        rowData={rowData}
        mutate={mutate}
      />

      {isMobile || isTablet ? (
        <Box>
          <ViewBtn openView={openView} />
        </Box>
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
