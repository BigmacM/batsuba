import { SITE_CONFIG } from '../utils/config';
import { MENU_CATEGORIES } from '../utils/menu';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateMenuSchema, generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations, initDragScroll } from '../utils/animations';

const config = SITE_CONFIG;

// Signature dishes to highlight with a badge
const signatureDishes = new Set([
  'wagyu fillet steak 250g',
  'truffle',
  'pescatore',
  'tuna tataki',
  'tom yam kung (spicy shrimp soup)',
  'spaghetti burrata',
  'burrata with parma ham',
]);

// All menu page images for the Digital Menu Book
const menuBookPages = [
  'Menu Cover.png',
  'Quick Dishes (1).png', 'Quick Dishes (2).png',
  'Salad (1).png', 'Salad (2).png',
  'Snack (1).png', 'Snack (2).png',
  'Soup.png',
  'Pasta (1).png', 'Pasta (2).png', 'Pasta (3).png', 'Pasta (4).png',
  'Secondo Piatto (1).png', 'Secondo Piatto (2).png', 'Secondo Piatto (3).png',
  'Pizza (1).png', 'Pizza (2).png',
  'Steak and Meat Dish (1).png', 'Steak and Meat Dish (2).png',
  'Seafood (1).png', 'Seafood (2).png', 'Seafood (3).png',
  'Recommended (1).png', 'Recommended (2).png',
  'Thai Soup (1).png', 'Thai Soup (2).png',
  'Thai Food  (1).png', 'Thai Food  (2).png',
  'Thai Food  (3).png', 'Thai Food  (4).png',
  'Thai Food  (5).png', 'Thai Food  (6).png',
  'Thai Food  (7).png', 'Thai Food  (8).png',
  'Thai Food  (9).png', 'Thai Food  (10).png',
];

function renderMenuSections(): string {
  const italianIds = ['quick-dishes', 'salads', 'snacks-appetizers', 'japanese', 'soups', 'pasta', 'main-courses', 'pizza', 'steak-meat', 'seafood', 'specials'];
  const thaiIds = ['thai-soups', 'thai-dishes', 'somtam', 'yam', 'fried-vegetable', 'stir-fried', 'beef-pork-salads', 'pork-dishes', 'basil-dishes', 'fried-rice', 'beverages-extras'];

  const renderSection = (cats: typeof MENU_CATEGORIES) => cats.map(cat => {
    return `
    <div class="menu-section" id="${cat.id}" data-category="${cat.id}">
      <h2>${cat.emoji ? `<span class="menu-emoji">${cat.emoji}</span>` : ''}${cat.label}</h2>
      ${cat.note ? `<p class="menu-note">${cat.note}</p>` : ''}
      <div class="menu-grid">
        ${cat.items.map(item => {
          const isSig = signatureDishes.has(item.name.toLowerCase());
          return `
          <div class="menu-item${isSig ? ' menu-item--featured' : ''}" data-name="${item.name.toLowerCase()}">
            <div class="menu-item-info">
              <div class="menu-item-name">${item.name}${isSig ? '<span class="menu-featured-badge">★ Signature</span>' : ''}</div>
              ${item.code ? `<div class="menu-item-code">#${item.code}</div>` : ''}
            </div>
            <div class="menu-item-price">฿${item.price}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  }).join('');

  const italianCats = MENU_CATEGORIES.filter(c => italianIds.includes(c.id));
  const thaiCats = MENU_CATEGORIES.filter(c => thaiIds.includes(c.id));

  return `
    <!-- Italian & International -->
    <div class="menu-cuisine-header animate-fade-up">
      <span class="menu-cuisine-icon">🇮🇹</span>
      <h3>Italian & International</h3>
      <div class="section-divider" style="margin: 0.5rem 0 0;"></div>
    </div>
    ${renderSection(italianCats)}

    <!-- All You Can Drink Banner -->
    <div class="cta-banner" style="margin: 2rem 0; border-radius: var(--radius-md);">
      <h2>All You Can Drink</h2>
      <p>${config.promotions.allYouCanDrink.price} THB / ${config.promotions.allYouCanDrink.duration}</p>
      <p style="font-size: 0.875rem;">${config.promotions.allYouCanDrink.availability}</p>
    </div>

    <!-- Thai Cuisine -->
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
      <!-- Hero -->
      <section class="hero hero-page" aria-label="Our Menu">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Our Menu</h1>
          <p>Italian &middot; Thai &middot; Japanese Fusion</p>
        </div>
      </section>

      <!-- Category Nav -->
      <nav class="category-nav" aria-label="Menu categories">
        <div class="category-nav-inner">
          ${MENU_CATEGORIES.map(cat => `
            <button class="category-pill" data-target="${cat.id}" aria-label="Jump to ${cat.label}">
              ${cat.emoji ? `${cat.emoji} ` : ''}${cat.label}
            </button>
          `).join('')}
        </div>
      </nav>

      <!-- Menu Content -->
      <div class="container" id="menu-content">
        ${renderMenuSections()}
      </div>

      <!-- Digital Menu Book -->
      <section class="section" style="background: var(--color-cream);" aria-labelledby="menu-book-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="menu-book-heading">📖 Digital Menu Book</h2>
            <div class="section-divider"></div>
            <p>Click any page to view in full detail</p>
          </div>
          <div class="menu-book-grid animate-fade-up">
            ${menuBookPages.map((file, i) => `
              <div class="menu-book-thumb" data-idx="${i}" data-src="/images/menu-pages/${file.replace(/ /g, '%20')}">
                <img src="/images/menu-pages/${file.replace(/ /g, '%20')}" alt="Menu page ${i + 1}" loading="lazy" decoding="async" width="200" height="280">
              </div>
            `).join('')}
          </div>
        </div>
      </section>
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
  initMenuBook();
});

function initMenuBook(): void {
  // Build lightbox for menu book — appended directly to document.body
  const overlay = document.createElement('div');
  overlay.id = 'menu-book-overlay';
  overlay.className = 'menu-book-overlay';
  overlay.innerHTML = `
    <button class="mb-close" aria-label="Close">&times;</button>
    <span class="mb-counter"></span>
    <button class="mb-nav mb-prev" aria-label="Previous">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <img class="mb-img" src="" alt="">
    <button class="mb-nav mb-next" aria-label="Next">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  `;
  document.body.appendChild(overlay);

  const mbImg = overlay.querySelector('.mb-img') as HTMLImageElement;
  const mbCounter = overlay.querySelector('.mb-counter') as HTMLElement;
  const mbClose = overlay.querySelector('.mb-close') as HTMLElement;
  const mbPrev = overlay.querySelector('.mb-prev') as HTMLElement;
  const mbNext = overlay.querySelector('.mb-next') as HTMLElement;

  const srcs: string[] = [];
  const thumbs = document.querySelectorAll<HTMLElement>('.menu-book-thumb');
  thumbs.forEach(t => srcs.push(t.getAttribute('data-src') || ''));

  let idx = 0;
  let isOpen = false;

  function render() {
    mbImg.src = srcs[idx];
    mbImg.alt = `Menu page ${idx + 1}`;
    mbCounter.textContent = `${idx + 1} / ${srcs.length}`;
  }

  function open(startIdx: number) {
    idx = startIdx;
    render();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    isOpen = true;
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    isOpen = false;
  }

  function next() { idx = (idx + 1) % srcs.length; render(); }
  function prev() { idx = (idx - 1 + srcs.length) % srcs.length; render(); }

  // Thumbnail clicks
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => open(i));
  });

  // Overlay events
  mbClose.addEventListener('click', close);
  mbPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  mbNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Escape') close();
  });

  let touchX = 0;
  overlay.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
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
