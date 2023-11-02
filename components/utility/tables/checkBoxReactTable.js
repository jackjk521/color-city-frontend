import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { useMediaQuery } from "@mui/material";

const CheckBoxReactTable = ({
  data_columns,
  column_visibility,
  fetched_data,
  rowSelection,
  setRowSelection,
  handleRowSave,
  rowSelectionSetup,
  getRowId
}) => {
  //should be memoized or stable
  const columns = useMemo(() => data_columns, []);
  const [data, setData] = useState(fetched_data);

  useEffect(() => {
    setData(fetched_data);
  }, [setData, fetched_data]);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  return (
    <>
      {isMobile || isTablet ? (
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{
            columnVisibility: column_visibility,
          }}
          // Can be passed from parameters to be reusable
          enableRowSelection={(originalRow) => {
            // If the purchase line is not completed and the received_quantity is not equal to 0 and
            return (
              originalRow.status !== "COMPLETED" &&
              originalRow.original.received_quantity == 0 &&
              originalRow.original.req_quantity !=
                originalRow.original.received_quantity
            );
          }}
          enablePagination={false}
          enableStickyHeader
          // Can be passed from parameters to be reusable
          getRowId={(originalRow) => originalRow.purchase_line_id} // sets the indexes save in rowSelect the purchase_line_id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection }}
          // Allow editing for partial
          editDisplayMode="row"
          enableEditing
          onEditingRowSave={handleRowSave}
        />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          positionActionsColumn="last"
          enableRowSelection={(originalRow) =>
            // If the purchase line is not completed and the received_quantity is not equal to 0 and
            rowSelectionSetup(originalRow)
          }
          enablePagination={false}
          enableStickyHeader
          getRowId={(originalRow) => getRowId(originalRow)} // sets the indexes save in rowSelect the purchase_line_id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection }}
          // Allow editing for partial
          editDisplayMode="row"
          enableEditing
          onEditingRowSave={handleRowSave}
        />
      )}
    </>
  );
};

export default CheckBoxReactTable;
