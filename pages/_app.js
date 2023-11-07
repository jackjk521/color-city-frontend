import "../styles/globals.css";
import "../styles/main_styles.css";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

// Components
import Layout from "../components/layout";
import LoginLayout from "../components/login_layout";
import { UserProvider } from "@/contexts/userContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const validPaths = [
    "/dashboard",
    "/branches",
    "/users",
    "/items",
    "/items_info",
    "/users",
    "/inventory",
    "/supplier_orders",
    "/branch_orders",
  ];
  const isPathExist = validPaths.includes(router.asPath);

  useEffect(() => {
    if (!isPathExist) {
      router.replace("/");
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
