import { SITE_CONFIG } from '../utils/config';
import { ICONS } from '../utils/icons';

export function renderFooter(): string {
  const config = SITE_CONFIG;
  const loc1 = config.locations[0];
  const loc2 = config.locations[1];

  return `
  <!-- Mobile Floating Reserve CTA -->
  <div class="mobile-reserve-bar">
    <a href="/contact.html#reservation" class="mobile-reserve-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Reserve a Table
    </a>
  </div>
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo-text">${config.brand.name}</div>
          <p>${config.brand.tagline}</p>
          <div class="social-links" style="margin-top: 1.5rem;">
            <a href="${config.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${ICONS.facebook}</a>
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${ICONS.instagram}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about.html">About Us</a>
          <a href="/menu.html">Our Menu</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/locations.html">Locations</a>
          <a href="/contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>${loc1.label}</h4>
          <p>${loc1.address.full}</p>
          <a href="tel:${loc1.phone}">${loc1.phoneFormatted}</a>
          <a href="mailto:${loc1.email}">${loc1.email}</a>
          <p>${loc1.hours.display}</p>
        </div>
        <div class="footer-col">
          <h4>${loc2.label}</h4>
          <p>${loc2.address.full}</p>
          <a href="tel:${loc2.phone}">${loc2.phoneFormatted}</a>
          <a href="mailto:${loc2.email}">${loc2.email}</a>
          <p>${loc2.hours.display}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2025 ${config.brand.name}. All rights reserved.</span>
        <span>${config.brand.nameThai}</span>
      </div>
    </div>
  </footer>`;
}
