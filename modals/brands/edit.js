import * as React from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import apiClient from "@/components/utility/api/apiClient";
import Swal from "sweetalert2";
import { SuppliersDropdown } from "@/components/utility/get_data";
import { put_data } from "@/components/utility/api/fetcher";

export default function EditModal({
  headerColor,
  data,
  setData,
  closeModal,
  mutate,
}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const brand_id = data.brand_id;
    const url = `/brand/${brand_id}/`
    
    // Edit Logic
    put_data('brand', url, data, closeModal, mutate)
    // Reset form fields
    setData({
      brand_id: "",
      brand_name: "",
      supplier: "",
      supplier_name: "",
    });
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit Brand
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
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Brand Name"
                  name="brand_name"
                  value={data.brand_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SuppliersDropdown
                  selectedSupplier={data.supplier}
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="warning">
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </React.Fragment>
  );
}
