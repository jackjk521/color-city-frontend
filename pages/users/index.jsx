import * as React from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

// Material UI
import { Button, Grid, Divider } from "@mui/material";
// Table
import BasicReactTable from "@/components/utility/tables/basicReactTable";
import {
  UsersColumns,
  UserColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
// import UserModalManager from "../../modals/users/userModalManager";
import ActionFormatter from "../../components/users/actionFormatter";
import withAuth from "@/components/utility/with_auth";
import { get_fetcher } from "@/components/utility/api/fetcher";
import TableRowsSkeleton from "@/components/utility/skeletons/table_rows_skeleton";

// Dynamic Import
const ModalManager = dynamic(
  () => import("../../modals/users/userModalManager"),
  {
    ssr: false,
  }
);

const url = "/users";

function Users() {
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const {
    data: fetchedData,
    mutate,
    error: fetchedError,
    isValidating: isLoading,
  } = useSWR(url, get_fetcher);

  // console.log(data)
  return (
    <>
      {/* Modal Config */}
      {activeModal && (
        <ModalManager
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          mutate={mutate}
        />
      )}

      <Grid container justifyContent="space-between">
        <Grid item>
        </Grid>{" "}
        <Grid item mb={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => openModal("add")}>
            {" "}
            Add User{" "}
          </Button>
        </Grid>
      </Grid>

      {/* User Table  */}
      {fetchedData ? (
        <BasicReactTable
          data_columns={UsersColumns}
          column_visibility={UserColumnsVisibility}
          fetched_data={fetchedData}
          action_formatter={ActionFormatter}
          mutate={mutate}
          isLoading={isLoading}
        />
      ) : (
        <TableRowsSkeleton />
      )}
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   try {
//     const initialData = await get_fetcher(url);
//     return {
//       props: {
//         rows: initialData,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching API data:", error);
//     return {
//       props: {
//         rows: [],
//       },
//     };
//   }
// }

export default withAuth(Users);
