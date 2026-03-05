import { SITE_CONFIG } from './config';

export function generateMetaTags(page: {
  title: string;
  description: string;
  path: string;
  type?: string;
}): string {
  const config = SITE_CONFIG.seo;
  const url = `${config.siteUrl}${page.path}`;

  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <meta name="keywords" content="${config.keywords.join(', ')}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="${page.type || 'website'}">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:image" content="${config.siteUrl}${config.ogImage}">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="${config.siteName}">
    <meta property="og:locale" content="${config.locale}">
    <meta name="twitter:card" content="${config.twitterCard}">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.description}">
    <meta name="twitter:image" content="${config.siteUrl}${config.ogImage}">
  `;
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_CONFIG.seo.siteUrl}${item.url}`,
    })),
  };
  return JSON.stringify(schema);
}
