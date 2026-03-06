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
                <button type="submit" class="btn btn-primary" style="width: 100%; gap: 0.5rem;">
                  ${ICONS.line} Send via LINE
                </button>
              </form>

              <div class="form-success" id="form-success">
                <h3>Redirecting to LINE...</h3>
                <p style="color: var(--color-text-muted);">Your reservation request is being sent via LINE. If it didn't open automatically, <a href="#" id="line-link" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 700;">click here</a>.</p>
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
  const lineLink = document.getElementById('line-link') as HTMLAnchorElement;

  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const name = data.get('name') as string;
      const email = data.get('email') as string;
      const phone = data.get('phone') as string;
      const locationId = data.get('location') as string;
      const date = data.get('date') as string;
      const time = data.get('time') as string;
      const partySize = data.get('party-size') as string;
      const message = data.get('message') as string;

      const locationLabel = config.locations.find(l => l.id === locationId)?.label || locationId;

      const lines = [
        `Reservation Request — BUTSABA Wine & Cafe`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        `Location: ${locationLabel}`,
        `Date: ${date}`,
        `Time: ${time}`,
        `Party Size: ${partySize}`,
        message ? `Message: ${message}` : '',
      ].filter(Boolean).join('\n');

      // LINE share URL — works on mobile/desktop, opens LINE with pre-filled text
      const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(lines)}`;

      // Update fallback link
      if (lineLink) {
        lineLink.href = lineUrl;
      }

      // Show success and open LINE
      form.style.display = 'none';
      success.classList.add('show');
      window.open(lineUrl, '_blank');
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
