import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider, Tabs, Tab } from "@mui/material";

// Components

// Table
import {
  BranchOrderColumns,
  BranchOrderColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import BranchOrdersModalManager from "../../modals/branch_orders/branchOrdersModalManager";
import ActionFormatter from "@/components/branch_orders/actionFormatter";
import withAuth from "@/components/utility/with_auth";
// Tabs Handlers
import { renderTabContent } from "@/components/branch_orders/tab_tables";
import { UserContext } from "@/contexts/userContext";
import { get_fetcher } from "@/components/utility/api/fetcher";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Tabs URLs
const allUrl = "/purchases/?type=BRANCH";
const branch1Url = "/purchases/?type=BRANCH&branch=2";
const branch2Url = "/purchases/?type=BRANCH&branch=3";
const branch3Url = "/purchases/?type=BRANCH&branch=4";


function BranchOrders({
  // rows,
  allBranchOrders,
  branch1Orders,
  branch2Orders,
  branch3Orders,
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activeModal, setActiveModal] = React.useState(null);
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const { user } = React.useContext(UserContext);

  const {
    data: allBranchOrdersData,
    mutate: allBranchOrdersMutate,
    error: allBranchOrdersError,
  } = useSWR(allUrl, get_fetcher, {
    fallbackData: allBranchOrders,
  });

  const {
    data: branch1OrdersData,
    mutate: branch1OrdersMutate,
    error: branch1OrdersError,
  } = useSWR(branch1Url, get_fetcher, {
    fallbackData: branch1Orders,
  });

  const {
    data: branch2OrdersData,
    mutate: branch2OrdersMutate,
    error: branch2OrdersError,
  } = useSWR(branch2Url, get_fetcher, {
    fallbackData: branch2Orders,
  });

  const {
    data: branch3OrdersData,
    mutate: branch3OrdersMutate,
    error: branch3OrdersError,
  } = useSWR(branch3Url, get_fetcher, {
    fallbackData: branch3Orders,
  });

  const mutateArray = {
    0: allBranchOrdersMutate,
    1: branch1OrdersMutate,
    2: branch2OrdersMutate,
    3: branch3OrdersMutate,
  };

  const dataArray = {
    0: allBranchOrdersData,
    1: branch1OrdersData,
    2: branch2OrdersData,
    3: branch3OrdersData,
  };

  const branch_id = user.userCredentials.branch - 1;

  return (
    <>
      {/* Modal Config */}
      <BranchOrdersModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        mutate={mutateArray[branch_id]}
      />

      <Grid container justifyContent="space-between">
        <Grid item>
          {user.userCredentials.user_role === "Administrator" && (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="All" {...a11yProps(0)} />
              <Tab label="Branch 1" {...a11yProps(1)} />
              <Tab label="Branch 2" {...a11yProps(2)} />
              <Tab label="Branch 3" {...a11yProps(3)} />
            </Tabs>
          )}
          {user.userCredentials.user_role === "Manager" && (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="Branch Orders" {...a11yProps(branch_id)} />
            </Tabs>
          )}
        </Grid>{" "}
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
      <Divider />

      {/* Different Panel Views  */}
      {user.userCredentials.user_role === "Administrator" && (
        <>
          {renderTabContent({
            tabValue: value,
            tabIndex: 0,
            tabName: "All",
            tabData: allBranchOrdersData,
            dataColumns: BranchOrderColumns,
            column_visibility: BranchOrderColumnsVisibility,
            actionFormatter: ActionFormatter,
            tabMutate: allBranchOrdersMutate,
          })}

          {renderTabContent({
            tabValue: value,
            tabIndex: 1,
            tabName: "Branch 1",
            tabData: branch1OrdersData,
            dataColumns: BranchOrderColumns,
            column_visibility: BranchOrderColumnsVisibility,
            actionFormatter: ActionFormatter,
            tabMutate: branch1OrdersMutate,
          })}

          {renderTabContent({
            tabValue: value,
            tabIndex: 2,
            tabName: "Branch 2",
            tabData: branch2OrdersData,
            dataColumns: BranchOrderColumns,
            column_visibility: BranchOrderColumnsVisibility,
            actionFormatter: ActionFormatter,
            tabMutate: branch2OrdersMutate,
          })}

          {renderTabContent({
            tabValue: value,
            tabIndex: 3,
            tabName: "Branch 3",
            tabData: branch3OrdersData,
            dataColumns: BranchOrderColumns,
            column_visibility: BranchOrderColumnsVisibility,
            actionFormatter: ActionFormatter,
            tabMutate: branch3OrdersMutate,
          })}
        </>
      )}  

      {user.userCredentials.user_role === "Manager" && (
        <>
          {renderTabContent({
            tabValue: branch_id,
            tabIndex: branch_id,
            tabName: "Branch Orders",
            tabData: dataArray[branch_id],
            dataColumns: BranchOrderColumns,
            column_visibility: BranchOrderColumnsVisibility,
            actionFormatter: ActionFormatter,
            tabMutate: mutateArray[branch_id],
          })}
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    // const initialData = await get_fetcher(url);
    const initialAllBranchOrders = await get_fetcher(allUrl);
    const initialBranch1Orders = await get_fetcher(branch1Url);
    const initialBranch2Orders = await get_fetcher(branch2Url);
    const initialBranch3Orders = await get_fetcher(branch3Url);
    return {
      props: {
        allBranchOrders: initialAllBranchOrders,
        branch1Orders: initialBranch1Orders,
        branch2Orders: initialBranch2Orders,
        branch3Orders: initialBranch3Orders,
      },
    };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return {
      props: {
        allBranchOrders: [],
        branch1Orders: [],
        branch2Orders: [],
        branch3Orders: [],
      },
    };
  }
}

export default withAuth(BranchOrders);
