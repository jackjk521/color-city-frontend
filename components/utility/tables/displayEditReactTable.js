import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMediaQuery } from "@mui/material";

const BasicReactTable = ({
  data_columns,
  column_visibility,
  fetched_data,
  action_formatter,
  mutate,
}) => {
  //should be memoized or stable
  const columns = useMemo(() => data_columns, []);
  const [data, setData] = useState(fetched_data);

  useEffect(() => {
    setData(fetched_data); // Use setLocalData here
  }, [fetched_data]);
  // const table = useMaterialReactTable({
  //   columns,
  //   data,
  // });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  return (
    <>
      {isMobile || isTablet ? (
        <>
          <MaterialReactTable
            columns={columns}
            data={data}
            initialState={{
              columnVisibility: column_visibility,
            }}
            enableRowActions
            positionActionsColumn="last"
            renderRowActions={({ row }) =>
              action_formatter({ rowData: row.original, mutate: mutate })
            }
            // state={{ isLoading: true }}
          />
        </>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row }) =>
            action_formatter({ rowData: row.original, mutate: mutate })
          }
          // state={{ isLoading: true }}
        />
      )}
    </>
  );
};

export default BasicReactTable;
