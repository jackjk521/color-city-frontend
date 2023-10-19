import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Grid, TextField, Button, Container } from "@mui/material";
import Image from "next/image";
import { UserContext } from "@/contexts/userContext";
import apiClient from "@/components/utility/api/apiClient";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const { status, user } = useContext(UserContext);
  const [userCred, setUserCred] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCred((prevCred) => ({ ...prevCred, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/auth_user/", {
        username: userCred.username,
        password: userCred.password,
      });
      if (response.status !== 200) {
        const error = new Error();
        error.info = response.data;
        error.status = response.status;
        error.message = "Invalid User Credentials";
        Swal.fire({
          title: error.info,
          text: error.message,
          icon: "error",
        });
        throw error;
      }
      // return response.data;
      console.log(response.data);
      user.updateUserCredentials(response.data);
      router.push("/")
      // router.push("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* ADD YOUR IMAGE OR LOGO HERE */}
        <Grid item xs={12} textAlign="center">
          <Image
            src="/images/icon-256x256.png"
            alt="Logo"
            width={200}
            height={200}
          />
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} textAlign="center">
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
