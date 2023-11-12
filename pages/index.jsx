import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid, TextField, Button, Container } from "@mui/material";
import { UserContext } from "@/contexts/userContext";
import LoadingScreen from "@/components/utility/skeletons/loading_screen";

export default function LandingPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check delay
    const delay = setTimeout(() => {
      setIsLoading(false);

      // Check if user is not authenticated and redirect to "/login"
      const isAuthenticated = user.userCrendentials != null;
      if (!isAuthenticated) {
        router.replace('/login');
      }
    }, 2000); // Simulating a 2-second delay

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
}
