import * as React from "react";
import useSWR from "swr";

// Material UI
import { Button, Grid, Divider, Tabs, Tab } from "@mui/material";

// Components
import InventoryContent from "../../components/inventory/inventoryContent";

// Table
import {
  InventoryColumns,
  InventoryColumnsVisibility,
} from "../../components/utility/tables/tableColumns";

// Helper Functions
import InventoryModalManager from "../../modals/inventory/inventoryModalManager";
import ActionFormatter from "@/components/inventory/actionFormatter";
import withAuth from "@/components/utility/with_auth";

import { renderTabContent } from "@/components/items_info/tab_tables";
import { UserContext } from "@/contexts/userContext";
import { get_fetcher } from "@/components/utility/api/fetcher";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const allUrl = "/inventory";
const warehouseUrl = `/inventory/?branch=1`;
const branch1Url = `/inventory/?branch=2`;
const branch2Url = `/inventory/?branch=3`;
const branch3Url = `/inventory/?branch=4`;

function Inventory({
  allInventory,
  warehouseInventory,
  branch1Inventory,
  branch2Inventory,
  branch3Inventory,
}) {
  // const [data, setData] = React.useState(rows);
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
    data: allInventoryData,
    mutate: allInventoryMutate,
    error: allInventoryError,
  } = useSWR(allUrl, get_fetcher, {
    fallbackData: allInventory,
  });

  const {
    data: warehouseData,
    mutate: warehouseMutate,
    error: warehouseDataError,
  } = useSWR(warehouseUrl, get_fetcher, {
    fallbackData: warehouseInventory,
  });

  const {
    data: branch1Data,
    mutate: branch1Mutate,
    error: branch1Error,
  } = useSWR(branch1Url, get_fetcher, {
    fallbackData: branch1Inventory,
  });

  const {
    data: branch2Data,
    mutate: branch2Mutate,
    error: branch2Error,
  } = useSWR(branch2Url, get_fetcher, {
    fallbackData: branch2Inventory,
  });

  const {
    data: branch3Data,
    mutate: branch3Mutate,
    error: branch3Error,
  } = useSWR(branch3Url, get_fetcher, {
    fallbackData: branch3Inventory,
  });

  const mutateArray = {
    0: allInventoryMutate,
    1: warehouseMutate,
    2: branch1Mutate,
    3: branch2Mutate,
    4: branch3Mutate,
  };

  const dataArray = {
    0: allInventoryData,
    1: warehouseData,
    2: branch1Data,
    3: branch2Data,
    4: branch3Data,
  };

  const branch_id = user.userCredentials.branch;

  return (
    <>
      <InventoryContent>
        {/* Modal Config */}
        <InventoryModalManager
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          mutate={mutateArray[value]}
        />

        <Grid container justifyContent="space-between">
          <Grid item>
            {user.userCredentials.user_role === "Administrator" && (
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example">
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Warehouse" {...a11yProps(1)} />
                <Tab label="Branch 1" {...a11yProps(2)} />
                <Tab label="Branch 2" {...a11yProps(3)} />
                <Tab label="Branch 3" {...a11yProps(4)} />
              </Tabs>
            )}
            {user.userCredentials.user_role === "Manager" && (
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example">
                <Tab label="Branch Inventory" {...a11yProps(branch_id)} />
              </Tabs>
            )}
          </Grid>{" "}
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={() => openModal("add")}>
              {" "}
              Add to Inventory{" "}
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
              tabData: allInventoryData,
              dataColumns: InventoryColumns,
              column_visibility: InventoryColumnsVisibility,
              actionFormatter: ActionFormatter,
              tabMutate: allInventoryMutate,
            })}

            {renderTabContent({
              tabValue: value,
              tabIndex: 1,
              tabName: "Warehouse",
              tabData: warehouseData,
              dataColumns: InventoryColumns,
              column_visibility: InventoryColumnsVisibility,
              actionFormatter: ActionFormatter,
              tabMutate: warehouseMutate,
            })}

            {renderTabContent({
              tabValue: value,
              tabIndex: 2,
              tabName: "Branch 1",
              tabData: branch1Data,
              dataColumns: InventoryColumns,
              column_visibility: InventoryColumnsVisibility,
              actionFormatter: ActionFormatter,
              tabMutate: branch1Mutate,
            })}

            {renderTabContent({
              tabValue: value,
              tabIndex: 3,
              tabName: "Branch 2",
              tabData: branch2Data,
              dataColumns: InventoryColumns,
              column_visibility: InventoryColumnsVisibility,
              actionFormatter: ActionFormatter,
              tabMutate: branch2Mutate,
            })}

            {renderTabContent({
              tabValue: value,
              tabIndex: 4,
              tabName: "Branch 3",
              tabData: branch3Data,
              dataColumns: InventoryColumns,
              column_visibility: InventoryColumnsVisibility,
              actionFormatter: ActionFormatter,
              tabMutate: branch3Mutate,
            })}
          </>
        )}

        {user.userCredentials.user_role === "Manager" && (
          <>
            {renderTabContent({
              tabValue: branch_id,
              tabIndex: branch_id,
              tabName: "Branch Inventory",
              tabData: dataArray[branch_id],
              dataColumns: InventoryColumns,
              column_visibility: InventoryColumnsVisibility,
              actionFormatter: ActionFormatter,
              tabMutate: mutateArray[branch_id],
            })}
          </>
        )}
      </InventoryContent>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const initialAllInventoryData = await get_fetcher(allUrl);
    const initialWarehouseData = await get_fetcher(warehouseUrl);
    const initialBranch1Data = await get_fetcher(branch1Url);
    const initialBranch2Data = await get_fetcher(branch2Url);
    const initialBranch3Data = await get_fetcher(branch3Url);

    return {
      props: {
        allInventoryData: initialAllInventoryData,
        warehouseData: initialWarehouseData,
        branch1Inventory: initialBranch1Data,
        branch2Inventory: initialBranch2Data,
        branch3Inventory: initialBranch3Data,
      },
    };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return {
      props: {
        allInventoryData: [],
        warehouseData: [],
        branch1Inventory: [],
        branch2Inventory: [],
        branch3Inventory: [],
      },
    };
  }
}

export default withAuth(Inventory);
