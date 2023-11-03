import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider } from "@mui/material";

// Components
import ItemsContent from "../../components/items/itemsContent";

// Table
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  ItemColumns,
  ItemColumnVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import ItemModalManager from "../../modals/items/itemModalManager";
import ActionFormatter from "@/components/items/actionFormatter";
import withAuth from "@/components/utility/with_auth";

import { get_fetcher } from "@/components/utility/api/fetcher";

const url = "/items";

function Items({ rows }) {
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
          <Grid item mb={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => openModal("add")}
              >
              {" "}
              Add Item{" "}
            </Button>
          </Grid>
        </Grid>
        <Divider />

        {/* Different Panel Views  */}

        <BasicReactTable
          data_columns={ItemColumns}
          column_visibility={ItemColumnVisibility}
          fetched_data={fetchedData}
          action_formatter={ActionFormatter}
          mutate={mutate}
        />
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

export default withAuth(Items);
