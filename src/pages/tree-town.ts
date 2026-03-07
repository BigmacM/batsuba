import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateSingleLocationSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { ICONS } from '../utils/icons';
import { renderLightbox, initLightbox } from '../utils/lightbox';

const config = SITE_CONFIG;
const loc = config.locations[0]; // Tree Town Pattaya

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page hero-page-img" aria-label="${loc.label}" style="background-image: url('/images/locations/${'Batsuba%20Tree%20Town'}/${'Batsuba%20Main.jpg'}');">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>${loc.label}</h1>
          <p>Italian &middot; Thai &middot; Japanese Fusion in Tree Town Pattaya</p>
        </div>
      </section>

      <!-- Location Details -->
      <section class="section" aria-labelledby="loc-details-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up" style="align-items: flex-start;">
            <!-- Left: Details -->
            <div>
              <h2 id="loc-details-heading" style="color: var(--color-primary); margin-bottom: var(--space-4);">Visit Us</h2>
              <div class="location-detail">
                <span class="detail-icon" aria-hidden="true">${ICONS.mapPin}</span>
                <span>${loc.address.full}</span>
              </div>
              <div class="location-detail">
                <span class="detail-icon" aria-hidden="true">${ICONS.phone}</span>
                <a href="tel:${loc.phone}" style="color: var(--color-primary); font-weight: 700;">${loc.phoneFormatted}</a>
              </div>
              <div class="location-detail">
                <span class="detail-icon" aria-hidden="true">${ICONS.mail}</span>
                <a href="mailto:${loc.email}">${loc.email}</a>
              </div>
              <div class="location-detail">
                <span class="detail-icon" aria-hidden="true">${ICONS.clock}</span>
                <span>${loc.hours.display} — ${loc.hours.days}</span>
              </div>
              <div class="rating-badge" style="margin-top: var(--space-3);">${ICONS.star} ${loc.googleRating}/5 (${loc.googleReviewCount} reviews)</div>
              <div style="margin-top: var(--space-4); display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Get Directions</a>
                <a href="/contact.html#reservation" class="btn btn-outline" style="color: var(--color-primary); border-color: var(--color-primary);">Reserve a Table</a>
              </div>
            </div>

            <!-- Right: About this location -->
            <div>
              <h3 style="color: var(--color-primary); margin-bottom: var(--space-3);">About This Location</h3>
              <p style="line-height: 1.8; color: var(--color-text-muted);">
                Our original location at Tree Town Pattaya is where the BUTSABA story began. Nestled in the vibrant Tree Town complex, this location offers an intimate dining experience with our full menu of Italian, Thai, and Japanese fusion cuisine paired with an extensive wine collection of over 200 labels.
              </p>
              <p style="line-height: 1.8; color: var(--color-text-muted); margin-top: var(--space-2);">
                The warm, sophisticated ambiance makes it perfect for romantic dinners, business meetings, or celebrations with friends. Enjoy our signature All You Can Drink package at ${config.promotions.allYouCanDrink.price} THB for ${config.promotions.allYouCanDrink.duration}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="loc-gallery-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="loc-gallery-heading">Gallery</h2>
            <div class="section-divider"></div>
            <p>A glimpse of the atmosphere at Tree Town</p>
          </div>
          <div class="gallery-grid animate-fade-up">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => {
              const base = `/images/locations/Batsuba%20Tree%20Town/Batsuba%201%20(${i})`;
              const hasWebp = [1,2,3,4,5,6,7,8,9,10].includes(i);
              const hasJpg = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].includes(i);
              const fallbackSrc = hasJpg ? `${base}.jpg` : `${base}.webp`;
              return `
              <div class="gallery-item">
                <picture>
                  ${hasWebp ? `<source srcset="${base}.webp" type="image/webp">` : ''}
                  <img src="${fallbackSrc}" alt="BUTSABA Tree Town Pattaya ${i}" loading="lazy" decoding="async" width="800" height="600" onerror="this.closest('.gallery-item').style.display='none'">
                </picture>
              </div>`;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- Map -->
      <section class="section" aria-labelledby="loc-map-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="loc-map-heading">Find Us</h2>
            <div class="section-divider"></div>
          </div>
          <div class="animate-fade-up" style="max-width: 50rem; margin: 0 auto;">
            <div class="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000!2d${loc.coordinates.lng}!3d${loc.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sth"
                width="100%"
                height="400"
                style="border:0; border-radius: var(--radius-md);"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Map for ${loc.label}"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Hours -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="loc-hours-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="loc-hours-heading">Opening Hours</h2>
            <div class="section-divider"></div>
          </div>
          <div class="animate-fade-up" style="max-width: 30rem; margin: 0 auto;">
            <table class="hours-table" role="table">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Hours</th>
                </tr>
              </thead>
              <tbody>
                ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `
                  <tr>
                    <td>${day}</td>
                    <td>${loc.hours.display}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section">
        <div class="container" style="text-align: center;">
          <div class="animate-fade-up">
            <h2 style="color: var(--color-primary);">Ready to Dine?</h2>
            <p style="color: var(--color-text-muted); margin: var(--space-2) 0 var(--space-4);">Reserve your table at Tree Town Pattaya</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="/contact.html#reservation" class="btn btn-primary">Make a Reservation</a>
              <a href="/menu.html" class="btn btn-outline" style="color: var(--color-primary); border-color: var(--color-primary);">View Our Menu</a>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    ${renderLightbox('tt-lightbox')}

    <script type="application/ld+json">${generateSingleLocationSchema(0)}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/locations.html' },
      { name: 'Tree Town Pattaya', url: '/tree-town.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initLightbox('tt-lightbox');
});
