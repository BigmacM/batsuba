import { SITE_CONFIG } from '../utils/config';

const config = SITE_CONFIG;

function locationSchema(locIndex: number): object {
  const loc = config.locations[locIndex];
  return {
    '@type': 'Restaurant',
    name: config.brand.name,
    image: `${config.seo.siteUrl}${config.seo.ogImage}`,
    '@id': `${config.seo.siteUrl}/#${loc.id}`,
    url: config.seo.siteUrl,
    telephone: loc.phoneFormatted,
    email: loc.email,
    priceRange: config.brand.priceRange,
    servesCuisine: config.brand.cuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.province,
      postalCode: loc.address.postalCode,
      addressCountry: loc.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: loc.hours.open,
      closes: loc.hours.close,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: loc.googleRating,
      reviewCount: loc.googleReviewCount,
    },
  };
}

export function generateRestaurantSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    ...locationSchema(0),
  };
  return JSON.stringify(schema);
}

export function generateLocalBusinessSchemas(): string {
  return config.locations.map((_, i) => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      ...locationSchema(i),
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  }).join('\n');
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(schema);
}

export function generateMenuSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${config.brand.name} Menu`,
    url: `${config.seo.siteUrl}/menu.html`,
    hasMenuSection: [],
  };
  return JSON.stringify(schema);
}
