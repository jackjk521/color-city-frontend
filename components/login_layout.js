import * as React from "react";

import { useRouter } from "next/router";

// Material UI
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

// Components
import Header from "./header";
import Footer from "./footer";


// TO reset the theme.
const defaultTheme = createTheme();

export default function Layout({ children }) {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Header></Header>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}>
            <Container
              maxWidth="lg"
              sx={{
                mt: 4,
                mb: 4,
              }}>
              {/* Render the content component */}
              {/* {renderContent() == null ? children : renderContent()} */}
              {children}
              <Footer sx={{ pt: 4 }} />
            </Container>
          </Box>
      </ThemeProvider>
    </>
  );
}
