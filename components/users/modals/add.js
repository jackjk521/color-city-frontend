import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
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
import { BranchesDropdown } from "@/components/utility/get_data";

export default function AddModal({ headerColor, closeModal, mutate }) {
  const [userData, setUserData] = React.useState({
    user_id: "",
    branch: "",
    branch_name: "",
    user_name: "",
    password: "",
    user_role: "",
    first_name: "",
    last_name: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(`/users`, userData);
      if (response.status === 201) {
        closeModal();
        Swal.fire({
          title: "Succcess",
          text: "Successfully added an user",
          icon: "success",
        });
        mutate();
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
    // Reset form fields
    setUserData({
      supplier_id: "",
      supplier_name: "",
      contact_num: "",
      discount_rate: "",
    });
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Add User
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
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="User Name"
                  name="user_name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Role
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Role"
                    name="user_role"
                    id="demo-simple-select"
                    onChange={handleChange}>
                    <MenuItem value={"Administrator"}>Administrator</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
                    <MenuItem value={"Employee"}>Employee</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
              <BranchesDropdown
                  selectedBranch={userData.branch}
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="first_name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </>
  );
}
