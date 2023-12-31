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
import { delete_data } from "@/components/utility/api/fetcher";
import { createRemoveLogData } from "@/components/utility/logger";

export default function RemoveModal({
  headerColor,
  closeModal,
  rowData,
  data,
  setData,
}) {

  // console.log(data.purchaseLines.filter((line) => line.item !== item_id));

  const handleRemove = () => {
    const item_id = rowData.item;

    setData((prevState) => ({
      ...prevState,
      purchaseLines: prevState.purchaseLines.filter((line) => line.item !== item_id),
    }));;
    closeModal();
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Remove Item
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
            Are you sure you want to remove this item from the order?
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
