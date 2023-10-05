import "../styles/globals.css";
import "../styles/main_styles.css";

// Components
import Layout from "../components/layout";
import { ManagedUIProvider } from "../contexts/managedUIProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ManagedUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIProvider>
    </>
  );
}
