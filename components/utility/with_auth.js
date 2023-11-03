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
        router.replace("/");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? (
      <Component {...props} userCredentials={user?.userCredentials} />
    ) : null;
  };
}