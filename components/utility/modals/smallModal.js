import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

const ReusableModal = ({ isOpen, onClose, children }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const smallModalStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minHeight: isSmallScreen ? "20rem" : "30rem",
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, translateY: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="modal-container">
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        sx={{ ...smallModalStyles }}
        maxWidth="sm">
        {children}
      </Dialog>
    </motion.div>
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
