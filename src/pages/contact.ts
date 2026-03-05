import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';

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
                    <span class="detail-icon" aria-hidden="true">&#128205;</span>
                    <span>${loc.address.full}</span>
                  </div>
                  <div class="location-detail">
                    <span class="detail-icon" aria-hidden="true">&#128222;</span>
                    <a href="tel:${loc.phone}" style="color: var(--color-primary); font-weight: 700;">${loc.phoneFormatted}</a>
                  </div>
                  <div class="location-detail">
                    <span class="detail-icon" aria-hidden="true">&#9993;</span>
                    <a href="mailto:${loc.email}">${loc.email}</a>
                  </div>
                  <div class="location-detail">
                    <span class="detail-icon" aria-hidden="true">&#128340;</span>
                    <span>${loc.hours.display} — ${loc.hours.days}</span>
                  </div>
                </div>
              `).join('')}

              <h4 style="color: var(--color-primary); margin-bottom: var(--space-2); margin-top: var(--space-4);">Follow Us</h4>
              <div class="social-links">
                <a href="${config.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
                <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              </div>

              <div style="margin-top: var(--space-5); padding: var(--space-3); background: var(--color-white); border-radius: var(--radius-md); border-left: 4px solid var(--color-gold);">
                <h4 style="margin-bottom: 0.5rem;">Opening Hours</h4>
                <p style="color: var(--color-text-muted); margin: 0;">${config.locations[0].hours.display} — Daily at both locations</p>
              </div>
            </div>

            <!-- Right: Reservation Form -->
            <div>
              <h3 style="color: var(--color-primary); margin-bottom: var(--space-4);">Make a Reservation</h3>
              <form class="contact-form" id="reservation-form" novalidate>
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Name *</label>
                    <input type="text" id="name" name="name" required aria-required="true" placeholder="Your name">
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required aria-required="true" placeholder="your@email.com">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="+66 ...">
                  </div>
                  <div class="form-group">
                    <label for="location">Preferred Location *</label>
                    <select id="location" name="location" required aria-required="true">
                      <option value="">Select location</option>
                      ${config.locations.map(loc => `
                        <option value="${loc.id}">${loc.label}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="date">Date *</label>
                    <input type="date" id="date" name="date" required aria-required="true">
                  </div>
                  <div class="form-group">
                    <label for="time">Time *</label>
                    <input type="time" id="time" name="time" required aria-required="true">
                  </div>
                </div>
                <div class="form-group">
                  <label for="party-size">Party Size *</label>
                  <select id="party-size" name="party-size" required aria-required="true">
                    <option value="">Select party size</option>
                    ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1} ${i === 0 ? 'guest' : 'guests'}</option>`).join('')}
                    <option value="11+">11+ guests</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" placeholder="Special requests, dietary requirements, celebrations..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Reservation Request</button>
              </form>

              <div class="form-success" id="form-success">
                <h3>Thank You!</h3>
                <p style="color: var(--color-text-muted);">Your reservation inquiry has been received. Please call us at <a href="tel:${config.locations[0].phone}" style="color: var(--color-primary); font-weight: 700;">${config.locations[0].phoneFormatted}</a> to confirm your booking.</p>
                <button class="btn btn-outline" id="form-reset" style="margin-top: 1rem; color: var(--color-primary); border-color: var(--color-primary);">Make Another Reservation</button>
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
  initForm();
});

function initForm(): void {
  const form = document.getElementById('reservation-form') as HTMLFormElement;
  const success = document.getElementById('form-success');
  const resetBtn = document.getElementById('form-reset');

  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      success.classList.add('show');
    });
  }

  resetBtn?.addEventListener('click', () => {
    if (form && success) {
      form.reset();
      form.style.display = '';
      success.classList.remove('show');
    }
  });
}
