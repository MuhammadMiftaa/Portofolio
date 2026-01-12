import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // Only animate once for better performance
      easing: "ease-out-cubic",
      disable: "mobile", // Disable on mobile for better performance
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Muhammad Mifta - Backend Developer</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
