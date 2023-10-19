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
import { styled } from "@mui/system";

const HoverListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const mainListItems = () => (
  <React.Fragment>
    <HoverListItemButton component={Link} href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </HoverListItemButton>

    <HoverListItemButton component={Link} href="/purchases">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Purchases" />
    </HoverListItemButton>

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

export function secondaryListItems() {
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
        <ListItemText primary="Items" />
        {isItemsOpen ? <ExpandLess /> : <ExpandMore />}
      </HoverListItemButton>

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
            <ListItemText primary="Categories, Brands, Suppliers" />
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
