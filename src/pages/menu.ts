import { SITE_CONFIG } from '../utils/config';
import { MENU_CATEGORIES } from '../utils/menu';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateMenuSchema, generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations, initDragScroll } from '../utils/animations';
import { openLightbox } from '../utils/lightbox';

const config = SITE_CONFIG;
const PDF_MENU_URL = '/images/menu-pages/menu%20butsaba.pdf';

const signatureDishes = new Set([
  'wagyu fillet steak 250g',
  'truffle',
  'pescatore',
  'tuna tataki',
  'tom yam kung (spicy shrimp soup)',
  'spaghetti burrata',
  'burrata with parma ham',
]);

// Map menu item names (lowercase) → image filename (without extension)
const MENU_IMAGE_MAP: Record<string, string> = {
  'chili meat potato with cheese': 'Chili Meat  Potato  with cheese\u200B',
  'smoked salmon avocado salad': 'Smoked Salmon  Avocado Salad',
  'lemon flavored seafood salad': 'Lemon Flavored Seafood Salad',
  'garlic balsamic mushrooms': 'Garlic Balsamic Mushrooms',
  'vegetable sticks with smoked salmon cream dip': 'Vegetable Sticks with Smoked Salmon Cream Dip',
  'tuna tataki': 'Tuna tataki',
  'caesar salad': 'Caesar Salad',
  'salmon carpaccio': 'Salmon Carpaccio',
  'burrata with parma ham': 'Burrata with Parma ham',
  'tomato mozzarella': 'Tomato Mozzarella',
  'roquette salad': 'Roquette salad',
  'cold pasta salad': 'Cold Pasta Salad',
  'stir-fried asparagus': 'Stir-fried Asparagus',
  'cheese mix': 'Cheese mix',
  'bread': 'Bread',
  'ham cheese wrap': 'Ham Cheese Wrap',
  'bruschetta': 'Bruschetta',
  'olive cheese': 'Olive cheese',
  'cheese and biscuit plate': 'Cheese and biscuit plate',
  'baked spinach cheeses': 'Baked spinach Cheeses',
  'fried chicken': 'Fried Chicken',
  'french fries': 'French Fries',
  'fried shrimps': 'Fried Shrimps',
  'potato cheese pie': 'Potato Cheese Pie',
  'spinach with butter': 'Spinach with Butter',
  'japanese rolled omelette': 'Japanese rolled Omelette',
  'assorted tempura': 'Assorted Tempura',
  'fried chicken (japanese style)': 'Fried Chicken (2)',
  'salmon sashimi': 'Salmon Sashimi',
  'edamame': 'Edamame',
  'tomato soup': 'Tomato Soup',
  'lobster soup': 'Lobster Soup',
  'mushrooms soup': 'Mushrooms Soup',
  'seafood soup': 'Seafood Soup',
  'pescatore': 'Pescatore',
  'carbonara': 'Carbonara',
  'penne arrabbiata': 'Penne Arrabbiata',
  'squid ink': 'Squid ink',
  'vongole': 'Vongole',
  'fettuccine mushrooms and truffle cream': 'Fettuccine mushrooms and truffle cream',
  'fusilli mushrooms and mozzarella': 'Fusilli mushrooms and mozzarella',
  'lasagna': 'Lasagna',
  'spaghetti burrata': 'Spaghetti burrata',
  'bolognese': 'Bolognese',
  'peperoncino': 'Peperoncino',
  'pesto genovese': 'Pesto Genovese',
  'spaghetti pad kee mao': 'Spaghetti pad Kee Mao',
  'scallops with butter': 'Scallops with Butter',
  'scallops stir-fried with spinach and butter': 'Scallops Stir-fried with Spinach and Butter',
  'seafood ajillo': 'Seafood Ajillo',
  'shrimp ajillo': 'Shrimp Ajillo',
  'vegetable ajillo': 'Vegetable Ajillo',
  'beef & ricotta zucchini rolls': 'Beef & Ricotta  Zucchini Rolls',
  'doryfish rice and spinach': 'Doryfish rice and spinach',
  'mussels with tomato sauce': 'Mussels with Tomato Sauce',
  'grilled beef with gravy sauce': 'Grilled beef with gravy sauce',
  'white fish with cream sauce': 'White Fish with Cream Sauce',
  'tuna tartare': 'Tuna tartare',
  'fried calamari': 'Fried calamari',
  'assorted sausages': 'Assorted Sausages',
  'fish with crab sauce': 'Fish with crab sauce',
  'margherita': 'Margherita',
  'four seasons': 'Four Seasons',
  'hawaiian': 'Hawaiian',
  'truffle': 'Truffle',
  'seafood': 'Seafood',
  'spicy sausage': 'Spicy Sausage',
  'salami': 'Salami',
  'prosciutto and cheese': 'Prosciutto and Cheese',
  'vegetable': 'Vegetable',
  'pepperoni': 'Pepperoni',
  'four cheese pizza': 'Four Cheese Pizza',
  'wagyu fillet steak 250g': 'Wagyu Fillet Steak 250g',
  'hamburg steak': 'Hamburg Steak',
  'roast beef': 'Roast Beef',
  'pork chop': 'Pork Chop',
  'pork rib bbq': 'Pork Rib BBQ',
  'salmon steak': 'Salmon Steak',
  'salmon steak with lemon cream sauce': 'SALMON STEAK WITH LEMON CREAM SAUCE',
  'salmon salad': 'Salmon Salad',
  'stir fried asparagus with shrimp': 'stir fried asparagus with shrimp',
  'stir-fried mixed vegetables': 'Stir-fried mixed vegetables',
  'deep fried sea bass with sweet and sour sauce': 'Deep fried sea bass with sweet and sour sauce',
  'three flavored seabass': 'Three flavored seabass',
  'seabass with fish sauce': 'with fish sauce',
  'seabass with tamarind sauce': 'Seabsss with tamarind sauce',
  'tom yam kung (spicy shrimp soup)': 'Tom Yam Kung',
  'pork spicy soup': 'pork spicy Soup',
  'tom kha kai (coconut chicken soup)': 'Tom Kha Kai',
  'steam seafood eggs': 'Steam seafood eggs',
  'cashew chicken': 'Cashew chicken',
  'deep fried shrimp': 'Deep Fried Shrimp',
  'soup (clear)': 'Soup',
  'sour curry with shrimp & cha-om egg': 'Sour Curry with Shrimp',
  'chicken green curry': 'Chicken Green',
  'stir-fried squid black ink': 'Stir-fried Squid black ink',
  'steamed squid with lemon': 'Steamed squid with lemon',
  'steamed seabass with lemon': 'Steamed seabass with lemon',
  'somtam thai': 'somtam thai',
  'somtam crab': 'Somtam crab',
  'somtam seafood': 'somtam soafood',
  'blue crab somtam': 'Blue Crab Somtam',
  'somtam shell': 'somtam shell',
  'yam shrimp lemongrass': 'yam Shrimp lemongrass',
  'yam seafood': 'yam Seafood',
  'yam blue crab': 'yam Blue Crab',
  'yam blue crab mango': 'yam Blue Crab Mango',
  'yam wounds seafood (glass noodle salad with minced pork)': 'yam wounds seafood',
  'yam salmon': 'yam Salmon',
  'fried chicken wings': 'fried chicken wings',
  'fried sun-dried fish': 'Fried sun-dried fish',
  'fried chicken tendons': 'Fried Chicken Tendons',
  'fried duckbill': 'Fried Duckbill',
  'stir-fried morning glory with chili paste': 'Stir-fried morning glory with chili paste',
  'shrimps in fish sauce': 'shrimps in fish sauce',
  'thai noodle seafood': 'thai noodle seafood',
  'shrimps in tamarind sauce': 'Shrimps in tamarind sauce',
  'stir-fried squid, salted egg': 'Stir-fried Squid,Salted Egg',
  'stir-fried crabs (deep fried soft shell crab)': 'Stir-fried crabs',
  'pad thai shrimps': 'Pad Thai Shrimps',
  'beef salad': 'Beef salad',
  'spicy salmon salad': 'Spicy Salmon Salad',
  'dry shrimps salad': 'Dry shrimps salad',
  'spicy tuna salad': 'Spicy Tuna Salad',
  'pork larb': 'Pork Larb',
  'larb moo tod (fried pork larb)': 'Larb moo tod',
  'oysters with condiments': 'Oysters with condiments',
  'fried sun-dried pork': 'Fried sun-dried pork',
  'fried cashewnuts': 'Fried Cashewnuts',
  'fried pork bones': 'Fried Pork Bones',
  'isaan grilled pork': 'Isaan grilled Pork',
  'lemon pork': 'Lemon Pork',
  'seafood basil': 'Seafood Basil',
  'seafood basil rice with fried egg': 'Seafood basil rice',
  'minced pork with basil': 'Minced pork with basil',
  'minced pork with basil rice with fried egg': 'Minced pork with basil rice',
  'fried rice pork': 'Fried rice',
  'fried rice shrimp': 'Fried rice',
  'fried rice crab': 'Fried rice',
  'steam rice': 'Steam rice',
  'beef tongue stew': 'Beef Tongue Stew',
  'sticky rice': 'sticky rice',
};

function getImageUrl(itemName: string): string | null {
  const key = itemName.toLowerCase();
  const filename = MENU_IMAGE_MAP[key];
  if (!filename) return null;
  return '/images/menu-items/' + encodeURIComponent(filename) + '.webp';
}

function renderMenuSections(): string {
  const italianIds = ['quick-dishes', 'salads', 'snacks-appetizers', 'japanese', 'soups', 'pasta', 'main-courses', 'pizza', 'steak-meat', 'seafood', 'specials'];
  const thaiIds = ['thai-soups', 'thai-dishes', 'somtam', 'yam', 'fried-vegetable', 'stir-fried', 'beef-pork-salads', 'pork-dishes', 'basil-dishes', 'fried-rice', 'beverages-extras'];

  const renderSection = (cats: typeof MENU_CATEGORIES) => cats.map(cat => {
    return `
    <div class="menu-section" id="${cat.id}" data-category="${cat.id}">
      <h2>${cat.emoji ? `<span class="menu-emoji">${cat.emoji}</span>` : ''}${cat.label}</h2>
      ${cat.note ? `<p class="menu-note">${cat.note}</p>` : ''}
      <div class="menu-items-grid">
        ${cat.items.map(item => {
          const isSig = signatureDishes.has(item.name.toLowerCase());
          const imgUrl = getImageUrl(item.name);
          return `
          <div class="mi-card${isSig ? ' mi-card--sig' : ''}${imgUrl ? ' mi-card--has-img' : ''}" data-name="${item.name.toLowerCase()}">
            ${imgUrl ? `<div class="mi-card-img" data-src="${imgUrl}"><img src="${imgUrl}" alt="${item.name}" loading="lazy" decoding="async" width="400" height="300"></div>` : '<div class="mi-card-img mi-card-placeholder"><img src="/assets/images/logo.svg" alt="" class="mi-placeholder-logo"></div>'}
            <div class="mi-card-body">
              <div class="mi-card-name">${item.name}${isSig ? '<span class="mi-sig-badge">★ Signature</span>' : ''}</div>
              ${item.code ? `<div class="mi-card-code">#${item.code}</div>` : ''}
              <div class="mi-card-price">฿${item.price}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  }).join('');

  const italianCats = MENU_CATEGORIES.filter(c => italianIds.includes(c.id));
  const thaiCats = MENU_CATEGORIES.filter(c => thaiIds.includes(c.id));

  return `
    <div class="menu-cuisine-header animate-fade-up">
      <span class="menu-cuisine-icon">🇮🇹</span>
      <h3>Italian & International</h3>
      <div class="section-divider" style="margin: 0.5rem 0 0;"></div>
    </div>
    ${renderSection(italianCats)}

    <div class="cta-banner" style="margin: 2rem 0; border-radius: var(--radius-md); text-align:center;">
      <h2 style="font-size:1.5rem;margin-bottom:0.75rem;">🔥 2-Hour All-You-Can-Drink</h2>
      <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;margin-bottom:1rem;">
        <span style="background:rgba(255,255,255,0.15);padding:0.4rem 1rem;border-radius:2rem;font-size:0.875rem;font-weight:600;">🍺 Sun: 199 THB</span>
        <span style="background:rgba(255,255,255,0.15);padding:0.4rem 1rem;border-radius:2rem;font-size:0.875rem;font-weight:600;">✨ Other days: 399 THB</span>
        <span style="background:rgba(255,255,255,0.15);padding:0.4rem 1rem;border-radius:2rem;font-size:0.875rem;font-weight:600;">🍷 +200 THB for wine</span>
      </div>
      <p style="font-size:0.8rem;opacity:0.7;margin-bottom:1rem;">Beer, Whiskey, Shochu included · Add house wine for +200 THB</p>
      <a href="${config.social.line}" target="_blank" rel="noopener noreferrer" class="btn btn-accent">Reserve Now</a>
    </div>

    <div class="menu-cuisine-header animate-fade-up">
      <span class="menu-cuisine-icon">🇹🇭</span>
      <h3>Thai Cuisine</h3>
      <div class="section-divider" style="margin: 0.5rem 0 0;"></div>
    </div>
    ${renderSection(thaiCats)}
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <section class="hero hero-page" aria-label="Our Menu">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Our Menu</h1>
          <p>Italian &middot; Thai &middot; Japanese Fusion</p>
          <a href="${PDF_MENU_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="margin-top: 1rem;">
            📖 View Full PDF Menu
          </a>
        </div>
      </section>

      <nav class="category-nav" aria-label="Menu categories">
        <div class="category-nav-inner">
          ${MENU_CATEGORIES.map(cat => `
            <button class="category-pill" data-target="${cat.id}" aria-label="Jump to ${cat.label}">
              ${cat.emoji ? `${cat.emoji} ` : ''}${cat.label}
            </button>
          `).join('')}
        </div>
      </nav>

      <div class="container" id="menu-content">
        ${renderMenuSections()}

        <div style="text-align:center; padding: var(--space-8) 0 var(--space-4);">
          <p style="color: var(--color-text-muted); margin-bottom: var(--space-3); font-size: 1.125rem;">Want to see our full menu with all details?</p>
          <a href="${PDF_MENU_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 1.125rem; padding: 0.875rem 2.5rem; gap: 0.5rem;">
            📖 View Digital Menu Book (PDF)
          </a>
        </div>
      </div>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateMenuSchema()}</script>
    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Menu', url: '/menu.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initDragScroll('.category-nav');
  initMenuInteractions();
  initMenuImageLightbox();
});

function initMenuImageLightbox(): void {
  const cards = document.querySelectorAll<HTMLElement>('.mi-card--has-img');
  cards.forEach(card => {
    const imgDiv = card.querySelector('.mi-card-img') as HTMLElement | null;
    if (!imgDiv) return;
    imgDiv.style.cursor = 'pointer';
    imgDiv.addEventListener('click', () => {
      const src = imgDiv.getAttribute('data-src');
      if (src) openLightbox([src], 0);
    });
  });
}

function initMenuInteractions(): void {
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');
      if (targetId) {
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const sections = document.querySelectorAll('.menu-section');
  const pills = document.querySelectorAll('.category-pill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-category');
          pills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-target') === id);
          });
          const activePill = document.querySelector(`.category-pill[data-target="${id}"]`);
          activePill?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    },
    { threshold: 0.2, rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--total-header-height') || '104px'} 0px -60% 0px` }
  );

  sections.forEach(s => observer.observe(s));
}
