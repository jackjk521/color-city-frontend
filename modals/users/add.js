import * as React from "react";
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
import { post_data } from "@/components/utility/api/fetcher";

const url = "/users"
export default function AddModal({ headerColor, closeModal, mutate }) {
  const [userData, setUserData] = React.useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Add logic
     post_data("user", url, userData, closeModal, mutate);

    // Reset form fields
    setUserData({
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
                  name="username"
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
                  type="number"
                  label="Age"
                  name="age"
                  onChange={handleChange}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="success">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </React.Fragment>
  );
}
