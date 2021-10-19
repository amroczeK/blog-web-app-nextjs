import Head from "next/head";

export default function Metatags({
  title = "Blog Post Next.js Firebase Web App",
  description = "Blog post web application using Next.js and Firebase",
  image = "https://avatars.githubusercontent.com/u/18630966?v=4",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
