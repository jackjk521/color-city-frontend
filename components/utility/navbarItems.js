import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

export const mainListItems = ({ setSelectedItem }) => (
  <React.Fragment>
    <ListItemButton onClick={() => setSelectedItem("dashboard")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton onClick={() => setSelectedItem("purchases")}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Purchases" />
    </ListItemButton>

    <ListItemButton onClick={() => setSelectedItem("inventory")}>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>

    <ListItemButton onClick={() => setSelectedItem("suppliers")}>
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

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Items" onClick={() => setSelectedItem("items")} />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" onClick={() => setSelectedItem("employees")} />
    </ListItemButton>

    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier" onClick={() => setSelectedItem("supplier")} />
    </ListItemButton> */}
  </React.Fragment>
);
