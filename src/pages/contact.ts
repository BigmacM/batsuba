import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { ICONS } from '../utils/icons';

const config = SITE_CONFIG;

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="Contact Us">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Get In Touch</h1>
          <p>We would love to hear from you</p>
        </div>
      </section>

      <!-- Contact Grid -->
      <section class="section" id="reservation" aria-labelledby="contact-heading">
        <div class="container">
          <h2 id="contact-heading" class="sr-only">Contact Information & Reservation</h2>
          <div class="grid-2 animate-fade-up" style="align-items: flex-start;">
            <!-- Left: Contact Details -->
            <div>
              <h3 style="color: var(--color-primary); margin-bottom: var(--space-4);">Contact Details</h3>

              ${config.locations.map(loc => `
                <div style="margin-bottom: var(--space-5);">
                  <h4 style="margin-bottom: var(--space-2); color: var(--color-text);">${loc.label}</h4>
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
                </div>
              `).join('')}

              <h4 style="color: var(--color-primary); margin-bottom: var(--space-2); margin-top: var(--space-4);">Follow Us</h4>
              <div class="social-links">
                <a href="${config.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${ICONS.facebook}</a>
                <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${ICONS.instagram}</a>
              </div>

              <div style="margin-top: var(--space-5); padding: var(--space-3); background: var(--color-white); border-radius: var(--radius-md); border-left: 4px solid var(--color-accent);">
                <h4 style="margin-bottom: 0.5rem;">Opening Hours</h4>
                <p style="color: var(--color-text-muted); margin: 0;">${config.locations[0].hours.display} — Daily at both locations</p>
              </div>
            </div>

            <!-- Right: Reservation via LINE -->
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--space-6); background: var(--color-white); border-radius: var(--radius-md); border: 1px solid var(--color-gray-light);">
              <div style="width: 4rem; height: 4rem; border-radius: 50%; background: #06C755; display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-3); color: white;">
                ${ICONS.line}
              </div>
              <h3 style="color: var(--color-primary); margin-bottom: var(--space-2);">Reserve via LINE</h3>
              <p style="color: var(--color-text-muted); margin-bottom: var(--space-4); max-width: 24rem;">Message us directly on LINE to make a reservation, ask about our menu, or plan your next visit. We'll reply promptly!</p>
              <img src="/assets/images/Batsuba%20Line%20QR%20Code.webp" alt="Scan to add us on LINE" width="160" height="160" style="border-radius: var(--radius-md); margin-bottom: var(--space-3);" loading="lazy">
              <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: var(--space-3);">Scan the QR code or tap below</p>
              <a href="${config.social.line}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2.5rem; gap: 0.5rem; background: #06C755; border-color: #06C755;">
                ${ICONS.line} Chat on LINE
              </a>
              <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-top: var(--space-3);">Or call us directly:</p>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: var(--space-1);">
                ${config.locations.map(loc => `
                  <a href="tel:${loc.phone}" style="color: var(--color-primary); font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                    <span class="detail-icon" aria-hidden="true">${ICONS.phone}</span>
                    ${loc.label}: ${loc.phoneFormatted}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${config.brand.name}`,
      url: `${config.seo.siteUrl}/contact.html`,
    })}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
});
