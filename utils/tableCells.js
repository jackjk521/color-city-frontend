import * as React from "react";

import { TableCell, Button } from "@mui/material";

import InventoryModalManager from "@/components/modals/inventory/inventoryModalManager";
import PurchaseModalManager from "@/components/modals/purchases/purchaseModalManager";
import SupplierModalManager from "@/components/modals/suppliers/supplierModalManager";

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

export const PurchaseTableCells = ({ row }) => {
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
        <Button
          onClick={() => handleView(row)}
          variant="outlined"
          color="success">
          View
        </Button>
        <Button
          onClick={() => handleEdit(row)}
          variant="outlined"
          color="primary">
          Edit
        </Button>
        <Button
          onClick={() => handleRemove(row)}
          variant="outlined"
          color="secondary">
          Remove
        </Button>
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

export const InventoryTableCells = ({ row, tableType }) => {
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
        <Button
          onClick={() => handleView(row)}
          variant="outlined"
          color="success">
          View
        </Button>
        <Button
          onClick={() => handleEdit(row)}
          variant="outlined"
          color="primary">
          Edit
        </Button>
        <Button
          onClick={() => handleRemove(row)}
          variant="outlined"
          color="secondary">
          Remove
        </Button>
      </>
    );
  };
  // Table Action Formatter END
  return (
    <>
      {/* Modal Config  */}
      {tableType == "Inventory" && (
        <InventoryModalManager
          modalType={activeModal}
          setActiveModal={setActiveModal}
        />
      )}
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
        <Button
          onClick={() => handleView(row)}
          variant="outlined"
          color="success">
          View
        </Button>
        <Button
          onClick={() => handleEdit(row)}
          variant="outlined"
          color="primary">
          Edit
        </Button>
        <Button
          onClick={() => handleRemove(row)}
          variant="outlined"
          color="secondary">
          Remove
        </Button>
      </>
    );
  };
  // Table Action Formatter END
  return (
    <>
      {/* Modal Config  */}
      {tableType == "Suppliers" && (
        <SupplierModalManager
          modalType={activeModal}
          setActiveModal={setActiveModal}
        />
      )}
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
