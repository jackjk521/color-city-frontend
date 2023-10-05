import React, { useState } from "react";
import { Table, Toggle } from "rsuite";
import { Box, Typography, Switch, Divider, Chip } from "@mui/material";

function CustomTableOptions({
  compact,
  autoHeight,
  setCompact,
  setAutoHeight,
}) {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography p={4}>Compact:</Typography>
        <Switch
          checked={compact}
          onChange={() => setCompact(!compact)}
          color="primary"
        />
         <Typography p={4}>Auto Height:</Typography>
        <Toggle
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={autoHeight}
          onChange={setAutoHeight}
        />
      </Box>
     
    </>
  );
}

export default CustomTableOptions;
