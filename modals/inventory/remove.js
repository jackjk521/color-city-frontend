import React, { useContext, useState } from "react";
import {
  Button,
  DialogActions,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { delete_data } from "@/components/utility/api/fetcher";
import { createRemoveLogData } from "@/components/utility/logger";
import { UserContext } from "@/contexts/userContext";

export default function RemoveModal({
  headerColor,
  closeModal,
  rowData,
  mutate,
}) {
  const {user} = useContext(UserContext)

  const handleRemove = async (e) => {
    // console.log(rowData);
    e.preventDefault();
    const inventory_id = rowData.inventory_id;
    const url = `/inv/${inventory_id}/`
    const log_data = createRemoveLogData(
      user.userCredentials.branch,
      user.userCredentials.branch_name,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "INVENTORY",
      inventory_id,
      rowData.item_name,
      rowData.branch_name
    );
    
    // Delete logic
    delete_data('inventory', url, closeModal, mutate, log_data)
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Remove Inventory Entry
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ paddingTop: 0 }}>
        <Container maxWidth="sm" mt={1}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to remove this inventory entry?
          </Typography>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleRemove}>
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={closeModal}>
              No
            </Button>
          </DialogActions>
        </Container>
      </DialogContent>
    </React.Fragment>
  );
}
