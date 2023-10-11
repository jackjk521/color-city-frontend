import * as React from "react";
import useSWR from "swr";

// Material UI
import { Box, Tabs, Tab, Button, Grid, Divider } from "@mui/material";

import Swal from "sweetalert2";

// Components
import ItemsContent from "../../components/items/itemsContent";
import CardGrid from "../../components/utility/grids/CardGrid";
import CustomTabPanel from "../../components/utility/customTabPanel";

import CustomTable from "../../components/utility/tables/customDisplayTable";

// Helper Functions
import { ItemsColumns } from "../../components/utility/tables/tableColumns";
import ItemModalManager from "../../components/items/modals/itemModalManager";
import apiClient from "../../components/utility/api/apiClient"

const url = "/items";
const fetcher = async (url) => {
  try {
    const response = await apiClient.get(url);
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
  // console.log(rows);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };
  // const [data, setData] = React.useState(null);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);
  const { data: fetchedData, error: fetchedError } = useSWR(url, fetcher, {
    fallbackData: rows,
  });

  // React.useEffect(() => {
  //   if (fetchedData) {
  //     setData(fetchedData);
  //     setIsLoading(false);
  //   }

  //   if (fetchedError) {
  //     setError(fetchedError);
  //     setIsLoading(false);
  //   }
  // }, [fetchedData, fetchedError]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // console.log(data)
  return (
    <>
      <ItemsContent>
        {/* Modal Config */}
        <ItemModalManager
          activeModal={activeModal}
          setActiveModal={setActiveModal}
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
            <CustomTable
              tableHeaders={ItemsColumns}
              data={fetchedData}
              tableType="Items"
            />
          </CardGrid>
        </CustomTabPanel>
      </ItemsContent>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const initialData = await fetcher(url);
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
