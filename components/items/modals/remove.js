import React, { useState } from "react";
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
import apiClient from "@/components/utility/api/apiClient";
import Swal from "sweetalert2";

export default function RemoveModal({ headerColor, closeModal, rowData }) {
  
  const handleRemove = async (e) => {
    // console.log(rowData);
    const item_id = rowData.item_id;
    e.preventDefault();
    try {
      const response = await apiClient.delete(`/item/${item_id}/`);
      if (response.status === 200) {
        closeModal()
        Swal.fire({
          title: "Succcess",
          text: "Successfully deleted an item",
          icon: "success",
        });
      }
    } catch (error) {
      // Handle the error
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
      throw error;
    }
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Remove Purchase Order
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
            Are you sure you want to remove this purchase order?
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
    </>
  );
}
