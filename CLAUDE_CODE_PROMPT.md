# CLAUDE CODE PROMPT — BUTSABA Wine & Cafe Website

## YOUR ROLE
You are an expert full-stack web developer building a production-ready, SEO-optimized multi-page website for **BUTSABA Wine & Cafe**, a fine dining Italian-Thai-Japanese fusion restaurant and wine bar in Pattaya, Thailand.

**BEFORE WRITING ANY CODE**, read the following files completely:
1. `AI_GUARDRAILS.md` — Brand rules, content rules, what you must never do
2. `CONFIG.ts` — All business data, NAP, tracking IDs (single source of truth)
3. `MENU_DATA.ts` — Complete menu with all categories and prices

---

## TECH STACK

- **Languages:** TypeScript, HTML5, CSS3, JavaScript (ES2022+)
- **Runtime:** Node.js 20+
- **Build tool:** Vite (with TypeScript support)
- **Styling:** Pure CSS with CSS custom properties (no Tailwind, no heavy frameworks)
- **Animations:** CSS animations + Intersection Observer API (no GSAP unless lightweight)
- **No React/Vue/Angular** — vanilla TypeScript rendered to HTML
- **Package manager:** npm

---

## PROJECT STRUCTURE

```
butsaba-website/
├── AI_GUARDRAILS.md          ← Already exists — do not modify
├── CONFIG.ts                  ← Already exists — source of truth
├── MENU_DATA.ts               ← Already exists — do not modify prices
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
├── README.md
│
├── src/
│   ├── utils/
│   │   ├── config.ts          ← Re-exports CONFIG.ts
│   │   ├── menu.ts            ← Re-exports MENU_DATA.ts
│   │   └── seo.ts             ← SEO helper: generates meta tags, schemas
│   │
│   ├── components/
│   │   ├── header.ts          ← Sticky nav with mobile hamburger
│   │   ├── footer.ts          ← Footer with NAP, social, hours
│   │   ├── schema.ts          ← All JSON-LD schema generators
│   │   └── tracking.ts        ← Injects GTM, Meta Pixel from CONFIG
│   │
│   └── pages/
│       ├── home.ts
│       ├── about.ts
│       ├── menu.ts
│       ├── gallery.ts
│       ├── locations.ts
│       └── contact.ts
│
├── public/
│   ├── index.html             ← Home
│   ├── about.html
│   ├── menu.html
│   ├── gallery.html
│   ├── locations.html
│   ├── contact.html
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── 404.html
│   └── assets/
│       ├── images/
│       │   ├── logo.svg
│       │   ├── favicon.ico
│       │   └── og-image.jpg   ← placeholder
│       └── fonts/
│
└── dist/                      ← Vite build output (gitignored)
```

---

## PAGES TO BUILD

### 1. `index.html` — Home Page
**Title:** `BUTSABA Wine & Cafe — Fine Dining & Wine Bar in Pattaya`

Sections (in order):
- **Hero:** Full-viewport section. Headline: "Where Fine Dining Meets Elegant Wine". Subheadline: tagline from CONFIG. Two CTAs: "Explore Our Menu" (→ menu.html) and "Book a Table" (→ contact.html#reservation). Background: dark overlay on a rich food/wine image placeholder. Subtle parallax scroll animation.
- **About Snippet:** 2-column layout. Left: short brand story (elegant, authentic, Pattaya's finest). Right: key stats (200+ wines, 2 locations, 4.7★ Google). Fade-in on scroll.
- **Featured Dishes:** Horizontal scrolling card strip showing ~6 signature dishes pulled from MENU_DATA (Wagyu Steak 890 THB, Truffle Pizza 380 THB, Pescatore 350 THB, Tuna Tataki 490 THB, Tom Yam Kung 290 THB, Spaghetti Burrata 420 THB). Each card: dish name, price, category badge.
- **All You Can Drink Banner:** Full-width CTA banner. "All You Can Drink — 499 THB / 2 Hours. Available Daily at Both Locations." Burgundy background, gold text.
- **Cuisine Highlights:** 3 icons: 🇮🇹 Italian Fine Dining, 🇹🇭 Thai Classics, 🍣 Japanese Fusion. Brief description under each.
- **Reviews Strip:** Static review cards with star ratings (use real review sentiments from AI_GUARDRAILS).
- **Locations Teaser:** Two location cards side by side with address, phone, hours, and "Get Directions" button.
- **Instagram Strip:** Placeholder grid of 6 squares linking to Instagram.

**Schema:** Restaurant (primary), LocalBusiness (both locations), BreadcrumbList

---

### 2. `about.html` — About Us
**Title:** `About Us | BUTSABA Wine & Cafe — Pattaya`

Sections:
- **Hero banner:** "Our Story" heading over a dark atmospheric background
- **Story section:** 2-column. Left: brand narrative about authentic Italian dining in Pattaya, wine passion, welcoming atmosphere. Right: image placeholder. Use elegant prose — no bullet points in content copy.
- **Our Philosophy:** 3 pillars with icons: Authentic Ingredients, Expert Wine Curation, Impeccable Service.
- **Wine Collection:** Highlight the 200+ bottle collection. Mention wine pairing availability.
- **Team section:** Placeholder for staff/chef — "Our team of Italian and Thai-trained chefs..."
- **Awards/Recognition strip:** Google rating 4.7★, TripAdvisor #4 in Nong Prue, Facebook 86% recommend.

**Schema:** Restaurant, AboutPage, BreadcrumbList

---

### 3. `menu.html` — Interactive Menu ⭐ (MOST IMPORTANT)
**Title:** `Menu | BUTSABA Wine & Cafe — Italian, Thai & Japanese Fusion`

**Layout:**
- Top hero: "Our Menu" with subtitle "Italian · Thai · Japanese Fusion"
- **Category Navigation Bar:** Horizontally scrollable pill/tab bar at the TOP (sticky below main nav) with all category names. Clicking a tab smoothly scrolls to that section and highlights the active tab. On mobile this bar is swipe-scrollable.
- **Menu Sections:** Each category rendered as a full section with:
  - Category heading (with emoji) and optional note (e.g., pasta noodle options)
  - Grid of menu item cards: item name, item code (if available, shown small), price in THB
  - Cards have a subtle hover effect (lift + shadow)
- **Search bar:** Above the category nav — real-time filter that searches across all items
- **All You Can Drink** banner between Italian and Thai sections
- Smooth scroll behavior throughout

**Implementation details:**
- Pull all data from `MENU_DATA.ts` — render dynamically in TypeScript
- Use `IntersectionObserver` to highlight the active category in the nav as user scrolls
- Price always formatted as `฿XXX`
- Category nav scrolls horizontally on mobile (CSS `overflow-x: auto`, hide scrollbar)

**Schema:** Menu, MenuSection, MenuItem (for top dishes), BreadcrumbList

---

### 4. `gallery.html` — Gallery
**Title:** `Gallery | BUTSABA Wine & Cafe — Pattaya`

Sections:
- **Hero:** "A Taste of BUTSABA"
- **Masonry/grid gallery:** 12 placeholder image slots organized into tabs: "Food", "Wine", "Atmosphere", "Pizza". Use CSS grid masonry layout. Clicking an image opens a lightbox (pure CSS/JS, no library).
- **Instagram CTA:** "Follow us on Instagram @butsaba_wine_cafe" with link.

**Schema:** ImageGallery, BreadcrumbList

---

### 5. `locations.html` — Our Locations
**Title:** `Locations | BUTSABA Wine & Cafe — Pattaya`

Sections:
- **Hero:** "Find Us in Pattaya"
- **Two Location Cards** (side by side on desktop, stacked on mobile). Each card:
  - Location name and area
  - Full address (NAP from CONFIG — never hardcode)
  - Phone (click-to-call `tel:` link)
  - Email
  - Opening hours
  - "Get Directions" button → Google Maps URL from CONFIG
  - Google rating badge
- **Embedded Map placeholders:** Two `<iframe>` placeholders with note "Replace src with Google Maps embed URL"
- **Hours Table:** Both locations, daily 5:00 PM – 2:00 AM
- **FAQ section:** "Is parking available?" "Are reservations required?" "Do you allow dogs?" — answer from AI_GUARDRAILS data

**Schema:** LocalBusiness (×2 with full address), BreadcrumbList, FAQPage

---

### 6. `contact.html` — Contact
**Title:** `Contact | BUTSABA Wine & Cafe — Pattaya`

Sections:
- **Hero:** "Get In Touch"
- **Contact Grid:** Two columns
  - Left: Contact details (phone both locations, email, social links) — all from CONFIG
  - Right: Reservation inquiry form. Fields: Name, Email, Phone, Preferred Location (dropdown: Location 1 / Location 2), Date, Time, Party Size, Message. Submit button.
  - Form is HTML only (no backend) — on submit show a thank-you message and hint to call for confirmation
- **Social Media Links:** Facebook, Instagram with icons
- **Opening Hours reminder**

**Schema:** ContactPage, BreadcrumbList

---

## SHARED COMPONENTS

### Header (`src/components/header.ts`)
- Logo left, nav links right: Home | About | Menu | Gallery | Locations | Contact
- Active page highlighted
- Sticky on scroll with slight background blur (`backdrop-filter`)
- Mobile: hamburger menu with smooth slide-down nav
- "Reserve" CTA button in nav (burgundy)

### Footer (`src/components/footer.ts`)
- 4 columns: Brand (logo + tagline), Quick Links, Location 1 NAP, Location 2 NAP
- Bottom bar: © 2025 BUTSABA Wine & Cafe | All rights reserved
- Social icons
- All NAP data from CONFIG — never hardcode

### Tracking (`src/components/tracking.ts`)
- On page load, inject Google Tag Manager `<script>` and `<noscript>` using `SITE_CONFIG.tracking.googleTagManagerId`
- Inject Meta Pixel script using `SITE_CONFIG.tracking.metaPixelId`
- If IDs contain "XXXXXXX" (placeholder), skip injection and log a console warning
- Export `initTracking()` — called from every page's `<head>`

---

## SEO REQUIREMENTS

### Every HTML page MUST include:
```html
<!-- In <head> -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Page Title from CONFIG template]</title>
<meta name="description" content="[Page-specific description, max 160 chars]">
<meta name="keywords" content="[From CONFIG.seo.keywords]">
<link rel="canonical" href="[Full URL]">

<!-- Open Graph -->
<meta property="og:type" content="restaurant">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="[CONFIG.seo.ogImage]">
<meta property="og:url" content="...">
<meta property="og:site_name" content="BUTSABA Wine & Cafe">
<meta property="og:locale" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">

<!-- JSON-LD Schema -->
<script type="application/ld+json">...</script>
```

### `sitemap.xml`
Generate with all 6 pages. Priority: home=1.0, menu=0.9, others=0.8. Changefreq: weekly.

### `robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://batsuba.com/sitemap.xml
```

---

## DESIGN SYSTEM

### Colors (CSS custom properties in `:root`)
```css
--color-primary: #6B1B2A;       /* Deep burgundy */
--color-primary-dark: #4A1020;
--color-primary-light: #8B2535;
--color-gold: #C9A84C;          /* Gold accent */
--color-gold-light: #E8C97A;
--color-cream: #F5F0E8;         /* Background cream */
--color-white: #FFFFFF;
--color-black: #0D0D0D;
--color-gray-dark: #2C2C2C;
--color-gray-mid: #666666;
--color-gray-light: #CCCCCC;
--color-text: #1A1A1A;
--color-text-muted: #666666;
```

### Typography
- **Headings:** `'Playfair Display', Georgia, serif` — load from Google Fonts
- **Body:** `'Lato', system-ui, sans-serif` — load from Google Fonts
- **Accent/prices:** `'Lato', monospace`

### Spacing
Use an 8px base grid. Use `rem` for all sizing. Base font: 16px.

### Animations (must be present)
- **Fade in up:** Elements entering viewport via IntersectionObserver (`.animate-fade-up` class, `translateY(30px) → 0`, `opacity: 0 → 1`, 0.6s ease)
- **Parallax hero:** CSS `background-attachment: fixed` on hero sections
- **Menu card hover:** `transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.15)`
- **Nav underline:** Sliding underline on active nav item
- **Page transitions:** Subtle fade on page load (`body` fades in over 0.3s)
- **Sticky header:** Adds `backdrop-filter: blur(10px)` and slight shadow after 80px scroll

### Responsive breakpoints
```css
/* Mobile first */
/* sm */ @media (min-width: 640px) {}
/* md */ @media (min-width: 768px) {}
/* lg */ @media (min-width: 1024px) {}
/* xl */ @media (min-width: 1280px) {}
```

---

## IMAGE PLACEHOLDERS
Since real photos aren't provided, use elegant CSS placeholders:
- Hero backgrounds: dark gradient `linear-gradient(135deg, #4A1020 0%, #6B1B2A 50%, #2C1510 100%)`
- Food card placeholders: aspect-ratio boxes with the dish name and a subtle pattern
- Add HTML comments: `<!-- TODO: Replace with actual photo of [description] -->`

---

## PERFORMANCE REQUIREMENTS
- Lazy load all images (`loading="lazy"`)
- Preload LCP image in `<head>`
- Minify CSS/JS via Vite build
- Use `font-display: swap` for Google Fonts
- No render-blocking scripts (all `defer` or `async`)
- Target Lighthouse score: 90+ Performance, 100 SEO, 95+ Accessibility

---

## ACCESSIBILITY
- All images: descriptive `alt` text
- All interactive elements: keyboard navigable
- Color contrast ratio: 4.5:1 minimum
- ARIA labels on nav, buttons, form fields
- `lang="en"` on `<html>`
- Skip-to-main-content link

---

## BUILD & DEPLOY INSTRUCTIONS

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Vite outputs to `dist/` — deploy this folder to Vercel.

**Vercel config (`vercel.json`):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/$1.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## FINAL CHECKLIST (verify before finishing)

- [ ] All 6 pages built and linked correctly
- [ ] All NAP data sourced from CONFIG.ts — zero hardcoded phone/address
- [ ] All menu data sourced from MENU_DATA.ts — zero hardcoded prices
- [ ] JSON-LD schema on every page
- [ ] sitemap.xml and robots.txt present
- [ ] Mobile responsive on all pages
- [ ] Animations working (fade-in, parallax, hover)
- [ ] Interactive menu with sticky category nav and search
- [ ] Tracking injection from CONFIG (GTM + Meta Pixel)
- [ ] Lighthouse SEO score target: 100
- [ ] All images have alt text
- [ ] No console errors
- [ ] `vercel.json` present
- [ ] `.env.example` documents any environment variables
- [ ] `README.md` explains how to update CONFIG.ts

---

## START BUILDING

Begin with:
1. `package.json` and `vite.config.ts`
2. `src/utils/config.ts` and `src/utils/menu.ts` (re-export the provided files)
3. Shared CSS design system (`src/styles/main.css`)
4. Header and footer components
5. Then build each page in order: Home → About → Menu → Gallery → Locations → Contact
6. Finally: sitemap.xml, robots.txt, vercel.json, README.md
