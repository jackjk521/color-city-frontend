import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { UserContext } from "@/contexts/userContext";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const isAuthenticated = user.userCredentials; // logic to check if user is authenticated

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated && <Component {...props} userCredentials={user.userCredentials} />;
  };
}