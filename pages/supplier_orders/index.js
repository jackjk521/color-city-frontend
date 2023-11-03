import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider } from "@mui/material";

// Components

// Table
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  SupplierOrderColumns,
  SupplierOrderColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import SupplierOrdersModalManager from "../../modals/supplier_orders/supplierOrdersModalManager";
import ActionFormatter from "@/components/supplier_orders/actionFormatter";
import withAuth from "@/components/utility/with_auth";

import { get_fetcher } from "@/components/utility/api/fetcher";

const url = "/purchases/?type=SUPPLIER";

function SupplierOrders({ rows }) {
  // const [data, setData] = React.useState(rows);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const {
    data: fetchedData,
    mutate,
    error: fetchedError,
  } = useSWR(url, get_fetcher, {
    fallbackData: rows,
  });

  return (
    <>
      {/* Modal Config */}
      <SupplierOrdersModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        mutate={mutate}
      />

      <Grid container justifyContent="space-between">
        <Grid item></Grid>{" "}
        <Grid item mb={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => openModal("add")}>
            {" "}
            Create Order{" "}
          </Button>
        </Grid>
      </Grid>

      {/* Different Panel Views  */}
        <BasicReactTable
          data_columns={SupplierOrderColumns}
          column_visibility={SupplierOrderColumnsVisibility}
          fetched_data={fetchedData}
          action_formatter={ActionFormatter}
          mutate={mutate}
        />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const initialData = await get_fetcher(url);
    return {
      props: {
        rows: initialData,
      },
    };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return {
      props: {
        rows: [],
      },
    };
  }
}

export default withAuth(SupplierOrders);
