import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ViewBtn = ({ openView }) => {
  return (  
    <IconButton
      color="primary"
      onClick={openView}
      title="Click to view item data">
      {" "}
      {/* Hover text  */}
      <MoreHorizIcon />
    </IconButton>
  );
};

export const EditBtn = ({ openEdit }) => {
  return (
    <IconButton
      color="warning"
      onClick={openEdit}
      title="Click to edit item data">
      {" "}
      {/* Hover text  */}
      <EditIcon />
    </IconButton>
  );
};

export const RemoveBtn = ({ openRemove }) => {
  return (
    <IconButton
      color="error"
      onClick={openRemove}
      title="Click to delete item data">
      <DeleteIcon />
    </IconButton>
  );
};
