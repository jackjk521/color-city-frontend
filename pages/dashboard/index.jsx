import * as React from "react";
import useSWR from "swr";

import DashboardContent from "@/components/dashboard/dashboardContent";
import withAuth from "@/components/utility/with_auth";
import { get_fetcher } from "@/components/utility/api/fetcher";

const url = "/dashboard/?type=orders_overview";
const inventory_overview_url = "/dashboard/?type=inventory_data";

function Dashboard() {
  const {
    data: fetchedData,
    mutate,
    error: fetchedError,
    isValidating: isLoading,
  } = useSWR(url, get_fetcher);

  const {
    data: inventoryOverviewData,
  } = useSWR(inventory_overview_url, get_fetcher);
  
  // console.log(inventoryOverviewData)

  return (
    <React.Fragment>
      <DashboardContent
        inventoryOverview = {inventoryOverviewData}
        tableData={fetchedData}
        mutate={mutate}
        isLoading={isLoading}>
        {/* Render additional components or content here */}
      </DashboardContent>
    </React.Fragment>
  );
}

export default withAuth(Dashboard);
