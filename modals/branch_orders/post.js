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
import { createEditLogData } from "@/components/utility/logger";
import { UserContext } from "@/contexts/userContext";
import { post_purchase } from "@/components/utility/get_data";
import Swal from "sweetalert2"

export default function PostModal({
  headerColor,
  closeModal,
  rowData,
  mutate,
}) {
  console.log(rowData);
  const { user } = useContext(UserContext);

  const handlePost = async (e) => {
    // console.log(rowData);
    e.preventDefault();
    const purchase_header_id = rowData.purchase_header_id;
    post_purchase(purchase_header_id, closeModal, mutate)
    // Swal.fire({
    //   title: "Success",
    //   text: "Successfully posted a/an " + name + ".",
    //   icon: "success",
    // });
    // closeModal()
    // mutate()
    // const log_data = createRemoveLogData(
    //   user.userCredentials.branch,
    //   user.userCredentials.branch_name,
    //   user.userCredentials.user_id,
    //   user.userCredentials.username,
    //   "SUPP_ORDER",
    //   purchase_header_id,
    //   undefined
    // );

    // Delete logic
    // delete_data("supplier_orders", url, closeModal, mutate, log_data);
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Post Branch Order
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
            Are you sure you want to post this branch order? Note: This will inform the main branch of this order
          </Typography>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handlePost}>
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
