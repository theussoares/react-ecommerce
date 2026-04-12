import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description?: string;
}

export function PageMeta({ title, description }: Props) {
  const fullTitle = `${title} | ShopLens`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
}
