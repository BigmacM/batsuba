# BUTSABA Wine & Cafe — Website

Production-ready, SEO-optimized multi-page website for **BUTSABA Wine & Cafe**, a fine dining Italian-Thai-Japanese fusion restaurant and wine bar in Pattaya, Thailand.

## Tech Stack

- **TypeScript** + **Vite** (vanilla — no React/Vue/Angular)
- **Pure CSS** with CSS custom properties
- **CSS animations** + Intersection Observer API

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── CONFIG.ts              ← Business data (single source of truth)
├── MENU_DATA.ts           ← Menu items and prices
├── AI_GUARDRAILS.md       ← Brand rules and content guidelines
├── src/
│   ├── utils/             ← Config re-exports, SEO helpers
│   ├── components/        ← Header, footer, schema, tracking
│   ├── pages/             ← Page scripts (home, about, menu, etc.)
│   └── styles/            ← CSS design system
├── public/                ← HTML pages and static assets
└── dist/                  ← Build output (gitignored)
```

## Updating Business Data

All business information is centralized in **`CONFIG.ts`**:

- **Brand info**: Name, tagline, description
- **Locations**: Addresses, phone numbers, hours, coordinates
- **Social media**: Facebook, Instagram URLs
- **Tracking**: Google Tag Manager, Analytics, Meta Pixel IDs
- **SEO**: Site URL, default titles, descriptions, keywords
- **Promotions**: All You Can Drink pricing

To update any business detail, edit `CONFIG.ts` — all pages will automatically reflect the change.

### Menu Updates

Menu items and prices are in **`MENU_DATA.ts`**. Update this file to add, remove, or change menu items. The menu page renders all data dynamically.

### Tracking Setup

Before deploying, update the tracking IDs in `CONFIG.ts`:

```typescript
tracking: {
  googleTagManagerId: "GTM-XXXXXXX",    // Replace with real GTM ID
  googleAnalyticsId: "G-XXXXXXXXXX",     // Replace with real GA4 ID
  metaPixelId: "XXXXXXXXXXXXXXXX",       // Replace with real Meta Pixel ID
}
```

Placeholder IDs (containing `XXXXXXX`) are automatically skipped.

## Deployment

Build output goes to `dist/`. Deploy to Vercel:

```bash
npm run build
# Deploy the dist/ folder
```

A `vercel.json` is included with URL rewrites and security headers.

## Pages

1. **Home** (`index.html`) — Hero, featured dishes, promotions, locations
2. **About** (`about.html`) — Brand story, philosophy, recognition
3. **Menu** (`menu.html`) — Interactive menu with search and category navigation
4. **Gallery** (`gallery.html`) — Filterable photo gallery with lightbox
5. **Locations** (`locations.html`) — Both locations with maps, hours, FAQ
6. **Contact** (`contact.html`) — Contact details and reservation form
