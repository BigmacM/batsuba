import { SITE_CONFIG } from '../utils/config';
import { MENU_CATEGORIES } from '../utils/menu';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateMenuSchema, generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations, initDragScroll } from '../utils/animations';

const config = SITE_CONFIG;

// Map category IDs to their menu page image filenames in /images/menu-pages/
const categoryImages: Record<string, string[]> = {
  'quick-dishes':       ['Quick Dishes (1).png', 'Quick Dishes (2).png'],
  'salads':             ['Salad (1).png', 'Salad (2).png'],
  'snacks-appetizers':  ['Snack (1).png', 'Snack (2).png'],
  'soups':              ['Soup.png'],
  'pasta':              ['Pasta (1).png', 'Pasta (2).png', 'Pasta (3).png', 'Pasta (4).png'],
  'main-courses':       ['Secondo Piatto (1).png', 'Secondo Piatto (2).png', 'Secondo Piatto (3).png'],
  'pizza':              ['Pizza (1).png', 'Pizza (2).png'],
  'steak-meat':         ['Steak and Meat Dish (1).png', 'Steak and Meat Dish (2).png'],
  'seafood':            ['Seafood (1).png', 'Seafood (2).png', 'Seafood (3).png'],
  'specials':           ['Recommended (1).png', 'Recommended (2).png'],
  'thai-soups':         ['Thai Soup (1).png', 'Thai Soup (2).png'],
  'thai-dishes':        ['Thai Food  (1).png', 'Thai Food  (2).png'],
  'somtam':             ['Thai Food  (3).png'],
  'yam':                ['Thai Food  (4).png'],
  'fried-vegetable':    ['Thai Food  (5).png'],
  'stir-fried':         ['Thai Food  (6).png'],
  'beef-pork-salads':   ['Thai Food  (7).png'],
  'pork-dishes':        ['Thai Food  (8).png'],
  'basil-dishes':       ['Thai Food  (9).png'],
  'fried-rice':         ['Thai Food  (10).png'],
};

function renderMenuSections(): string {
  const italianIds = ['quick-dishes', 'salads', 'snacks-appetizers', 'japanese', 'soups', 'pasta', 'main-courses', 'pizza', 'steak-meat', 'seafood', 'specials'];
  const thaiIds = ['thai-soups', 'thai-dishes', 'somtam', 'yam', 'fried-vegetable', 'stir-fried', 'beef-pork-salads', 'pork-dishes', 'basil-dishes', 'fried-rice', 'beverages-extras'];

  const renderSection = (cats: typeof MENU_CATEGORIES) => cats.map(cat => {
    const images = categoryImages[cat.id] || [];
    const photoStrip = images.length > 0 ? `
      <div class="menu-photo-strip" data-category="${cat.id}">
        ${images.map((file, i) => `
          <div class="menu-photo-thumb" data-idx="${i}" data-src="/images/menu-pages/${file.replace(/ /g, '%20')}">
            <img src="/images/menu-pages/${file.replace(/ /g, '%20')}" alt="${cat.label} menu page ${i + 1}" loading="lazy" decoding="async" width="120" height="80">
          </div>
        `).join('')}
      </div>
      <div class="menu-photo-expand" data-expand="${cat.id}" style="display: none;">
        <img src="" alt="" class="menu-photo-full" loading="lazy" decoding="async">
      </div>
    ` : '';

    return `
    <div class="menu-section" id="${cat.id}" data-category="${cat.id}">
      <h2>${cat.label}</h2>
      ${photoStrip}
      ${cat.note ? `<p class="menu-note">${cat.note}</p>` : ''}
      <div class="menu-grid">
        ${cat.items.map(item => `
          <div class="menu-item" data-name="${item.name.toLowerCase()}">
            <div class="menu-item-info">
              <div class="menu-item-name">${item.name}</div>
              ${item.code ? `<div class="menu-item-code">#${item.code}</div>` : ''}
            </div>
            <div class="menu-item-price">฿${item.price}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  }).join('');

  const italianCats = MENU_CATEGORIES.filter(c => italianIds.includes(c.id));
  const thaiCats = MENU_CATEGORIES.filter(c => thaiIds.includes(c.id));

  return `
    ${renderSection(italianCats)}

    <!-- All You Can Drink Banner -->
    <div class="cta-banner" style="margin: 2rem 0; border-radius: var(--radius-md);">
      <h2>All You Can Drink</h2>
      <p>${config.promotions.allYouCanDrink.price} THB / ${config.promotions.allYouCanDrink.duration}</p>
      <p style="font-size: 0.875rem;">${config.promotions.allYouCanDrink.availability}</p>
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
              ${cat.label}
            </button>
          `).join('')}
        </div>
      </nav>

      <!-- Menu Content -->
      <div class="container" id="menu-content">
        ${renderMenuSections()}
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
  initPhotoStrips();
});

function initPhotoStrips(): void {
  document.querySelectorAll<HTMLElement>('.menu-photo-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const catId = thumb.closest('.menu-photo-strip')?.getAttribute('data-category');
      if (!catId) return;
      const expandContainer = document.querySelector<HTMLElement>(`.menu-photo-expand[data-expand="${catId}"]`);
      if (!expandContainer) return;
      const fullImg = expandContainer.querySelector('img') as HTMLImageElement;
      const src = thumb.getAttribute('data-src') || '';

      // If already showing this image, collapse
      if (expandContainer.style.display !== 'none' && fullImg.src.includes(src.replace(/%20/g, ' '))) {
        expandContainer.style.display = 'none';
        thumb.classList.remove('active');
        return;
      }

      // Deactivate all thumbs in this strip, activate clicked one
      thumb.closest('.menu-photo-strip')?.querySelectorAll('.menu-photo-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      fullImg.src = src;
      fullImg.alt = thumb.querySelector('img')?.alt || '';
      expandContainer.style.display = 'block';
      expandContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

function initMenuInteractions(): void {
  // Category pill click → scroll to section
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');
      if (targetId) {
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer to highlight active category
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

