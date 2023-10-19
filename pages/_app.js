import "../styles/globals.css";
import "../styles/main_styles.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Components
import Layout from "../components/layout";
import LoginLayout from "../components/login_layout";
import { UserProvider } from "@/contexts/userContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isLoginPage = router.pathname === "/login";

  const validPaths = [
    "/",
    "/branches",
    "/users",
    "/items",
    "/items_info",
    "/users",
  ];
  const isPathExist = !isLoginPage && validPaths.includes(router.asPath);

  useEffect(() => {
    if (!isPathExist) {
      router.replace("/login");
    }
  }, [router.pathname]);

  return (
    <>
      <UserProvider>
        {isPathExist ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        )}
      </UserProvider>
    </>
  );
}
