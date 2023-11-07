import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider } from "@mui/material";

// Components

// Table
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  BranchesColumns,
  BranchColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import BranchModalManager from "../../modals/branches/branchModalManager";
import ActionFormatter from "../../components/branches/actionFormatter";
import withAuth from "@/components/utility/with_auth";
import { get_fetcher } from "@/components/utility/api/fetcher";

const url = "/branches";

function Branches({ rows }) {
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

  // console.log(data)
  return (
    <React.Fragment>
      {/* Modal Config */}
      <BranchModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        mutate={mutate}
      />

      <Grid container justifyContent="space-between">
        <Grid item></Grid>{" "}
        <Grid item  mb={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => openModal("add")}
           >
            {" "}
            Add Branch{" "}
          </Button>
        </Grid>
      </Grid>

      {/* Branches Table  */}
      <BasicReactTable
        data_columns={BranchesColumns}
        column_visibility={BranchColumnsVisibility}
        fetched_data={fetchedData}
        action_formatter={ActionFormatter}
        mutate={mutate}
      />
    </React.Fragment>
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

export default withAuth(Branches);
