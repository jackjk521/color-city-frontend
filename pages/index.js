
// Components
import DashboardContent from "@/components/dashboard/dashboardContent";
import withAuth from "@/components/utility/with_auth";

function Dashboard() { // Landing page
  return (
    <DashboardContent>
          {/* <BasicTable/> */}
    </DashboardContent>
  );
}
export default withAuth(Dashboard)
