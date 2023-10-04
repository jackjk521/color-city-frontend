import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ReusableModal = ({ isOpen, onClose, children}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, translateY: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="modal-container">
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
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
