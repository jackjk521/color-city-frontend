import React, { useState } from "react";
import { Table, Toggle, TagPicker, Pagination } from "rsuite";
import { Box, Typography, Switch, Divider, Chip } from "@mui/material";
import "rsuite/dist/rsuite.min.css";

import { useMediaQuery } from "@mui/material";

import TableOptions from "./customTableOptions";
import CustomColumns from "./customColumns";
import ActionFormatter from "./actionFormatter";
import CustomTableOptions from "./customTableOptions";

const { Column, HeaderCell, Cell } = Table;

const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = (props) => (
  <HeaderCell {...props} style={{ padding: 4 }} />
);

const CustomTable = ({ tableHeaders, data }) => {
  console.log(data);
  const [compact, setCompact] = useState(false);
  const [autoHeight, setAutoHeight] = useState(true);

  const [columnKeys, setColumnKeys] = useState(
    tableHeaders.map((column) => column.key)
  );

  const columns = tableHeaders.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );

  const SwitchCell = ({ rowData, dataKey }) => {
    // Custom formatting logic

    switch (dataKey) {
      case "id":
        return rowData.id;
      case "title":
        return rowData.title;
      case "price":
        return `$${rowData.price.toFixed(2)}`; // Format price as currency
      case "rating":
        return `${rowData.rating}/5`; // Display rating out of 5
      default:
        return rowData[dataKey];
    }
  };

  const CustomCell = compact ? CompactCell : SwitchCell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  // Initial Display Setup
  const [limit, setLimit] = React.useState(5);
  // Initial Page to Show on Initial Load
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

  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust the breakpoint as needed

  const handleButtonClick = () => {
    onClick(rowData);
  };

  const responsiveColumns = isMobile  ? columns.filter((column) => column.key === "title" || column.key === "actions")
  : columns;

  return (
    <Box className="bg-primary">
      {/* Customize Data and Table Structure  */}
      <TableOptions
        compact={compact}
        autoHeight={autoHeight}
        setCompact={setCompact}
        setAutoHeight={setAutoHeight}
      />
      <Divider />
      {/* Customize Columns to Show  */}
      <CustomColumns
        tableHeaders={tableHeaders}
        columnKeys={columnKeys}
        setColumnKeys={setColumnKeys}
      />

      <Divider />
      <Box style={{ height: autoHeight ? "auto" : 400 }}>
        <Table
          height={500}
          width={"100%"}
          autoHeight={autoHeight}
          data={pages}
          headerHeight={compact ? 30 : 50}
          rowHeight={compact ? 30 : 60}
          responsive
        >
          {responsiveColumns.map((column) => {
            const { key, label, ...rest } = column;
            return (
              <Column {...rest} key={key}>
                <CustomHeaderCell>{label}</CustomHeaderCell>
                {compact ? (
                  <CustomCell dataKey={key} />
                ) : (
                  <Cell>
                    {(rowData) => {
                      if (key === "actions") {
                        return (
                          <ActionFormatter
                            rowData={rowData}
                            onClick={handleButtonClick}
                          />
                        );
                      } else {
                        return <CustomCell dataKey={key} rowData={rowData} />;
                      }
                    }}
                  </Cell>
                )}
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
          layout={
            isMobile
              ? ["total", "-", "limit", "|", "next"]
              : ["total", "-", "limit", "|", "pager", "skip"]
          }
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
}

export default CustomTable;