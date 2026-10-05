import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/site";

type Props = { title: string; description: string; path: string; noindex?: boolean };

export function Seo({ title, description, path, noindex }: Props) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const image = `${SITE_URL}/og-image.png`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
