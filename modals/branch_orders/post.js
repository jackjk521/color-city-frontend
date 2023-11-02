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
import { put_order_data } from "@/components/utility/api/fetcher";
import { createPostLogData } from "@/components/utility/logger";
import { UserContext } from "@/contexts/userContext";
import { post_purchase } from "@/components/utility/get_data";
import Swal from "sweetalert2";

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
    const url = `/po_status/${purchase_header_id}/`;

    const log_data = createPostLogData(
      user.userCredentials.branch,
      user.userCredentials.branch_name,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "BRANCH_ORDER",
      purchase_header_id,
      undefined,
      undefined
    );

    const data = {
      status: "POST"
    }

    put_order_data(
      "branch_order/s",
      url,
      data,
      closeModal,
      mutate,
      log_data
    );
    // post_purchase(purchase_header_id, closeModal, mutate)
    // Swal.fire({
    //   title: "Success",
    //   text: "Successfully posted a/an " + name + ".",
    //   icon: "success",
    // });
    // closeModal()
    // mutate()
   
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
            Are you sure you want to post this branch order? Note: This will
            inform the main branch of this order
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
