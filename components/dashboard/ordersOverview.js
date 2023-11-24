import React from "react";

import Link from 'next/link'
import { Grid, Chip } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import {
  PurchaseOrderColumns,
  PurchaseOrderColumnsVisibility,
} from "../utility/tables/tableColumns";
import BasicReactTable from "../utility/tables/basicReactTable";
import ActionFormatter from "./actionFormatter";
import { Skeleton } from "@mui/material";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import FilterFramesIcon from '@mui/icons-material/FilterFrames';

function OrdersOverview({ tableData, mutate, isLoading }) {
  // console.log(tableData.for_approval_orders);

  return (
    <React.Fragment>
      {" "}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sx={{ display: 'flex', gap: '8px' }}>
          
          <Chip
            icon={<FilterFramesIcon />}
            label="Orders as of this week"
            variant="outlined"
          />
          <Chip
            label="Branch Orders"
            icon={<TransferWithinAStationIcon/>}
            component={Link}
            href="/branch_orders"
            variant="outlined"
            clickable
          />
          <Chip
            label="Supplier Orders"
            icon={<MoveUpIcon/>}
            component={Link}
            href="/supplier_orders"
            variant="outlined"
            clickable
          />
        </Grid>

        {/* For Approval Orders */}
        <Grid item xs={12} sm={4} textAlign="center">
          <Chip
            icon={<FaceIcon />}
            label="For Approval Orders"
            variant="outlined"
            sx={{ marginBottom: '8px' }}
          />
          {tableData.for_approval_orders ? (
            <BasicReactTable
              data_columns={PurchaseOrderColumns}
              column_visibility={PurchaseOrderColumnsVisibility}
              fetched_data={tableData.for_approval_orders}
              action_formatter={ActionFormatter}
              mutate={mutate}
              isLoading={isLoading}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
        </Grid>
        {/* Pending or to be received Orders*/}
        <Grid item xs={12} sm={4} textAlign="center">
          <Chip
            icon={<FaceIcon />}
            label="To Receive Orders"
            variant="outlined"
            sx={{ marginBottom: '8px' }}

          />
          {tableData.pending_orders ? (
            <BasicReactTable
              data_columns={PurchaseOrderColumns}
              column_visibility={PurchaseOrderColumnsVisibility}
              fetched_data={tableData.pending_orders}
              action_formatter={ActionFormatter}
              mutate={mutate}
              isLoading={isLoading}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
        </Grid>
        {/* Completed Orders */}
        <Grid item xs={12} sm={4} textAlign="center">
          <Chip
            icon={<FaceIcon />}
            label="Completed Orders"
            variant="outlined"
            sx={{ marginBottom: '8px' }}

          />
          {tableData.completed_orders ? (
            <BasicReactTable
              data_columns={PurchaseOrderColumns}
              column_visibility={PurchaseOrderColumnsVisibility}
              fetched_data={tableData.completed_orders}
              action_formatter={ActionFormatter}
              mutate={mutate}
              isLoading={isLoading}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default OrdersOverview;
