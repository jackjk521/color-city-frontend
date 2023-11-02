import React, { useContext, useEffect } from "react";
import DashboardContent from "@/components/dashboard/dashboardContent";
import withAuth from "@/components/utility/with_auth";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/router";

function Dashboard() {
  return (
    <React.Fragment>
      <DashboardContent>
        {/* Render additional components or content here */}
      </DashboardContent>
    </React.Fragment>
  );
}

export default withAuth(Dashboard);
