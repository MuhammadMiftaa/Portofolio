import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultMeta = {
  title: "Muhammad Mifta - Backend Developer",
  description:
    "Muhammad Mifta - Backend Developer Portfolio. Experienced in React, Next.js, Golang, and modern web technologies.",
  keywords:
    "Muhammad Mifta, Backend Developer, Web Developer, React, Next.js, Golang, Portfolio, Software Engineer, Indonesia",
  image: "https://miv.best/profile-picture.jpg",
  url: "https://miv.best",
  type: "website",
};

export default function SEO({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = defaultMeta.type,
}: SEOProps) {
  const fullTitle =
    title === defaultMeta.title ? title : `${title} | Muhammad Mifta`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Head>
  );
}
