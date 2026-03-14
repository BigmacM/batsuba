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

const signatureDishes = new Set([
  'wagyu fillet steak 250g',
  'truffle',
  'pescatore',
  'tuna tataki',
  'tom yam kung (spicy shrimp soup)',
  'spaghetti burrata',
  'burrata with parma ham',
]);

// All menu page image URLs — used directly by the lightbox, no DOM dependency
const menuBookSrcs = [
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
].map(f => '/images/menu-pages/' + f.replace(/ /g, '%20'));

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
    <div class="menu-cuisine-header animate-fade-up">
      <span class="menu-cuisine-icon">🇮🇹</span>
      <h3>Italian & International</h3>
      <div class="section-divider" style="margin: 0.5rem 0 0;"></div>
    </div>
    ${renderSection(italianCats)}

    <div class="cta-banner" style="margin: 2rem 0; border-radius: var(--radius-md);">
      <h2>All You Can Drink</h2>
      <p>${config.promotions.allYouCanDrink.price} THB / ${config.promotions.allYouCanDrink.duration}</p>
      <p style="font-size: 0.875rem;">${config.promotions.allYouCanDrink.availability}</p>
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

        <!-- Single button to open menu book -->
        <div style="text-align:center; padding: var(--space-8) 0 var(--space-4);">
          <p style="color: var(--color-text-muted); margin-bottom: var(--space-3); font-size: 1.125rem;">Want to see our original menu pages?</p>
          <button id="open-menu-book" class="btn btn-primary" style="font-size: 1.125rem; padding: 0.875rem 2.5rem; gap: 0.5rem; cursor: pointer;">
            📖 View Digital Menu Book
          </button>
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

  // ── Menu Book Lightbox ──
  const openBtn = document.getElementById('open-menu-book');
  if (openBtn) {
    openBtn.addEventListener('click', () => openLightbox(menuBookSrcs, 0));
  }
});

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
