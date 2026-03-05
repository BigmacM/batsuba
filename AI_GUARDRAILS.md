# AI GUARDRAILS — BUTSABA Wine & Cafe Website

## PURPOSE
This file is the single source of truth for the Claude Code agent building and maintaining the BUTSABA Wine & Cafe website. The agent MUST refer back to this file before making any content, copy, or structural decisions. Do NOT invent, fabricate, or assume any business details not listed here.

---

## BUSINESS IDENTITY

- **Brand Name:** BUTSABA Wine & Cafe
- **Thai Name:** บุษบา ไวน์&คาเฟ่
- **Business Type:** Fine Dining Restaurant & Wine Bar
- **Cuisine:** Italian, Thai, Japanese Fusion
- **Tagline:** "Where fine dining meets elegant wine atmosphere"
- **Logo:** Circular burgundy logo with BUTSABA text
- **Brand Colors:** Burgundy / deep wine red, cream/ivory, black, gold accents
- **Brand Personality:** Sophisticated, elegant, welcoming, upscale

---

## LOCATIONS

### Location 1 — BUTSABA Wine & Cafe (Original)
- **Address:** 502, 57, Pattaya City, Bang Lamung District, Chon Buri 20150, Thailand
- **Area:** Tree Town Pattaya
- **Phone:** +66 83 240 1081
- **Email:** Butsadaauttar@gmail.com
- **Hours:** 5:00 PM – 2:00 AM (Daily, 7 days/week)
- **Google Rating:** 4.7/5 (142 reviews)
- **TripAdvisor Rank:** #4 of 22 restaurants in Nong Prue

### Location 2 — Butsaba Wine & Cafe (Branch)
- **Address:** 555, near Aya Boutique Hotel, Moo 9, Muang Pattaya, Bang Lamung District, Chon Buri 20150, Thailand
- **Nearby Landmark:** Aya Boutique Hotel
- **Area:** Muang Pattaya
- **Phone:** +66 38 429 610
- **Email:** Butsadaauttar@gmail.com
- **Hours:** 5:00 PM – 2:00 AM (Daily, 7 days/week)
- **Google Rating:** 4.4/5 (71 reviews)
- **TripAdvisor Pizza Rating:** 4.9/5
- **Price Range:** ฿200–400 per person

---

## SOCIAL MEDIA

- **Facebook:** บุษบา ไวน์& คาเฟ่ Butsaba Wine&Cafe
- **Instagram:** @butsaba_wine_cafe
- **Facebook Followers:** 428+
- **Instagram Followers:** 680+
- **Recommendation Rate:** 86%

---

## KEY FEATURES & USPs

- Wine collection: 200+ bottles
- Wood-fired pizza (authentic Italian style)
- Premium Wagyu steak
- Fusion of Italian, Thai, and Japanese cuisines
- Fine dining service standards
- All You Can Drink promotion: THB 499/person for 2 hours (daily)
- Dog-friendly outdoor seating at Location 2
- Thai and English speaking staff
- Outdoor seating available at Location 2

---

## MENU RULES

- All prices in Thai Baht (THB)
- Pasta noodle options: Penne, Spaghetti, Fettuccine
- Most expensive item: Wagyu Fillet Steak 250g — 890 THB
- Most affordable item: Fried egg — 20 THB
- Price range: 20 THB – 890 THB
- Do NOT invent menu items or prices — use only what is in `MENU_DATA.ts`

---

## CONTENT TONE GUIDELINES

- Use elegant, upscale language — avoid casual slang
- Highlight the wine & dining atmosphere
- Reference authentic Italian techniques (wood-fired oven)
- Mention Pattaya location to appeal to tourists and expats
- Keep descriptions concise and evocative
- Do NOT make health claims about food
- Do NOT fabricate awards or certifications not listed here

---

## SEO RULES

- Primary keyword: "Italian restaurant Pattaya"
- Secondary keywords: "wine bar Pattaya", "fine dining Pattaya", "Italian Thai fusion Pattaya", "best pizza Pattaya", "wagyu steak Pattaya"
- Local SEO: Always use full NAP (Name, Address, Phone) consistently across all pages
- Schema types required: Restaurant, LocalBusiness, Menu, BreadcrumbList, FAQPage (on FAQ sections)
- Meta descriptions must be under 160 characters
- Title tags: [Page] | BUTSABA Wine & Cafe — Pattaya

---

## PAGES REQUIRED

1. `index.html` — Home
2. `about.html` — About Us
3. `menu.html` — Interactive Menu
4. `gallery.html` — Gallery
5. `locations.html` — Our Locations
6. `contact.html` — Contact

---

## WHAT THE AGENT MUST NEVER DO

- Never invent phone numbers, addresses, or prices
- Never add pages or sections not requested
- Never change brand colors outside the defined palette
- Never remove schema markup
- Never break the mobile-responsive layout
- Never hardcode Google Tag / Meta Pixel IDs — always import from `CONFIG.ts`
- Never duplicate NAP data — always pull from `CONFIG.ts`
