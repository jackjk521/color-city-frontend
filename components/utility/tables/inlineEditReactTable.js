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
  handleRowSave,
}) => {
  //should be memoized or stable
  const columns = useMemo(() => data_columns, []);
  const [data, setData] = useState(local_data);

  useEffect(() => {
    setData(local_data);
  }, [local_data]);

  const isTablet = useMediaQuery("(max-width: 820px)");

  // Purchase Lines
  // const handleRowSave = (e) => {
  //   const { values } = e;

  //   const item_id = values.item;
  //   const item_price = values.item_price_w_vat;
  //   const updated_req_quantity = values.req_quantity;
  //   const newSubtotal = item_price * updated_req_quantity;

  //   setLocalData((prevState) => ({
  //     ...prevState,
  //     purchaseLines: prevState.purchaseLines.map((line) => {
  //       if (line.item === item_id) {
  //         console.log(line.item === item_id);
  //         console.log(updated_req_quantity);
  //         console.log(newSubtotal);

  //         return {
  //           ...line,
  //           req_quantity: updated_req_quantity,
  //           subtotal: newSubtotal,
  //         };
  //       }
  //       return line;
  //     }),
  //   }));

  //   e.table.setEditingRow(null);
  // };

  return (
    <>
      {isTablet ? (
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{
            columnVisibility: column_visibility,
          }}
          enableFullScreenToggle={false}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row }) => (
            <ActionFormatter
              rowData={row.original}
              local_data={local_data}
              setLocalData={setLocalData}
            />
          )}
        />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowActions
          positionActionsColumn="last"
          enableFullScreenToggle={false}
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
          onEditingRowSave={(e) => handleRowSave(e, setLocalData)}
        />
      )}
    </>
  );
};

export default InlineEditReactTable;
