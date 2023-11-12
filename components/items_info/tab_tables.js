import BasicReactTable from "@/components/utility/tables/basicReactTable";
import CustomTabPanel from "../../components/utility/customTabPanel";

export function renderTabContent({
  tabIndex,
  tabValue,
  tabName,
  tabData,
  dataColumns,
  column_visibility,
  actionFormatter,
  tabMutate,
  tabLoading
}) {

  // console.log(tabData)
  // if (!tabData) {
  //   // Change to skeleton
  //   return <div>Loading...</div>;
  // }

  return (
    <CustomTabPanel value={tabValue} index={tabIndex}>
      {/* <h2>{tabName}</h2> */}
      <BasicReactTable
        data_columns={dataColumns}
        column_visibility={column_visibility}
        fetched_data={tabData}
        action_formatter={actionFormatter}
        mutate={tabMutate}
        isLoading={tabLoading}
      />
    </CustomTabPanel>
  );
}
