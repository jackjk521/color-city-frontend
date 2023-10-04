import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReusableModal = ({ isOpen, onClose, children }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const largeModalStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minHeight: isSmallScreen ? "20rem" : "100%",
  };

  return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
        fullWidth
        sx={{ ...largeModalStyles }}
        maxWidth="lg">
        {children}
      </Dialog>
  );
};

ReusableModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  // actions: PropTypes.node,
  headerColor: PropTypes.string,
};

export default ReusableModal;
