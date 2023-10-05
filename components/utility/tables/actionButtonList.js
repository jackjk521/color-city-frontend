import React from "react";
import { Button, Grid } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ViewBtn = ({ handleView }) => {
  return (
    <Button color="primary" variant="contained" onClick={handleView}>
      {" "}
      View
    </Button>
  );
};

export const EditBtn = ({ handleEdit }) => {
  return (
    <Button color="warning" variant="contained" onClick={handleEdit}>
      <EditIcon />
    </Button>
  );
};

export const RemoveBtn = ({ handleRemove }) => {
  return (
    <Button color="error" variant="contained" onClick={handleRemove}>
      <DeleteIcon />
    </Button>
  );
};
