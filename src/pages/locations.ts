import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateLocalBusinessSchemas, generateFAQSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { ICONS } from '../utils/icons';

const config = SITE_CONFIG;

const faqs = [
  {
    question: 'Is parking available?',
    answer: 'Yes, both locations offer nearby parking. Our Tree Town Pattaya location has convenient parking within the Tree Town complex, and our branch near Aya Boutique Hotel has street parking available.',
  },
  {
    question: 'Are reservations required?',
    answer: 'Reservations are recommended, especially on weekends and holidays, to ensure we can provide you with the best seating and service. Walk-ins are welcome subject to availability. You can contact us by phone or through our website to make a reservation.',
  },
  {
    question: 'Do you allow dogs?',
    answer: 'Yes! Our branch location near Aya Boutique Hotel offers dog-friendly outdoor seating. Well-behaved dogs on leashes are welcome to join you at our outdoor tables.',
  },
  {
    question: 'What are your opening hours?',
    answer: 'Both locations are open daily from 5:00 PM to 2:00 AM, seven days a week.',
  },
  {
    question: 'Do you offer wine pairing?',
    answer: 'Absolutely! Our knowledgeable staff can recommend the perfect wine from our collection of over 200 bottles to complement your meal. Just ask your server for pairing suggestions.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="Our Locations">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Find Us in Pattaya</h1>
          <p>Two locations, one exceptional dining experience</p>
        </div>
      </section>

      <!-- Location Cards -->
      <section class="section" aria-labelledby="locations-heading">
        <div class="container">
          <h2 id="locations-heading" class="sr-only">Our Locations</h2>
          <div class="grid-2 animate-fade-up">
            ${config.locations.map(loc => `
              <div class="location-card">
                <h3>${loc.label}</h3>
                <div class="location-detail">
                  <span class="detail-icon" aria-hidden="true">${ICONS.mapPin}</span>
                  <span>${loc.address.full}</span>
                </div>
                <div class="location-detail">
                  <span class="detail-icon" aria-hidden="true">${ICONS.phone}</span>
                  <a href="tel:${loc.phone}">${loc.phoneFormatted}</a>
                </div>
                <div class="location-detail">
                  <span class="detail-icon" aria-hidden="true">${ICONS.mail}</span>
                  <a href="mailto:${loc.email}">${loc.email}</a>
                </div>
                <div class="location-detail">
                  <span class="detail-icon" aria-hidden="true">${ICONS.clock}</span>
                  <span>${loc.hours.display} — ${loc.hours.days}</span>
                </div>
                <div class="rating-badge">${ICONS.star} ${loc.googleRating}/5 (${loc.googleReviewCount} reviews)</div>
                <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top: 1.5rem; display: inline-flex;">Get Directions</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Map Placeholders -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="maps-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="maps-heading">Find Your Way</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-2 animate-fade-up">
            ${config.locations.map(loc => `
              <div>
                <h3 style="margin-bottom: 1rem; color: var(--color-primary);">${loc.label}</h3>
                <!-- Replace src with Google Maps embed URL for ${loc.label} -->
                <div class="map-placeholder" aria-label="Map for ${loc.label}">
                  Map placeholder — Replace with Google Maps embed
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Hours Table -->
      <section class="section" aria-labelledby="hours-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="hours-heading">Opening Hours</h2>
            <div class="section-divider"></div>
          </div>
          <div class="animate-fade-up" style="max-width: 40rem; margin: 0 auto;">
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
                    <td>${config.locations[0].hours.display}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p style="text-align: center; margin-top: 1rem; color: var(--color-text-muted); font-size: 0.875rem;">Same hours at both locations</p>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="faq-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <div class="section-divider"></div>
          </div>
          <div class="faq-list animate-fade-up">
            ${faqs.map(faq => `
              <div class="faq-item">
                <button class="faq-question" aria-expanded="false">${faq.question}</button>
                <div class="faq-answer">
                  <p>${faq.answer}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    ${generateLocalBusinessSchemas()}
    <script type="application/ld+json">${generateFAQSchema(faqs)}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/locations.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initFAQ();
});

function initFAQ(): void {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item?.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));

      // Toggle clicked
      if (!isOpen) {
        item?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
