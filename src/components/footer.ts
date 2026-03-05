import { SITE_CONFIG } from '../utils/config';

export function renderFooter(): string {
  const config = SITE_CONFIG;
  const loc1 = config.locations[0];
  const loc2 = config.locations[1];

  return `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo-text">${config.brand.name}</div>
          <p>${config.brand.tagline}</p>
          <div class="social-links" style="margin-top: 1.5rem;">
            <a href="${config.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
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
