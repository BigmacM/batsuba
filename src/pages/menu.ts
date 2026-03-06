import { SITE_CONFIG } from '../utils/config';
import { MENU_CATEGORIES } from '../utils/menu';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateMenuSchema, generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations, initDragScroll } from '../utils/animations';

const config = SITE_CONFIG;

function renderMenuSections(): string {
  // Split categories: Italian section, then CTA, then Thai/other section
  const italianIds = ['quick-dishes', 'salads', 'snacks-appetizers', 'japanese', 'soups', 'pasta', 'main-courses', 'pizza', 'steak-meat', 'seafood', 'specials'];
  const thaiIds = ['thai-soups', 'thai-dishes', 'somtam', 'yam', 'fried-vegetable', 'stir-fried', 'beef-pork-salads', 'pork-dishes', 'basil-dishes', 'fried-rice', 'beverages-extras'];

  // Map category IDs to their menu page image filenames.
  // Each category can have 1+ images from the in-store menu photos.
  // Place images in /images/menu-pages/ named: {category-id}.jpg or {category-id}-2.jpg etc.
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

  const renderSection = (cats: typeof MENU_CATEGORIES) => cats.map(cat => {
    const images = categoryImages[cat.id] || [];
    const imageStrip = images.length > 0 ? `
      <div class="menu-section-photos">
        ${images.map(img => `
          <img src="/images/menu-pages/${encodeURIComponent(img)}" alt="${cat.label} menu" loading="lazy" onerror="this.parentElement.style.display='none'">
        `).join('')}
      </div>
    ` : '';

    return `
    <div class="menu-section" id="${cat.id}" data-category="${cat.id}">
      <h2>${cat.label}</h2>
      ${cat.note ? `<p class="menu-note">${cat.note}</p>` : ''}
      ${imageStrip}
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

      <!-- Search -->
      <div class="section" style="padding-bottom: 0;">
        <div class="container">
          <div class="menu-search">
            <input type="search" id="menu-search" placeholder="Search dishes..." aria-label="Search menu items">
          </div>
        </div>
      </div>

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

      <!-- Floating mobile category selector -->
      <div class="menu-fab" id="menu-fab" aria-label="Jump to category">
        <span class="menu-fab-label" id="menu-fab-label">Quick Dishes</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </div>
      <div class="menu-fab-overlay" id="menu-fab-overlay">
        <div class="menu-fab-sheet">
          <div class="menu-fab-sheet-header">
            <span>Jump to Category</span>
            <button id="menu-fab-close" aria-label="Close">&times;</button>
          </div>
          <div class="menu-fab-sheet-list">
            ${MENU_CATEGORIES.map(cat => `
              <button class="menu-fab-item" data-target="${cat.id}">${cat.label}</button>
            `).join('')}
          </div>
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
  initDragScroll('.menu-section-photos');
  initMenuInteractions();
  initMenuFab();
});

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

          // Scroll the active pill into view in the nav
          const activePill = document.querySelector(`.category-pill[data-target="${id}"]`);
          activePill?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    },
    { threshold: 0.2, rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--total-header-height') || '104px'} 0px -60% 0px` }
  );

  sections.forEach(s => observer.observe(s));

  // Search
  const searchInput = document.getElementById('menu-search') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.menu-item').forEach(item => {
        const name = item.getAttribute('data-name') || '';
        (item as HTMLElement).style.display = !query || name.includes(query) ? '' : 'none';
      });

      // Hide empty sections
      document.querySelectorAll('.menu-section').forEach(section => {
        const visibleItems = section.querySelectorAll('.menu-item:not([style*="display: none"])');
        (section as HTMLElement).style.display = visibleItems.length > 0 ? '' : 'none';
      });
    });
  }
}

function initMenuFab(): void {
  const fab = document.getElementById('menu-fab');
  const fabLabel = document.getElementById('menu-fab-label');
  const overlay = document.getElementById('menu-fab-overlay');
  const closeBtn = document.getElementById('menu-fab-close');

  if (!fab || !fabLabel || !overlay) return;

  // Update fab label when active category changes
  const updateLabel = () => {
    const active = document.querySelector('.category-pill.active');
    if (active) {
      fabLabel.textContent = active.textContent?.trim() || '';
    }
  };

  // Watch for class changes on pills
  const pillObserver = new MutationObserver(updateLabel);
  document.querySelectorAll('.category-pill').forEach(pill => {
    pillObserver.observe(pill, { attributes: true, attributeFilter: ['class'] });
  });

  // Toggle overlay
  fab.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeOverlay = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  // Category item click
  overlay.querySelectorAll('.menu-fab-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      if (targetId) {
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
      closeOverlay();
    });
  });
}
