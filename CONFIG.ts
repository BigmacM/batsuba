// ============================================================
// CONFIG.ts — BUTSABA Wine & Cafe
// SINGLE SOURCE OF TRUTH for all business info, tracking IDs,
// and meta tags. Update this file ONLY to change business data.
// ============================================================

export const SITE_CONFIG = {

  // ── BRAND ──────────────────────────────────────────────────
  brand: {
    name: "BUTSABA Wine & Cafe",
    nameThai: "บุษบา ไวน์&คาเฟ่",
    tagline: "Where fine dining meets elegant wine atmosphere",
    description:
      "BUTSABA Wine & Cafe is Pattaya's premier Italian fine dining restaurant and wine bar, offering authentic Italian, Thai, and Japanese fusion cuisine with 200+ curated wines.",
    cuisine: ["Italian", "Thai", "Japanese Fusion"],
    priceRange: "฿฿",         // ฿ = budget, ฿฿฿฿ = luxury
    logoPath: "/assets/images/logo.svg",
    faviconPath: "/assets/images/favicon.ico",
  },

  // ── LOCATIONS (NAP) ────────────────────────────────────────
  locations: [
    {
      id: "location-1",
      label: "Original — Tree Town Pattaya",
      address: {
        street: "502, 57",
        city: "Pattaya City",
        district: "Bang Lamung",
        province: "Chon Buri",
        postalCode: "20150",
        country: "Thailand",
        countryCode: "TH",
        full: "502, 57, Pattaya City, Bang Lamung District, Chon Buri 20150, Thailand",
      },
      coordinates: {
        lat: 12.9236,   // approximate — update with exact coords
        lng: 100.8825,
      },
      phone: "+66832401081",
      phoneFormatted: "+66 83 240 1081",
      email: "Butsadaauttar@gmail.com",
      hours: {
        open: "17:00",
        close: "02:00",
        days: "Daily",
        display: "5:00 PM – 2:00 AM",
      },
      googleMapsUrl: "https://maps.google.com/?q=BUTSABA+Wine+Cafe+Pattaya", // update with exact URL
      googleRating: 4.7,
      googleReviewCount: 142,
    },
    {
      id: "location-2",
      label: "Branch — Near Aya Boutique Hotel",
      address: {
        street: "555, Moo 9",
        city: "Muang Pattaya",
        district: "Bang Lamung",
        province: "Chon Buri",
        postalCode: "20150",
        country: "Thailand",
        countryCode: "TH",
        full: "555, near Aya Boutique Hotel, Moo 9, Muang Pattaya, Bang Lamung District, Chon Buri 20150, Thailand",
      },
      coordinates: {
        lat: 12.9271,   // approximate — update with exact coords
        lng: 100.8774,
      },
      phone: "+6638429610",
      phoneFormatted: "+66 38 429 610",
      email: "Butsadaauttar@gmail.com",
      hours: {
        open: "17:00",
        close: "02:00",
        days: "Daily",
        display: "5:00 PM – 2:00 AM",
      },
      googleMapsUrl: "https://maps.google.com/?q=BUTSABA+Wine+Cafe+Aya+Hotel+Pattaya", // update with exact URL
      googleRating: 4.4,
      googleReviewCount: 71,
    },
  ],

  // ── SOCIAL MEDIA ───────────────────────────────────────────
  social: {
    facebook: "https://web.facebook.com/people/%E0%B8%9A%E0%B8%B8%E0%B8%A9%E0%B8%9A%E0%B8%B2-%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C%E0%B8%84%E0%B8%B2%E0%B9%80%E0%B8%9F%E0%B9%88-Butsaba-WineCafe/61573732255850/",
    instagram: "https://www.instagram.com/butsaba_wine_cafe",
    instagramHandle: "@butsaba_wine_cafe",
    line: "https://line.me/R/ti/p/@butsaba",   // update with actual LINE ID
    tiktok: "",   // add if available
  },

  // ── TRACKING & ANALYTICS ───────────────────────────────────
  // ⚠️  FILL IN YOUR REAL IDs BEFORE DEPLOYING
  tracking: {
    googleTagManagerId: "GTM-M77MWLXR",
    googleAnalyticsId: "G-XXXXXXXXXX",        // e.g. G-ABC123DEF4
    metaPixelId: "XXXXXXXXXXXXXXXX",           // e.g. 1234567890123456
    googleSiteVerification: "",                // from Google Search Console
  },

  // ── SEO DEFAULTS ───────────────────────────────────────────
  seo: {
    siteName: "BUTSABA Wine & Cafe",
    siteUrl: "https://butsabawinecafe.com",  // update with real domain
    defaultTitle: "BUTSABA Wine & Cafe — Fine Dining & Wine Bar in Pattaya",
    titleTemplate: "%s | BUTSABA Wine & Cafe — Pattaya",
    defaultDescription:
      "Experience authentic Italian, Thai & Japanese fusion dining at BUTSABA Wine & Cafe, Pattaya's premier wine bar with 200+ wines. Open daily 5 PM – 2 AM.",
    keywords: [
      "Italian restaurant Pattaya",
      "wine bar Pattaya",
      "fine dining Pattaya",
      "Italian Thai fusion Pattaya",
      "best pizza Pattaya",
      "wagyu steak Pattaya",
      "restaurant Pattaya City",
      "BUTSABA wine cafe",
      "Tree Town Pattaya restaurant",
    ],
    ogImage: "/assets/images/og-image.jpg",  // 1200x630px
    locale: "en_US",
    twitterCard: "summary_large_image",
  },

  // ── PROMOTIONS ─────────────────────────────────────────────
  promotions: {
    allYouCanDrink: {
      label: "All You Can Drink",
      price: 499,          // THB — update if price changes
      duration: "2 hours",
      availability: "Daily at both locations",
    },
  },

};

export default SITE_CONFIG;
