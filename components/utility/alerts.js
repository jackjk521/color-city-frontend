import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const Alert = ({ open, severity, message, onClose }) => {
  const alertStyle = {
    top: "64px", // Adjust the position as per your layout
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      style={alertStyle}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={onClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;