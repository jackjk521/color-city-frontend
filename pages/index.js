import React, { useContext, useEffect } from "react";
import DashboardContent from "@/components/dashboard/dashboardContent";
import withAuth from "@/components/utility/with_auth";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Redirect to /login if userCredentials is empty or null
    if (!user.userCredentials) {
      router.replace("/login");
    }
  }, [router, user.userCredentials]);

  return (
    <React.Fragment>
      {user.userCredentials && (
        <DashboardContent>
          {/* Render additional components or content here */}
        </DashboardContent>
      )}
    </React.Fragment>
  );
}

export default withAuth(Dashboard);