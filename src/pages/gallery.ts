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
  // Tree Town (1-16)
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%20Main.jpg', label: 'BUTSABA Tree Town' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(2).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(2).webp', label: 'Tree Town Pattaya' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(3).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(3).webp', label: 'Tree Town Interior' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(4).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(4).webp', label: 'Tree Town Dining' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(5).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(5).webp', label: 'Tree Town Ambience' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(6).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(6).webp', label: 'Tree Town Evening' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(7).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(7).webp', label: 'Tree Town Setting' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(8).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(8).webp', label: 'Tree Town Wine Bar' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(9).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(9).webp', label: 'Tree Town Dishes' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(10).jpg', webp: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(10).webp', label: 'Tree Town Experience' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(11).jpg', label: 'Tree Town Atmosphere' },
  { src: '/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(13).jpg', label: 'Tree Town Wine Collection' },
  // Aya Hotel (1-13)
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20Main.jpg', label: 'BUTSABA Near Aya Hotel' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(1).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(1).webp', label: 'Aya Hotel Location' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(2).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(2).webp', label: 'Aya Hotel Interior' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(3).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(3).webp', label: 'Aya Hotel Dining' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(4).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(4).webp', label: 'Aya Hotel Ambience' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(5).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(5).webp', label: 'Aya Hotel Evening' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(6).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(6).webp', label: 'Aya Hotel Terrace' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(8).jpg', webp: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(8).webp', label: 'Aya Hotel Wine Selection' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(9).webp', label: 'Aya Hotel Outdoor Seating' },
  { src: '/images/locations/Batsuba%20Aya%20Hotel/Batsuba%202%20(10).webp', label: 'Aya Hotel Night View' },
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
            ${galleryItems.map(item => {
              if (item.webp) {
                return `
              <div class="gallery-item">
                <picture>
                  <source srcset="${item.webp}" type="image/webp">
                  <img src="${item.src}" alt="${item.label}" loading="lazy" decoding="async" width="800" height="600" onerror="this.closest('.gallery-item').style.display='none'">
                </picture>
              </div>`;
              }
              return `
              <div class="gallery-item">
                <img src="${item.src}" alt="${item.label}" loading="lazy" decoding="async" width="800" height="600" onerror="this.closest('.gallery-item').style.display='none'">
              </div>`;
            }).join('')}
          </div>

          <!-- Instagram CTA -->
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: var(--space-8); padding: var(--space-6) var(--space-4); background: var(--color-cream); border-radius: var(--radius-md);" class="animate-fade-up">
            <h3 style="color: var(--color-primary); margin-bottom: var(--space-2); font-size: 1.5rem;">Follow Us on Instagram</h3>
            <p style="font-size: 1.125rem; color: var(--color-text-muted); margin-bottom: var(--space-4); text-align: center;">See more of our food, wine, and atmosphere</p>
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2rem;">${config.social.instagramHandle}</a>
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
