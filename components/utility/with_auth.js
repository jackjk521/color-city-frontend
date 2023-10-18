import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { UserContext } from "@/contexts/userContext";

export default function withAuth(Component) {

  return function ProtectedRoute({ ...props }) {
    const { userCredentials } = useContext(UserContext);
    const router = useRouter();
    const isAuthenticated = userCredentials; // logic to check if user is authenticated

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <Component {...props} userCredentials={userCredentials} /> : null;
  };
}
