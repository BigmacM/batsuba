import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';

const config = SITE_CONFIG;

const galleryItems = [
  { label: 'Wood-fired Pizza', category: 'food' },
  { label: 'Wagyu Steak', category: 'food' },
  { label: 'Pasta Selection', category: 'food' },
  { label: 'Wine Collection', category: 'wine' },
  { label: 'Wine Pairing', category: 'wine' },
  { label: 'Sommelier Selection', category: 'wine' },
  { label: 'Restaurant Interior', category: 'atmosphere' },
  { label: 'Outdoor Dining', category: 'atmosphere' },
  { label: 'Evening Ambience', category: 'atmosphere' },
  { label: 'Margherita Pizza', category: 'pizza' },
  { label: 'Truffle Pizza', category: 'pizza' },
  { label: 'Four Cheese Pizza', category: 'pizza' },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="Gallery">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>A Taste of BUTSABA</h1>
          <p>Glimpses of our food, wine, and atmosphere</p>
        </div>
      </section>

      <section class="section" aria-labelledby="gallery-heading">
        <div class="container">
          <h2 id="gallery-heading" class="sr-only">Gallery</h2>

          <!-- Tabs -->
          <div class="gallery-tabs animate-fade-up">
            <button class="gallery-tab active" data-filter="all">All</button>
            <button class="gallery-tab" data-filter="food">Food</button>
            <button class="gallery-tab" data-filter="wine">Wine</button>
            <button class="gallery-tab" data-filter="atmosphere">Atmosphere</button>
            <button class="gallery-tab" data-filter="pizza">Pizza</button>
          </div>

          <!-- Grid -->
          <div class="gallery-grid animate-fade-up" id="gallery-grid">
            ${galleryItems.map((item, i) => `
              <div class="gallery-item" data-category="${item.category}" data-index="${i}" role="button" tabindex="0" aria-label="View ${item.label}">
                <div class="img-placeholder img-placeholder-square">
                  <!-- TODO: Replace with actual photo of ${item.label} -->
                  ${item.label}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Instagram CTA -->
          <div style="text-align: center; margin-top: var(--space-8);" class="animate-fade-up">
            <p style="font-size: 1.125rem; color: var(--color-text-muted); margin-bottom: var(--space-2);">Follow us on Instagram for more</p>
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${config.social.instagramHandle}</a>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox" role="dialog" aria-label="Image viewer">
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <div class="lightbox-content">
        <div class="img-placeholder" id="lightbox-image" style="min-height: 20rem; width: 100%; border-radius: var(--radius-md);"></div>
      </div>
    </div>

    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: `${config.brand.name} Gallery`,
      url: `${config.seo.siteUrl}/gallery.html`,
    })}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Gallery', url: '/gallery.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initGallery();
});

function initGallery(): void {
  // Tab filtering
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        (item as HTMLElement).style.display = filter === 'all' || cat === filter ? '' : 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = lightbox?.querySelector('.lightbox-close');

  items.forEach(item => {
    const openLightbox = () => {
      if (lightbox && lightboxImage) {
        const label = item.querySelector('.img-placeholder')?.textContent?.trim() || '';
        lightboxImage.textContent = label;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    item.addEventListener('click', openLightbox);
    item.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') openLightbox();
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
