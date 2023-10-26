import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";

// PurchaseLines
import ActionFormatter from "@/components/supplier_orders/actionFormatterPL";

const InlineEditReactTable = ({
  data_columns,
  column_visibility,
  local_data,
  setLocalData,
}) => {
  //should be memoized or stable
  const columns = useMemo(() => data_columns, []);
  const [data, setData] = useState(local_data);

  useEffect(() => {
    setData(local_data);
  }, [local_data]);


  const isTablet = useMediaQuery("(max-width: 820px)");

  return (
    <>
      {isTablet ? (
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{
            columnVisibility: column_visibility,
          }}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={
            ({ row }) => (
              <ActionFormatter
                rowData={row.original}
                local_data={local_data}
                setLocalData={setLocalData}
              />
            )
          }
        />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <ActionFormatter
              rowData={row.original}
              local_data={local_data}
              setLocalData={setLocalData}
              table={table}
              row={row}
            />
          )}
          editDisplayMode="row"
          enableEditing
          onEditingRowSave={setData}
        />
      )}
    </>
  );
};

export default InlineEditReactTable;
