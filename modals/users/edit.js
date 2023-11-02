import React, { useState } from "react";
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
import { BranchesDropdown } from "@/components/utility/get_data";
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
    const user_id = data.user_id;
    const url = `/user/${user_id}/`;

    // Edit Logic
    put_data("user", url, data, closeModal, mutate);
    // Reset form fields
    setData({
      user_id: "",
      branch: "",
      branch_name: "",
      username: "",
      password: "",
      user_role: "",
      first_name: "",
      last_name: "",
      age: "",
    });
  };

  return (
    <React.Fragment>
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <Typography color="white" variant="h5" align="left">
          Edit User
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
                  label="User Name"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    fullWidth
                    label="Role"
                    name="user_role"
                    id="demo-simple-select"
                    value={data.user_role}
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
                  selectedBranch={data.branch}
                  handleChange={handleChange}
                  setData={setData}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={data.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Age"
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
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
