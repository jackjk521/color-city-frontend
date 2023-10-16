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
import { ItemColumns } from "../../components/utility/tables/tableColumns";

// Helper Functions
import ItemModalManager from "../../components/items/modals/itemModalManager";
import ActionFormatter from "@/components/items/actionFormatter";
import apiClient from "../../components/utility/api/apiClient";

const fetcher = async () => {
  try {
    const response = await apiClient.get("/items");
    if (response.status !== 200) {
      const error = new Error();
      error.info = response.data;
      error.status = response.status;
      error.message = "An error occurred while fetching data";
      Swal.fire({
        title: error.info,
        text: error.message,
        icon: "error",
      });
      throw error;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function Items({ rows }) {
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
  } = useSWR("/items", fetcher, {
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
              onClick={() => openModal("add")}
            >
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
              data_columns={ItemColumns}
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
    const initialData = await fetcher("/items");
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
