import * as React from "react";
import Link from "next/link";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

export const mainListItems = () => (
  <React.Fragment>
    <ListItemButton component={Link} href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton component={Link} href="/purchases">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Purchases" />
    </ListItemButton>

    <ListItemButton component={Link} href="/inventory">
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>

    <ListItemButton component={Link} href="/suppliers">
      <ListItemIcon>
        <TransferWithinAStationIcon />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItemButton>

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
export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Admin Modules
    </ListSubheader>

    <ListItemButton component={Link} href="/items">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Items" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText
        primary="Employees"
        // onClick={() => setSelectedItem("employees")}
      />
    </ListItemButton>

    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier" onClick={() => setSelectedItem("supplier")} />
    </ListItemButton> */}
  </React.Fragment>
);
