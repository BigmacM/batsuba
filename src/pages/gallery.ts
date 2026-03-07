import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { renderLightbox, initLightbox } from '../utils/lightbox';

const config = SITE_CONFIG;

// Gallery uses location photos that already exist on disk
const galleryItems = [
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(2).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(2).webp', label: 'Tree Town Pattaya', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(3).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(3).webp', label: 'Tree Town Interior', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(4).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(4).webp', label: 'Tree Town Dining', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(5).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(5).webp', label: 'Tree Town Ambience', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(6).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(6).webp', label: 'Tree Town Evening', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(7).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(7).webp', label: 'Tree Town Setting', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(1).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(1).webp', label: 'Aya Hotel Location', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(2).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(2).webp', label: 'Aya Hotel Interior', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(3).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(3).webp', label: 'Aya Hotel Dining', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(4).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(4).webp', label: 'Aya Hotel Ambience', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(5).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(5).webp', label: 'Aya Hotel Evening', category: 'atmosphere' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(6).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(6).webp', label: 'Aya Hotel Terrace', category: 'atmosphere' },
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

          <!-- Grid -->
          <div class="gallery-grid animate-fade-up" id="gallery-grid">
            ${galleryItems.map(item => `
              <div class="gallery-item" data-category="${item.category}">
                <picture>
                  <source srcset="${item.webp}" type="image/webp">
                  <img src="${item.src}" alt="${item.label}" loading="lazy" decoding="async" width="800" height="600" onerror="this.closest('.gallery-item').style.display='none'">
                </picture>
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

    ${renderLightbox('gallery-lightbox')}

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
  initLightbox('gallery-lightbox');
});
