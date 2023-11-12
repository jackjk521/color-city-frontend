import React from "react";
import { CircularProgress, Container, Typography } from "@mui/material";

const LoadingScreen = () => {

  return (
    <Container maxWidth={sm}>
      <CircularProgress size={48} />
      <Typography variant="h6">
        Loading...
      </Typography>
    </Container>
  );
};

export default LoadingScreen;
