import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { UserContext } from "@/contexts/userContext";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const isAuthenticated = !!user; // Check if userCredentials exist

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, router]);

    useEffect(() => {
      const revalidationTimeout = setTimeout(() => {
        !isAuthenticated ?  router.replace("/login") : user
      }, 10000); // Revalidate every 10 seconds (adjust the time interval as needed)

      return () => {
        clearTimeout(revalidationTimeout);
      };
    }, [user]);

    return isAuthenticated ? (
      <Component {...props} userCredentials={user?.userCredentials} />
    ) : null;
  };
}