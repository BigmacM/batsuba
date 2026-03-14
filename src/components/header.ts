import { SITE_CONFIG } from '../utils/config';

export function initHeader(): void {
  const header = document.querySelector('.site-header') as HTMLElement;
  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  const navLinks = document.querySelector('.nav-links') as HTMLElement;

  if (!header) return;

  // Sticky header scroll effect
  const onScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Highlight active nav link
  const currentPath = window.location.pathname;
  navLinks?.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      (currentPath === '/' && href === '/') ||
      (currentPath === '/index.html' && href === '/') ||
      (href !== '/' && currentPath.includes(href))
    ) {
      link.classList.add('active');
    }
  });

  // Highlight active mobile nav item
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (
      (currentPath === '/' && href === '/') ||
      (currentPath === '/index.html' && href === '/') ||
      (href !== '/' && !href.startsWith('tel:') && currentPath.includes(href))
    ) {
      item.classList.add('active');
    }
  });

  // Highlight active top bar location button
  document.querySelectorAll('.top-bar-loc').forEach(btn => {
    const href = btn.getAttribute('href') || '';
    if (href !== '/' && currentPath.includes(href)) {
      btn.classList.add('active');
    }
  });
}

export function renderHeader(): string {
  const config = SITE_CONFIG;
  const loc1 = config.locations[0];
  const loc2 = config.locations[1];
  return `
  <a href="#main" class="skip-link">Skip to main content</a>
  <!-- Top Bar with Location Buttons -->
  <div class="top-bar">
    <div class="top-bar-inner">
      <div class="top-bar-locations">
        <a href="/tree-town.html" class="top-bar-loc">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Tree Town
        </a>
        <a href="/aya-hotel.html" class="top-bar-loc">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Aya Hotel
        </a>
      </div>
      <div class="top-bar-info">
        <a href="tel:${loc1.phone}" class="top-bar-phone">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${loc1.phoneFormatted}
        </a>
        <span class="top-bar-hours">Open ${loc1.hours.display}</span>
      </div>
    </div>
  </div>
  <header class="site-header" role="banner">
    <div class="header-inner">
      <a href="/" class="header-logo" aria-label="${config.brand.name} — Home">
        <img src="/assets/images/favicon.ico" alt="" width="36" height="36" style="border-radius: 4px;">
        <span>BUTSABA</span>
      </a>
      <nav class="nav-links" role="navigation" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about.html">About</a>
        <a href="/menu.html">Menu</a>
        <a href="/gallery.html">Gallery</a>
        <a href="/contact.html">Contact</a>
        <a href="${SITE_CONFIG.social.line}" target="_blank" rel="noopener noreferrer" class="nav-reserve">Reserve</a>
      </nav>
      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>`;
}
