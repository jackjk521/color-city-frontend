import * as React from "react";
import OverviewComponent from "./overviewComponent";
import OrdersOverview from "./ordersOverview";
import InventoryOverview from "./inventoryOverview";

export default function DashboardContent({
  inventoryOverview,
  tableData,
  mutate,
  isLoading,
}) {

  // console.log(inventoryOverview)
  return (
    <React.Fragment>
      <OverviewComponent />
      {tableData && (
        <OrdersOverview
          tableData={tableData}
          mutate={mutate}
          isLoading={isLoading}
        />
      )}

      <InventoryOverview inventoryOverview={inventoryOverview} />
    </React.Fragment>
  );
}
