import React from "react";
import { TagPicker } from "rsuite";
import { Box, Typography} from "@mui/material";

function customColumns({tableHeaders, columnKeys, setColumnKeys}) {
  return (
    <Box display="flex">
      <Typography px={4} py={2}>
        Columns:
      </Typography>
      <TagPicker
        data={tableHeaders}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      />
    </Box>
  );
}

export default customColumns;
