import React from "react";
import { Button, Grid } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ViewBtn = ({ openView }) => {
  return (
    <Button color="primary" variant="contained" onClick={openView}>
      {" "}
      View
    </Button>
  );
};

export const EditBtn = ({ openEdit }) => {
  return (
    <Button color="warning" variant="contained" onClick={openEdit}>
      <EditIcon />
    </Button>
  );
};

export const RemoveBtn = ({ openRemove }) => {
  return (
    <Button color="error" variant="contained" onClick={openRemove}>
      <DeleteIcon />
    </Button>
  );
};
