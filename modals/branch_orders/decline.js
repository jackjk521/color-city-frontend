import * as React from "react";
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
import { createDeclineLogData } from "@/components/utility/logger";
import { UserContext } from "@/contexts/userContext";
import { decline_purchase } from "@/components/utility/get_data";

export default function DeclineModal({
  headerColor,
  closeModal,
  rowData,
  mutate,
}) {
  console.log(rowData);
  const { user } = React.useContext(UserContext);

  const handleDecline = async (e) => {
    // console.log(rowData);
    e.preventDefault();
    const purchase_header_id = rowData.purchase_header_id;
    const url = `/po_status/${purchase_header_id}/`;

    const log_data = createDeclineLogData(
      user.userCredentials.branch,
      user.userCredentials.branch_name,
      user.userCredentials.user_id,
      user.userCredentials.username,
      "BRANCH_ORDER",
      purchase_header_id,
      undefined,
      rowData.branch_name
    );

    const data = {
      status: "DECLINE",
    };

    put_order_data("branch_order/s", url, data, closeModal, mutate, log_data);
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Decline Branch Order
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
            Are you sure you want to decline this branch order? Note: This means
            the order will not be processed by the main warehouse
          </Typography>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleDecline}>
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
