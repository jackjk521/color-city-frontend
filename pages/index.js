import Head from "next/head";
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
// import styles from "../styles/Home.module.css";

// Material UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Components
// import Dashboard from "../components/dashboard";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#FFFFF" }}>
      <Head>
        <title>Portfolio Website</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Dashboard /> */}
    </Box>
  );
}
