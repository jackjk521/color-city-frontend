import React, { useState } from "react";
import { Table, Toggle, TagPicker, Pagination } from "rsuite";
import { Box, Typography, Switch, Divider, Chip } from "@mui/material";
import "rsuite/dist/rsuite.min.css";

const { Column, HeaderCell, Cell } = Table;

const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = (props) => (
  <HeaderCell {...props} style={{ padding: 4 }} />
);

const CustomTable = ({ tableHeaders, data }) => {
  const [loading, setLoading] = useState(false);
  const [compact, setCompact] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [noData, setNoData] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [autoHeight, setAutoHeight] = useState(true);
  const [fillHeight, setFillHeight] = useState(false);
  const [hover, setHover] = useState(true);
  const [columnKeys, setColumnKeys] = useState(
    tableHeaders.map((column) => column.key)
  );

  const columns = tableHeaders.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const pages = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });


  return (
    <Box className="bg-primary">
      <Box display="flex" alignItems="center">
        <Typography p={4}>Compact:</Typography>
        <Switch
          checked={compact}
          onChange={() => setCompact(!compact)}
          color="primary"
        />
        <Typography p={4}>Bordered:</Typography>
        <Switch
          checked={bordered}
          onChange={() => setBordered(!bordered)}
          color="primary"
        />
        <Typography p={4}>Show Header:</Typography>
        <Switch
          checked={showHeader}
          onChange={() => setShowHeader(!showHeader)}
          color="primary"
        />
        <Typography p={4}>Hover:</Typography>
        <Switch
          checked={hover}
          onChange={() => setHover(!hover)}
          color="primary"
        />
      </Box>
      <Divider />
      <Box display="flex" alignItems="center">
        <Typography p={4}>Loading:</Typography>
        <Toggle
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={loading}
          onChange={setLoading}
        />
        <Typography p={4}>No data:</Typography>
        <Toggle
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={noData}
          onChange={setNoData}
        />
        <Typography p={4}>Auto Height:</Typography>
        <Toggle
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={autoHeight}
          onChange={setAutoHeight}
        />
        <Typography p={4}>Fill Height:</Typography>
        <Toggle
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={fillHeight}
          onChange={setFillHeight}
        />
      </Box>
      <Divider />
      <Typography>Columns:</Typography>
      <TagPicker
        data={tableHeaders}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      />
      <Divider />
      <Box style={{ height: autoHeight ? "auto" : 400 }}>
        <Table
          loading={loading}
          height={500}
          hover={hover}
          fillHeight={fillHeight}
          showHeader={showHeader}
          autoHeight={autoHeight}
          data={noData ? [] : pages}
          bordered={bordered}
          cellBordered={bordered}
          headerHeight={compact ? 30 : 40}
          rowHeight={compact ? 30 : 46}>
          {columns.map((column) => {
            const { key, label, ...rest } = column;
            return (
              <Column {...rest} key={key}>
                <CustomHeaderCell>{label}</CustomHeaderCell>
                <CustomCell dataKey={key} />
              </Column>
            );
          })}
        </Table>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="md"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[5, 15]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </Box>
    </Box>
  );
};

export default CustomTable;
