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
    const photosBtn = images.length > 0 ? `
      <button class="menu-photos-btn" data-lightbox="${cat.id}" aria-label="View ${cat.label} menu photos">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        ${images.length} photo${images.length > 1 ? 's' : ''}
      </button>
    ` : '';

    return `
    <div class="menu-section" id="${cat.id}" data-category="${cat.id}">
      <h2>${cat.label}${photosBtn}</h2>
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

      <!-- Lightbox -->
      <div class="menu-lightbox" id="menu-lightbox" role="dialog" aria-modal="true" aria-label="Menu photos">
        <button class="menu-lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
        <span class="menu-lightbox-title" id="lightbox-title"></span>
        <span class="menu-lightbox-counter" id="lightbox-counter"></span>
        <button class="menu-lightbox-nav menu-lightbox-prev" id="lightbox-prev" aria-label="Previous photo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <img class="menu-lightbox-img" id="lightbox-img" src="" alt="">
        <button class="menu-lightbox-nav menu-lightbox-next" id="lightbox-next" aria-label="Next photo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
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
  initMenuFab();
  initLightbox();
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

  const updateLabel = () => {
    const active = document.querySelector('.category-pill.active');
    if (active) {
      fabLabel.textContent = active.textContent?.trim() || '';
    }
  };

  const pillObserver = new MutationObserver(updateLabel);
  document.querySelectorAll('.category-pill').forEach(pill => {
    pillObserver.observe(pill, { attributes: true, attributeFilter: ['class'] });
  });

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

function initLightbox(): void {
  const lightbox = document.getElementById('menu-lightbox');
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!lightbox || !lightboxImg) return;

  const lb = lightbox;
  let currentImages: string[] = [];
  let currentIndex = 0;
  let currentLabel = '';

  function show(images: string[], label: string, startIndex = 0) {
    currentImages = images;
    currentLabel = label;
    currentIndex = startIndex;
    updateImage();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateImage() {
    const img = currentImages[currentIndex];
    lightboxImg.src = `/images/menu-pages/${encodeURIComponent(img)}`;
    lightboxImg.alt = `${currentLabel} menu page ${currentIndex + 1}`;
    if (lightboxTitle) lightboxTitle.textContent = currentLabel;
    if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

    // Hide nav buttons if only 1 image
    if (prevBtn) prevBtn.style.display = currentImages.length <= 1 ? 'none' : '';
    if (nextBtn) nextBtn.style.display = currentImages.length <= 1 ? 'none' : '';
    if (lightboxCounter) lightboxCounter.style.display = currentImages.length <= 1 ? 'none' : '';
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
  }

  // Bind photo buttons
  document.querySelectorAll<HTMLButtonElement>('.menu-photos-btn[data-lightbox]').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-lightbox') || '';
      const images = categoryImages[catId];
      if (!images?.length) return;
      // Find the category label from the heading
      const section = document.getElementById(catId);
      const heading = section?.querySelector('h2');
      const label = heading?.childNodes[0]?.textContent?.trim() || catId;
      show(images, label);
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Click backdrop to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Swipe support for mobile
  let touchStartX = 0;
  lb.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lb.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  });
}
