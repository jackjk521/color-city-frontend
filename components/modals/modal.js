import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const ReusableModal = ({ isOpen, onClose, title, children, actions, headerColor }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ backgroundColor: headerColor }}>
        <span style={{ color: 'white' }}>{title}</span>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>

      {/* <DialogActions>
        {actions || (
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions> */}
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

