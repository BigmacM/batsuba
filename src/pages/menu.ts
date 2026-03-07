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

    <!-- Menu Photo Lightbox (native dialog) -->
    <dialog class="menu-lightbox-dialog" id="menu-lightbox">
      <button class="lb-close" id="lb-close" aria-label="Close">&times;</button>
      <span class="lb-title" id="lb-title"></span>
      <span class="lb-counter" id="lb-counter"></span>
      <button class="lb-nav lb-prev" id="lb-prev" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <img class="lb-img" id="lb-img" src="" alt="">
      <button class="lb-nav lb-next" id="lb-next" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </dialog>

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
}

function initLightbox(): void {
  const dialog = document.getElementById('menu-lightbox') as HTMLDialogElement;
  if (!dialog) return;

  const lbImg = document.getElementById('lb-img') as HTMLImageElement;
  const lbTitle = document.getElementById('lb-title') as HTMLElement;
  const lbCounter = document.getElementById('lb-counter') as HTMLElement;
  const lbClose = document.getElementById('lb-close') as HTMLElement;
  const lbPrev = document.getElementById('lb-prev') as HTMLElement;
  const lbNext = document.getElementById('lb-next') as HTMLElement;

  let images: string[] = [];
  let idx = 0;

  function render() {
    const file = images[idx];
    lbImg.src = `/images/menu-pages/${file.replace(/ /g, '%20')}`;
    lbImg.alt = `${lbTitle.textContent} page ${idx + 1}`;
    lbCounter.textContent = `${idx + 1} / ${images.length}`;
    const multi = images.length > 1;
    lbPrev.style.display = multi ? '' : 'none';
    lbNext.style.display = multi ? '' : 'none';
    lbCounter.style.display = multi ? '' : 'none';
  }

  function open(catId: string) {
    const imgs = categoryImages[catId];
    if (!imgs?.length) return;
    images = imgs;
    idx = 0;
    const section = document.getElementById(catId);
    lbTitle.textContent = section?.querySelector('h2')?.childNodes[0]?.textContent?.trim() || catId;
    render();
    dialog.showModal();
  }

  // Attach click to each photo button
  document.querySelectorAll<HTMLElement>('.menu-photos-btn[data-lightbox]').forEach(btn => {
    btn.addEventListener('click', () => {
      open(btn.getAttribute('data-lightbox') || '');
    });
  });

  lbClose.addEventListener('click', () => dialog.close());
  lbPrev.addEventListener('click', () => { idx = (idx - 1 + images.length) % images.length; render(); });
  lbNext.addEventListener('click', () => { idx = (idx + 1) % images.length; render(); });

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // Keyboard navigation
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { idx = (idx + 1) % images.length; render(); }
    if (e.key === 'ArrowLeft') { idx = (idx - 1 + images.length) % images.length; render(); }
  });

  // Swipe support
  let touchX = 0;
  dialog.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      idx = diff > 0 ? (idx + 1) % images.length : (idx - 1 + images.length) % images.length;
      render();
    }
  });
}
