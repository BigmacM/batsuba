import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateSingleLocationSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { ICONS } from '../utils/icons';

const config = SITE_CONFIG;
const loc = config.locations[1]; // Near Aya Boutique Hotel

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="${loc.label}">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>${loc.label}</h1>
          <p>Italian &middot; Thai &middot; Japanese Fusion near Aya Boutique Hotel</p>
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
                Our branch near Aya Boutique Hotel brings the BUTSABA experience to a new corner of Pattaya. This location features a more relaxed, contemporary atmosphere with dog-friendly outdoor seating — perfect for guests who want to enjoy a meal with their furry companions.
              </p>
              <p style="line-height: 1.8; color: var(--color-text-muted); margin-top: var(--space-2);">
                Enjoy the same exceptional menu of Italian, Thai, and Japanese fusion dishes alongside our curated wine collection. The outdoor terrace offers a wonderful setting for evening dining under the Pattaya sky.
              </p>
              <div style="margin-top: var(--space-3); padding: var(--space-2) var(--space-3); background: var(--color-cream); border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.25rem;">&#128054;</span>
                <span style="font-weight: 700; color: var(--color-primary);">Dog-Friendly Outdoor Seating</span>
              </div>
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
            <p>A glimpse of the atmosphere near Aya Boutique Hotel</p>
          </div>
          <div class="gallery-grid animate-fade-up">
            ${[1, 2, 3, 4, 5, 6].map(i => `
              <div class="gallery-item">
                <img src="/images/locations/aya-hotel-${i}.jpg" alt="Aya Hotel branch interior ${i}" loading="lazy" onerror="this.closest('.gallery-item').style.display='none'">
              </div>
            `).join('')}
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
            <p style="color: var(--color-text-muted); margin: var(--space-2) 0 var(--space-4);">Reserve your table near Aya Boutique Hotel</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="/contact.html#reservation" class="btn btn-primary">Make a Reservation</a>
              <a href="/menu.html" class="btn btn-outline" style="color: var(--color-primary); border-color: var(--color-primary);">View Our Menu</a>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateSingleLocationSchema(1)}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/locations.html' },
      { name: 'Near Aya Boutique Hotel', url: '/aya-hotel.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
});
