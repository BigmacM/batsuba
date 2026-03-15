import { SITE_CONFIG } from '../utils/config';
import { MENU_CATEGORIES } from '../utils/menu';

const config = SITE_CONFIG;

function locationSchema(locIndex: number): object {
  const loc = config.locations[locIndex];
  return {
    '@type': ['Restaurant', 'BarOrPub', 'Winery'],
    name: config.brand.name,
    alternateName: config.brand.nameThai,
    image: `${config.seo.siteUrl}${config.seo.ogImage}`,
    '@id': `${config.seo.siteUrl}/#${loc.id}`,
    url: config.seo.siteUrl,
    telephone: loc.phoneFormatted,
    email: loc.email,
    priceRange: config.brand.priceRange,
    servesCuisine: config.brand.cuisine,
    acceptsReservations: 'True',
    menu: `${config.seo.siteUrl}/menu.html`,
    hasMenu: `${config.seo.siteUrl}/menu.html`,
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
      bestRating: 5,
      worstRating: 1,
      reviewCount: loc.googleReviewCount,
    },
    sameAs: [
      config.social.facebook,
      config.social.instagram,
    ].filter(Boolean),
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

export function generateSingleLocationSchema(locIndex: number): string {
  const schema = {
    '@context': 'https://schema.org',
    ...locationSchema(locIndex),
  };
  return JSON.stringify(schema);
}

export function generateMenuSchema(): string {
  const menuSections = MENU_CATEGORIES.map(cat => ({
    '@type': 'MenuSection',
    name: cat.label,
    hasMenuItem: cat.items.map(item => ({
      '@type': 'MenuItem',
      name: item.name,
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'THB',
      },
      ...(item.note ? { description: item.note } : {}),
    })),
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${config.brand.name} Menu`,
    url: `${config.seo.siteUrl}/menu.html`,
    inLanguage: 'en',
    hasMenuSection: menuSections,
  };
  return JSON.stringify(schema);
}

export function generateOrganizationSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.brand.name,
    alternateName: config.brand.nameThai,
    url: config.seo.siteUrl,
    logo: `${config.seo.siteUrl}/assets/images/Batsuba_Logo_transparent.png`,
    image: `${config.seo.siteUrl}${config.seo.ogImage}`,
    description: config.brand.description,
    telephone: config.locations[0].phoneFormatted,
    email: config.locations[0].email,
    sameAs: [
      config.social.facebook,
      config.social.instagram,
    ].filter(Boolean),
    contactPoint: config.locations.map(loc => ({
      '@type': 'ContactPoint',
      telephone: loc.phoneFormatted,
      contactType: 'reservations',
      areaServed: 'TH',
      availableLanguage: ['English', 'Thai'],
    })),
  };
  return JSON.stringify(schema);
}

export function generateWebSiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.brand.name,
    alternateName: config.brand.nameThai,
    url: config.seo.siteUrl,
  };
  return JSON.stringify(schema);
}

export function generateReviewSchema(): string {
  const reviews = [
    {
      body: "Exceptional Italian food in the heart of Pattaya. The wine selection is outstanding and the atmosphere is perfect for a special evening.",
      source: "Google Review",
      rating: 5,
    },
    {
      body: "Best wood-fired pizza we've had in Thailand. The truffle pizza is a must-try. Great wine pairing recommendations from the staff.",
      source: "TripAdvisor Review",
      rating: 5,
    },
    {
      body: "A hidden gem in Pattaya. The fusion of Italian and Thai cuisine is done beautifully. The Wagyu steak was cooked to perfection.",
      source: "Google Review",
      rating: 5,
    },
  ];

  return reviews.map(r => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      reviewBody: r.body,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: {
        '@type': 'Person',
        name: r.source,
      },
      itemReviewed: {
        '@type': 'Restaurant',
        name: config.brand.name,
      },
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  }).join('\n');
}

export function generateImageGallerySchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${config.brand.name} Photo Gallery`,
    url: `${config.seo.siteUrl}/gallery.html`,
    description: `Photos of dishes, wine collection, and elegant atmosphere at ${config.brand.name} in Pattaya, Thailand.`,
    about: {
      '@type': 'Restaurant',
      name: config.brand.name,
    },
  };
  return JSON.stringify(schema);
}
