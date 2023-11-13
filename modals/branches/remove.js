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

export default function RemoveModal({
  headerColor,
  closeModal,
  rowData,
  mutate,
}) {
  const handleRemove = async (e) => {
    // console.log(rowData);
    e.preventDefault();
    const branch_id = rowData.branch_id;
    const url = `/branch/${branch_id}/`
    // Delete logic
    delete_data('branch', url, closeModal, mutate)
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }} mb={3}>
        <Typography color="white" variant="h5" align="left">
          Remove Branch
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
            Are you sure you want to remove this branch?
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
