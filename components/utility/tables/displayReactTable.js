import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMediaQuery } from "@mui/material";

const DisplayReactTable = ({
  data_columns,
  column_visibility,
  fetched_data,
}) => {
  //should be memoized or stable
  const columns = useMemo(() => data_columns, []);
  const [data, setData] = useState(fetched_data);

  useEffect(() => {
    setData(fetched_data); // Use setLocalData here
  }, [fetched_data]);

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
          enableFullScreenToggle={false}


        />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableFullScreenToggle={false}

        />
      )}
    </>
  );
};

export default DisplayReactTable;
