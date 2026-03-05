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
}

export function renderHeader(): string {
  const config = SITE_CONFIG;
  return `
  <a href="#main" class="skip-link">Skip to main content</a>
  <header class="site-header" role="banner">
    <div class="header-inner">
      <a href="/" class="header-logo" aria-label="${config.brand.name} — Home">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="19" stroke="#C9A84C" stroke-width="2"/>
          <text x="20" y="16" text-anchor="middle" fill="#C9A84C" font-size="6" font-family="serif" font-weight="bold">BUTSABA</text>
          <text x="20" y="24" text-anchor="middle" fill="#fff" font-size="4" font-family="sans-serif">WINE &amp; CAFE</text>
          <line x1="8" y1="28" x2="32" y2="28" stroke="#C9A84C" stroke-width="0.5"/>
        </svg>
        <span>BUTSABA</span>
      </a>
      <nav class="nav-links" role="navigation" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about.html">About</a>
        <a href="/menu.html">Menu</a>
        <a href="/gallery.html">Gallery</a>
        <a href="/locations.html">Locations</a>
        <a href="/contact.html">Contact</a>
        <a href="/contact.html#reservation" class="nav-reserve">Reserve</a>
      </nav>
      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>`;
}
