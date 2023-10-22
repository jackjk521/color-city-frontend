import React from "react";
import DashboardContent from "@/components/dashboard/dashboardContent";
import withAuth from "@/components/utility/with_auth";

function Dashboard() {
  return (
    <DashboardContent>
      {/* Render additional components or content here */}
    </DashboardContent>
  );
}

export default withAuth(Dashboard);
