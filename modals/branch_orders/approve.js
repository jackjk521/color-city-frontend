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
import { approve_purchase } from "@/components/utility/get_data";

export default function ApproveModal({
  headerColor,
  closeModal,
  rowData,
  mutate,
}) {
  console.log(rowData);
  const { user } = useContext(UserContext);

  const handleApprove = async (e) => {
    // console.log(rowData);
    e.preventDefault();
    const purchase_header_id = rowData.purchase_header_id;
    const purchase_lines = rowData.purchase_lines;

    approve_purchase(purchase_header_id, purchase_lines, closeModal, mutate);
    // const log_data = createRemoveLogData(
    //   user.userCredentials.branch,
    //   user.userCredentials.branch_name,
    //   user.userCredentials.user_id,
    //   user.userCredentials.username,
    //   "SUPP_ORDER",
    //   purchase_header_id,
    //   undefined
    // );
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Approve Branch Order
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
            Are you sure you want to approve this branch order? Note: This means
            the main warehouse is ready to deliver the requested items to the
            said branch
          </Typography>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleApprove}>
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
