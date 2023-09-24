import { TableCell } from "@mui/material";

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
  return (
    <>
      <TableCell component="th" scope="row" align="center" padding="none">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.title}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.rating}</TableCell>
    </>
  );
};
