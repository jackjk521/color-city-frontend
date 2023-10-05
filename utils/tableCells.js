import * as React from "react";

import { TableCell, Button, Grid } from "@mui/material";

import InventoryModalManager from "../components/inventory/modals/inventoryModalManager";
import PurchaseModalManager from "../components/purchases/modals/purchaseModalManager";
import SupplierModalManager from "../components/suppliers/modals/supplierModalManager";

// Purchases
export const PurchaseTableHeaders = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "id",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "title",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "price",
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: false,
    label: "rating",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export const PurchaseTableCells = ({ row, setAlertStatus }) => {
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  // Action Handlers
  const handleView = (row) => {
    console.log(row);
    // Handle view logic
    openModal("view");

    // Alerts
  };

  const handleEdit = (row) => {
    // Handle edit logic
    console.log(row);
    openModal("edit");

    // Alerts
  };

  const handleRemove = (row) => {
    // Handle remove logic
    console.log(row);
    openModal("remove");

    // Alerts
    // setOpen(true);
    // setSeverity("warning"); // Use functional form of setState
    // setMessage("Warning Updating Data"); // Use functional form of setState
    // setTimeout(() => {
    //   setOpen(false);
    //   setSeverity("info");
    //   setMessage("Default message");
    // }, 1500);
  };

  // Table Action Formatter START
  const ActionFormatter = ({ row }) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={() => handleView(row)}
              p={2}
              variant="outlined"
              color="success"
              fullWidth>
              View
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleEdit(row)}
              p={2}
              variant="outlined"
              color="primary"
              fullWidth>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleRemove(row)}
              p={2}
              variant="outlined"
              color="secondary"
              fullWidth>
              Remove
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };
  // Table Action Formatter END
  return (
    <>
      {/* Modal Config  */}
      <PurchaseModalManager
        modalType={activeModal}
        setActiveModal={setActiveModal}
        setAlertStatus={setAlertStatus}
      />

      {/* Table Cells  */}
      <TableCell component="th" scope="row" align="center" padding="none">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.title}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.rating}</TableCell>
      <TableCell align="left">
        {" "}
        <ActionFormatter id={row.id} row={row} />
      </TableCell>
    </>
  );
};

// Inventory
export const InventoryTableHeaders = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "id",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "title",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "price",
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: false,
    label: "rating",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export const InventoryTableCells = ({ row }) => {
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  // Action Handlers
  const handleView = ({ row }) => {
    console.log(row);
    // Handle view logic
    openModal("view");

    // Alerts
  };

  const handleEdit = ({ row }) => {
    // Handle edit logic
    console.log(row);
    openModal("edit");

    // Alerts
  };

  const handleRemove = ({ row }) => {
    // Handle remove logic
    console.log(row);
    openModal("remove");

    // Alerts
    // setOpen(true);
    // setSeverity("warning"); // Use functional form of setState
    // setMessage("Warning Updating Data"); // Use functional form of setState
    // setTimeout(() => {
    //   setOpen(false);
    //   setSeverity("info");
    //   setMessage("Default message");
    // }, 1500);
  };

  // Table Action Formatter START
  const ActionFormatter = ({ row }) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={() => handleView(row)}
              p={2}
              variant="outlined"
              color="success"
              fullWidth>
              View
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleEdit(row)}
              p={2}
              variant="outlined"
              color="primary"
              fullWidth>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleRemove(row)}
              p={2}
              variant="outlined"
              color="secondary"
              fullWidth>
              Remove
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };
  // Table Action Formatter END
  return (
    <>
      {/* Modal Config  */}
      <InventoryModalManager
        modalType={activeModal}
        setActiveModal={setActiveModal}
      />

      <TableCell component="th" scope="row" align="center" padding="none">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.title}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.rating}</TableCell>
      <TableCell align="left">
        {" "}
        <ActionFormatter id={row.id} row={row} />
      </TableCell>
    </>
  );
};

// Inventory
export const SupplierTableHeaders = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "id",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "title",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "price",
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: false,
    label: "rating",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export const SupplierTableCells = ({ row }) => {
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  // Action Handlers
  const handleView = ({ row }) => {
    console.log(row);
    // Handle view logic
    openModal("view");

    // Alerts
  };

  const handleEdit = ({ row }) => {
    // Handle edit logic
    console.log(row);
    openModal("edit");

    // Alerts
  };

  const handleRemove = ({ row }) => {
    // Handle remove logic
    console.log(row);
    openModal("remove");

    // Alerts
    // setOpen(true);
    // setSeverity("warning"); // Use functional form of setState
    // setMessage("Warning Updating Data"); // Use functional form of setState
    // setTimeout(() => {
    //   setOpen(false);
    //   setSeverity("info");
    //   setMessage("Default message");
    // }, 1500);
  };

  // Table Action Formatter START
  const ActionFormatter = ({ row }) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={() => handleView(row)}
              p={2}
              variant="outlined"
              color="success"
              fullWidth>
              View
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleEdit(row)}
              p={2}
              variant="outlined"
              color="primary"
              fullWidth>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleRemove(row)}
              p={2}
              variant="outlined"
              color="secondary"
              fullWidth>
              Remove
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };
  // Table Action Formatter END
  return (
    <>
      {/* Modal Config  */}
      <SupplierModalManager
        modalType={activeModal}
        setActiveModal={setActiveModal}
      />

      <TableCell component="th" scope="row" align="center" padding="none">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.title}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.rating}</TableCell>
      <TableCell align="left">
        {" "}
        <ActionFormatter id={row.id} row={row} />
      </TableCell>
    </>
  );
};
