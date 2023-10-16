import BasicReactTable from "@/components/utility/tables/basicReactTable";
import CustomTabPanel from "../../components/utility/customTabPanel";

export function renderTabContent({
  tabIndex,
  tabValue,
  tabName,
  tabData,
  dataColumns,
  actionFormatter,
  tabMutate,
}) {
  // if (itemsError) {
  //   return <div>Error: {itemsError.message}</div>;
  // }

  if (!tabData) {
    return <div>Loading...</div>;
  }

  return (
    <CustomTabPanel value={tabValue} index={tabIndex}>
      {/* <h2>{tabName}</h2> */}
      <BasicReactTable
        data_columns={dataColumns}
        fetched_data={tabData}
        action_formatter={actionFormatter}
        mutate={tabMutate}
      />
    </CustomTabPanel>
  );
}
