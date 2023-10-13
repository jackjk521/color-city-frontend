import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const BasicReactTable = ({
  data_columns,
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

  return (
    <>
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
    </>
  );
};

export default BasicReactTable;
