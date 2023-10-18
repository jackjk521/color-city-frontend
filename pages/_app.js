import "../styles/globals.css";
import "../styles/main_styles.css";

// Components
import Layout from "../components/layout";
import LoginLayout from "../components/login_layout";
import { UserProvider } from "@/contexts/userContext";

export default function App({ Component, pageProps, router }) {
  const isLoginPage = router.pathname === "/login";

  return (
    <>
      <UserProvider>
        {!isLoginPage && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
        {isLoginPage && (
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        )}
      </UserProvider>
    </>
  );
}
