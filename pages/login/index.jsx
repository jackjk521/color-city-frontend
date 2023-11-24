import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid, TextField, Button, Container, Box } from "@mui/material";
import Image from "next/image";
import { UserContext } from "@/contexts/userContext";
import apiClient from "@/components/utility/api/apiClient";
import Swal from "sweetalert2";
import Footer from "@/components/footer";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);
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

      if (response.status === 200) {
        user.updateUserCredentials(response.data);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (error.response.status === 404) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Container maxWidth={"sm"}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* ADD YOUR IMAGE OR LOGO HERE */}
          <Grid item xs={12} textAlign="center">
            <Image
              src="/images/color_city_logo.png"
              alt="Logo"
              width={400}
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
        <Footer sx={{ pt: 4 }} />

      </Container>

      {/* <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col items-center justify-center w-full mb-12">
            <Image
              src="/images/icon-256x256.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>
          <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div class="relative flex-grow w-full">
              <label for="username" class="leading-7 text-sm text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleChange}
                required
              />
            </div>
            <div class="relative flex-grow w-full">
              <label for="password" class="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleChange}
                required
              />
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Button
            </button>
          </div>
        </div>
      </section> */}
    </Box>
  );
}
