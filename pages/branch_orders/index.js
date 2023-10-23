import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider } from "@mui/material";

import Swal from "sweetalert2";

// Components
import ItemsContent from "../../components/items/itemsContent";
import CardGrid from "../../components/utility/grids/CardGrid";
import CustomTabPanel from "../../components/utility/customTabPanel";

// Table
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  BranchOrdersColumns,
  BranchOrdersColumnVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import ItemModalManager from "../../modals/items/itemModalManager";
import ActionFormatter from "@/components/items/actionFormatter";
import withAuth from "@/components/utility/with_auth";

import { get_fetcher } from "@/components/utility/api/fetcher";

const url = "/items";

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

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetcher();
  //   }, 5000); // Set the interval to 1 minute

  //   return () => {
  //     clearInterval(interval); // Cleanup the interval on component unmount
  //   };
  // }, []);

  // console.log(data)
  return (
    <>
      <ItemsContent>
        {/* Modal Config */}
        <ItemModalManager
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
              Add Item{" "}
            </Button>
          </Grid>
        </Grid>
        <Divider />

        {/* Different Panel Views  */}
        <CustomTabPanel value={value} index={0}>
          <CardGrid>
            <BasicReactTable
              data_columns={BranchOrdersColumns}
              column_visibility={BranchOrdersColumnVisibility}
              fetched_data={fetchedData}
              action_formatter={ActionFormatter}
              mutate={mutate}
            />
          </CardGrid>
        </CustomTabPanel>
      </ItemsContent>
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
