import * as React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { Box, Button } from "@mui/material";
import {
  ViewBtn,
  EditBtn,
  RemoveBtn,
} from "../utility/tables/actionButtonList";
import PurchaseModalManager from "../../components/purchases/modals/purchaseModalManager";

// import {
//   viewPurchase,
//   editPurchase,
//   removePurchase,
// } from "../../utils/actionHandler";

const ActionFormatter = ({ onClick }) => {
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  // Action Handlers
  const handleView = (row) => {
    console.log(row);
    // Handle view logic
    openModal("view");

    // Alerts
  };

  const handleEdit = (row) => {
    // Handle edit logic
    console.log(row);
    openModal("edit");

    // Alerts
  };

  const handleRemove = (row) => {
    // Handle remove logic
    console.log(row);
    openModal("remove");

    // Alerts
    // setOpen(true);
    // setSeverity("warning"); // Use functional form of setState
    // setMessage("Warning Updating Data"); // Use functional form of setState
    // setTimeout(() => {
    //   setOpen(false);
    //   setSeverity("info");
    //   setMessage("Default message");
    // }, 1500);
  };

  return (
    <>
      {/* Modal Config */}
      <PurchaseModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />

      {isMobile || isTablet ? (
        <Box>
          <ViewBtn handleView={onClick} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <ViewBtn handleView={handleView} />
          </Grid>
          <Grid item>
            <EditBtn handleEdit={handleEdit} />
          </Grid>
          <Grid item>
            <RemoveBtn handleRemove={handleRemove} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ActionFormatter;
