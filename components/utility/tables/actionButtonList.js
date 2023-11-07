import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import GetAppIcon from '@mui/icons-material/GetApp';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { LocalActivity } from "@mui/icons-material";

export const ViewBtn = ({ openView }) => {
  return (  
    <IconButton
      color="primary"
      onClick={openView}
      title="View">
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
      title="Edit">
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
      title="Delete">
      <DeleteIcon />
    </IconButton>
  );
};

export const ApproveBtn = ({ openApprove }) => {
  return (  
    <IconButton
      color="success"
      onClick={openApprove}
      title="Approve">
      {" "}
      {/* Hover text  */}
      <ThumbUpAltIcon />
    </IconButton>
  );
};

export const DeclineBtn = ({ openDecline }) => {
  return (  
    <IconButton
      color="danger"
      onClick={openDecline}
      title="Decline">
      {" "}
      {/* Hover text  */}
      <ThumbDownAltIcon/>
    </IconButton>
  );
};

export const PostBtn = ({ openPost }) => {
  return (  
    <IconButton
      color="primary"
      onClick={openPost}
      title="Post">
      {" "}
      {/* Hover text  */}
      <LocalPostOfficeIcon />
    </IconButton>
  );
};

export const ReceiveBtn = ({ openReceive }) => {
  return (  
    <IconButton
      color="success"
      onClick={openReceive}
      title="Receive">
      {" "}
      {/* Hover text  */}
      <GetAppIcon />
    </IconButton>
  );
};

