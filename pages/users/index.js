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
  UsersColumns,
  UserColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import UserModalManager from "../../modals/users/userModalManager";
import ActionFormatter from "../../components/users/actionFormatter";
import withAuth from "@/components/utility/with_auth";

import { get_fetcher } from "@/components/utility/api/fetcher";


const url = "/users"

function Users({ rows }) {
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


  // console.log(data)
  return (
    <>
      {/* <ItemsContent> */}
        {/* Modal Config */}
        <UserModalManager
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
              Add User{" "}
            </Button>
          </Grid>
        </Grid>
        <Divider />

        {/* Different Panel Views  */}
        <CustomTabPanel value={value} index={0}>
          <CardGrid>
            <BasicReactTable
              data_columns={UsersColumns}
              column_visibility={UserColumnsVisibility}
              fetched_data={fetchedData}
              action_formatter={ActionFormatter}
              mutate={mutate}
            />
          </CardGrid>
        </CustomTabPanel>
      {/* </ItemsContent> */}
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

export default withAuth(Users)
