import * as React from "react";
import {
  Box,
  IconButton,
  Grid,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ViewBtn,
  EditBtn,
  RemoveBtn,
} from "../utility/tables/actionButtonList";
import UserModalManager from "../../components/users/modals/userModalManager";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ActionFormatter = ({ rowData, mutate }) => {
  // console.log(rowData)
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userData, setUserData] = React.useState({
    user_id: "",
    branch: "",
    branch_name: "",
    username: "",
    password: "",
    user_role: "",
    first_name: "",
    last_name: "",
    age: "",
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  // Action Handlers
  const openView = () => {
    console.log(rowData);
    // open view logic
    setUserData({
      user_id: rowData.user_id,
      branch: rowData.branch,
      branch_name: rowData.branch_name,
      username: rowData.username,
      password: rowData.password,
      user_role: rowData.user_role,
      first_name: rowData.first_name,
      last_name: rowData.last_name,
      age: rowData.age,
    });

    openModal("view");
  };

  const openEdit = () => {
    // open edit logic
    // console.log(rowData);
    setUserData({
      user_id: rowData.user_id,
      branch: rowData.branch,
      branch_name: rowData.branch_name,
      username: rowData.username,
      password: rowData.password,
      user_role: rowData.user_role,
      first_name: rowData.first_name,
      last_name: rowData.last_name,
      age: rowData.age,
    });

    openModal("edit");
  };

  const openRemove = async () => {
    // open remove logic
    openModal("remove");
  };

  return (
    <>
      {/* Modal Config */}
      <UserModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        data={userData}
        setData={setUserData}
        rowData={rowData}
        mutate={mutate}
      />

      {isMobile || isTablet ? (
        <>
          <IconButton
            aria-label="actions-menu"
            aria-controls="actions-menu"
            aria-haspopup="true"
            onClick={handleClick}
            title="Click for more actions">
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="actions-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "actions-menu",
            }}>
            <MenuItem onClick={openView}>View</MenuItem>
            <MenuItem onClick={openEdit}>Edit</MenuItem>
            <MenuItem onClick={openRemove}>Remove</MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <ViewBtn openView={openView} />
          <EditBtn openEdit={openEdit} />
          <RemoveBtn openRemove={openRemove} />
        </Box>
      )}
    </>
  );
};

export default ActionFormatter;
