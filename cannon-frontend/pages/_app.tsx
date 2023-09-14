import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="author" content="Team Cannon"/>
        <title> Cannon Tests </title>
        <meta name='description' content={"Run Geodistributed tests using K6 and Azure"} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
