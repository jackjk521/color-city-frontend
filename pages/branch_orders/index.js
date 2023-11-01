import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider } from "@mui/material";

// Components
import CardGrid from "../../components/utility/grids/CardGrid";
import CustomTabPanel from "../../components/utility/customTabPanel";

// Table
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  BranchOrderColumns,
  BranchOrderColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import BranchOrdersModalManager from "../../modals/branch_orders/branchOrdersModalManager";
import ActionFormatter from "@/components/branch_orders/actionFormatter";
import withAuth from "@/components/utility/with_auth";

import { get_fetcher } from "@/components/utility/api/fetcher";

const url = "/purchases/?type=BRANCH";

function BranchOrders({ rows }) {
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
        <BranchOrdersModalManager
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          mutate={mutate}
        />

        <Grid container justifyContent="space-between">
          <Grid item></Grid>{" "}
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={() => openModal("add")}>
              {" "}
              Create Order{" "}
            </Button>
          </Grid>
        </Grid>
        <Divider />

        {/* Different Panel Views  */}
        <CustomTabPanel value={value} index={0}>
          <BasicReactTable
            data_columns={BranchOrderColumns}
            column_visibility={BranchOrderColumnsVisibility}
            fetched_data={fetchedData}
            action_formatter={ActionFormatter}
            mutate={mutate}
          />
        </CustomTabPanel>
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

export default withAuth(BranchOrders);
