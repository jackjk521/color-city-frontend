import React, { useState } from "react";

import { format } from "date-fns";
import numeral from "numeral";

import { Table, Toggle, TagPicker, Pagination } from "rsuite";
import {
  Box,
  Typography,
  Switch,
  Divider,
  Chip,
  useMediaQuery,
} from "@mui/material";
import "rsuite/dist/rsuite.min.css";

import TableOptions from "./customTableOptions";
import CustomColumns from "./customColumns";
import PurchaseActionFormatter, {
  PurchaseCells,
} from "../../purchases/actionFormatter";

import { handleSortColumn } from "./sorters_filters";

const { Column, HeaderCell, Cell } = Table;

const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = (props) => (
  <HeaderCell {...props} style={{ padding: 4 }} />
);

const CustomTable = ({ tableHeaders, data, tableType }) => {
  // console.log(data);
  const [compact, setCompact] = useState(false);
  const [autoHeight, setAutoHeight] = useState(true);
  const [tableOptions, setTableOptions] = useState(false);

  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const [columnKeys, setColumnKeys] = useState(
    tableHeaders.map((column) => column.key)
  );

  const columns = tableHeaders.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );

  const SwitchCell = ({ rowData, dataKey}) => {
    // export this out and passed to the table
    switch (tableType) {
      case "Purchases":
        return <PurchaseCells rowData={rowData} dataKey={dataKey} />;
      case "Inventory":
        return <PurchaseCells rowData={rowData} dataKey={dataKey} />;

      default:
        return rowData[dataKey];
    }
  };

  const SwitchHeaderCell = ({ children }) => {
    // Custom formatting logic

    return (
      <HeaderCell>
        <Typography fontSize={2} color="primary">
          {children}
        </Typography>
      </HeaderCell>
    );
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
  // const pages = transformData(sortColumn, sortType, data, limit, page);

  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 850px)");

  const responsiveColumns = isMobile
    ? columns.filter(
        (column) => column.key === "title" || column.key === "actions"
      )
    : columns;

  const handleToggle = () => {
    setTableOptions(!tableOptions);
  };

  const handleSort = () => {
    handleSortColumn(
      sortColumn,
      sortType,
      setLoading,
      setSortColumn,
      setSortType
    );
  };

  return (
    <Box className="bg-primary">
      {/* Customize Data and Table Structure  */}
      <Toggle onClick={handleToggle} />
      {tableOptions && (
        <Box>
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
        </Box>
      )}

      <Divider />
      <Box style={{ height: autoHeight ? "auto" : 400 }}>
        <Table
          height={500}
          width={"100%"}
          autoHeight={autoHeight}
          data={pages}
          headerHeight={compact ? 30 : 50}
          rowHeight={compact ? 30 : 60}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSort}
          loading={loading}
          responsive>
          {responsiveColumns.map((column) => {
            const { key, label, ...rest } = column;
            return (
              // to edit as it is not as scalable
              <Column {...rest} key={key} sortable>
                <CustomHeaderCell style={{ fontSize: "1rem" }}>
                  {label}
                </CustomHeaderCell>
                {compact ? (
                  <CustomCell dataKey={key} />
                ) : (
                  <Cell>
                    {(rowData) => {
                      if (key === "actions") {
                        return (
                          tableType === "Purchases" && (
                            <PurchaseActionFormatter rowData={rowData} />
                          )
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
          ellipsis
          boundaryLinks
          maxButtons={1}
          size="sm"
          layout={
            isMobile
              ? ["total", "-", "limit", "|", "pager"]
              : ["total", "-", "limit", "|", "pager", "skip"]
          }
          total={data.length}
          limitOptions={[5, 15]} // edit this
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
          className="pagination-container" // edit this with our own styling
        />
      </Box>
    </Box>
  );
};

export default CustomTable;
