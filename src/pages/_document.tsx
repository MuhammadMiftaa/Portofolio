import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Muhammad Mifta" />
        <meta
          name="description"
          content="Muhammad Mifta - Backend Developer Portfolio. Experienced in React, Next.js, Golang, and modern web technologies."
        />
        <meta
          name="keywords"
          content="Muhammad Mifta, Backend Developer, Web Developer, React, Next.js, Golang, Portfolio, Software Engineer"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://miv.best/" />
        <meta
          property="og:title"
          content="Muhammad Mifta - Backend Developer"
        />
        <meta
          property="og:description"
          content="Backend Developer Portfolio. Experienced in React, Next.js, Golang, and modern web technologies."
        />
        <meta
          property="og:image"
          content="https://miv.best/profile-picture.jpg"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Muhammad Mifta Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://miv.best/" />
        <meta
          name="twitter:title"
          content="Muhammad Mifta - Backend Developer"
        />
        <meta
          name="twitter:description"
          content="Backend Developer Portfolio. Experienced in React, Next.js, Golang, and modern web technologies."
        />
        <meta
          name="twitter:image"
          content="https://miv.best/profile-picture.jpg"
        />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://miv.best/" />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
