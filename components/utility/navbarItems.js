import * as React from "react";
import Link from "next/link";

import { List, Collapse } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import StoreIcon from "@mui/icons-material/Store";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MoveUpIcon from '@mui/icons-material/MoveUp';
import { styled } from "@mui/system";

const HoverListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export function MainListItems() {
  const [isItemsOpen, setItemsOpen] = React.useState(false);

  const handleItemsClick = () => {
    setItemsOpen(!isItemsOpen);
  };

  return (
    <React.Fragment>
      <HoverListItemButton component={Link} href="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </HoverListItemButton>

      <HoverListItemButton onClick={handleItemsClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Purchases" />
        {isItemsOpen ? <ExpandLess /> : <ExpandMore />}
      </HoverListItemButton>

      {/* Purchases Side Menu  */}
      <Collapse in={isItemsOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <HoverListItemButton component={Link} href="/supplier_orders">
            <ListItemIcon>
              <MoveUpIcon />
            </ListItemIcon>
            <ListItemText primary="Supplier Orders" />
          </HoverListItemButton>
          <HoverListItemButton component={Link} href="/branch_orders">
            <ListItemIcon>
              <TransferWithinAStationIcon />
            </ListItemIcon>
            <ListItemText primary="Branch Orders" />
          </HoverListItemButton>
        </List>
      </Collapse>

      <HoverListItemButton component={Link} href="/inventory">
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </HoverListItemButton>

      {/* <HoverListItemButton component={Link} href="/suppliers">
      <ListItemIcon>
        <TransferWithinAStationIcon />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </HoverListItemButton> */}

      {/* <ListItemButton onClick={() => setSelectedItem("reports")}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>

    <ListItemButton onClick={() => setSelectedItem("integrations")}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
    </React.Fragment>
  );
}

export function SecondaryListItems() {
  const [isItemsOpen, setItemsOpen] = React.useState(false);

  const handleItemsClick = () => {
    setItemsOpen(!isItemsOpen);
  };

  return (
    <List component="nav">
      <ListSubheader component="div" inset>
        Admin Modules
      </ListSubheader>

      <HoverListItemButton onClick={handleItemsClick}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {isItemsOpen ? <ExpandLess /> : <ExpandMore />}
      </HoverListItemButton>

      {/* Products Side Menu*/}
      <Collapse in={isItemsOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <HoverListItemButton component={Link} href="/items">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Items" />
          </HoverListItemButton>
          <HoverListItemButton component={Link} href="/items_info">
            <ListItemIcon>
              <TransferWithinAStationIcon />
            </ListItemIcon>
            <ListItemText primary="Item Details" />
          </HoverListItemButton>
        </List>
      </Collapse>

      <HoverListItemButton component={Link} href="/branches">
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Branches" />
      </HoverListItemButton>
      <HoverListItemButton component={Link} href="/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </HoverListItemButton>
    </List>
  );
}
