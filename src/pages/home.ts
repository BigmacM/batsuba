import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations, initDragScroll } from '../utils/animations';
import { ICONS } from '../utils/icons';

const config = SITE_CONFIG;
const loc1 = config.locations[0];
const loc2 = config.locations[1];

const featuredDishes = [
  { name: 'Wagyu Fillet Steak 250g', price: 890, category: 'Steak & Meat', img: '/images/menu/Wagyu%20Fillet%20Steak.jpg' },
  { name: 'Truffle Pizza', price: 380, category: 'Pizza', img: '/images/menu/Rustic%20Truffle%20Pizza.jpg' },
  { name: 'Pescatore', price: 350, category: 'Pasta', img: '/images/menu/Spaghetti%20Pescatore.jpg' },
  { name: 'Tuna Tataki', price: 490, category: 'Salads', img: '/images/menu/Seared%20Tuna%20Tataki.jpg' },
  { name: 'Tom Yam Kung', price: 290, category: 'Thai Soups', img: '/images/menu/Vibrant%20Tom%20Yum%20Kung.jpg' },
  { name: 'Spaghetti Burrata', price: 420, category: 'Pasta', img: '/images/menu/Spaghetti%20with%20Creamy%20Burrata.jpg' },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero" aria-label="Welcome to ${config.brand.name}" style="background: url('/images/locations/Batsuba%20Tree%20Town/Batsuba%20Main.jpg') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Where Fine Dining Meets Elegant Wine</h1>
          <p>${config.brand.tagline}</p>
          <div class="hero-ctas">
            <a href="/menu.html" class="btn btn-accent">Explore Our Menu</a>
            <a href="/contact.html#reservation" class="btn btn-outline">Book a Table</a>
          </div>
        </div>
      </section>

      <!-- About Snippet -->
      <section class="section" aria-labelledby="about-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div>
              <h2 id="about-heading" style="color: var(--color-primary); margin-bottom: 1rem;">Pattaya's Finest Italian Dining Experience</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>Nestled in the heart of Pattaya, BUTSABA Wine &amp; Cafe is where authentic Italian craftsmanship meets the vibrant flavors of Thailand and Japan. Our wood-fired oven delivers the perfect crust, while our chefs bring together the finest ingredients from three culinary traditions.</p>
              <p>Whether you are savoring a glass from our curated wine collection or indulging in our signature Wagyu steak, every visit is an occasion to remember.</p>
              <a href="/about.html" class="btn btn-primary" style="margin-top: 1rem;">Our Story</a>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div class="stats-strip" style="padding: 0; justify-content: flex-start;">
                <div class="stat-item">
                  <div class="stat-value">200+</div>
                  <div class="stat-label">Wines</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">2</div>
                  <div class="stat-label">Locations</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${loc1.googleRating}★</div>
                  <div class="stat-label">Google Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Dishes -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="featured-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="featured-heading">Signature Dishes</h2>
            <div class="section-divider"></div>
            <p>Handcrafted with passion, served with elegance</p>
          </div>
          <div class="dish-strip">
            ${featuredDishes.map(dish => `
              <div class="dish-card">
                <img src="${dish.img}" alt="${dish.name}" loading="lazy" decoding="async" width="400" height="300" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: var(--radius-md) var(--radius-md) 0 0;">
                <div class="card-body">
                  <div class="dish-name">${dish.name}</div>
                  <div class="dish-price">฿${dish.price}</div>
                  <span class="dish-category">${dish.category}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- All You Can Drink Banner -->
      <section class="cta-banner" aria-label="All You Can Drink Promotion">
        <div class="container animate-fade-up">
          <h2>All You Can Drink</h2>
          <p>${config.promotions.allYouCanDrink.price} THB / ${config.promotions.allYouCanDrink.duration}</p>
          <p style="font-size: 0.9375rem;">${config.promotions.allYouCanDrink.availability}</p>
          <a href="/contact.html#reservation" class="btn btn-accent" style="margin-top: 1rem;">Reserve Now</a>
        </div>
      </section>

      <!-- Cuisine Highlights -->
      <section class="section" aria-labelledby="cuisine-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="cuisine-heading">Three Culinary Traditions, One Table</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="20"/><path d="M16 18c0-2 2-4 4-4s4 2 4 0 2-4 4-4 4 2 4 4"/><path d="M12 28h24"/><path d="M14 32h20"/></svg>
              </div>
              <h3>Italian Fine Dining</h3>
              <p>Wood-fired pizzas, handmade pastas, and premium steaks crafted with authentic Italian techniques and imported ingredients.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 8c-4 2-8 8-8 16h16c0-8-4-14-8-16z"/><path d="M16 24c-2 4-2 8 0 12h16c2-4 2-8 0-12"/><line x1="24" y1="36" x2="24" y2="42"/><line x1="18" y1="42" x2="30" y2="42"/></svg>
              </div>
              <h3>Thai Classics</h3>
              <p>From fiery Tom Yam Kung to fragrant Green Curry, savor the bold and aromatic flavors of traditional Thai cuisine.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 28h28"/><path d="M14 28c0-8 4-14 10-16 6 2 10 8 10 16"/><ellipse cx="24" cy="30" rx="14" ry="4"/><path d="M20 34v4"/><path d="M28 34v4"/><line x1="16" y1="38" x2="32" y2="38"/></svg>
              </div>
              <h3>Japanese Fusion</h3>
              <p>Delicate sashimi, crispy tempura, and expertly prepared Japanese dishes that complement our Italian and Thai offerings.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Reviews -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="reviews-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="reviews-heading">What Our Guests Say</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="review-card">
              <div class="review-stars" aria-label="5 stars">★★★★★</div>
              <p>"Exceptional Italian food in the heart of Pattaya. The wine selection is outstanding and the atmosphere is perfect for a special evening."</p>
              <div class="review-author">— Google Review</div>
            </div>
            <div class="review-card">
              <div class="review-stars" aria-label="5 stars">★★★★★</div>
              <p>"Best wood-fired pizza we've had in Thailand. The truffle pizza is a must-try. Great wine pairing recommendations from the staff."</p>
              <div class="review-author">— TripAdvisor Review</div>
            </div>
            <div class="review-card">
              <div class="review-stars" aria-label="5 stars">★★★★★</div>
              <p>"A hidden gem in Pattaya. The fusion of Italian and Thai cuisine is done beautifully. The Wagyu steak was cooked to perfection."</p>
              <div class="review-author">— Google Review</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Locations Teaser -->
      <section class="section" aria-labelledby="locations-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="locations-heading">Visit Us</h2>
            <div class="section-divider"></div>
            <p>Two locations in Pattaya to serve you</p>
          </div>
          <div class="grid-2 animate-fade-up">
            ${config.locations.map((loc, i) => {
              const slug = i === 0 ? 'tree-town' : 'aya-hotel';
              const folder = i === 0 ? 'Batsuba Tree Town' : 'Batsuba Aya Hotel';
              const mainImg = i === 0 ? 'Batsuba Main.jpg' : 'Batsuba 2 Main.jpg';
              return `
              <a href="/${slug}.html" class="location-card location-card-link">
                <div class="location-card-img">
                  <img src="/images/locations/${folder.replace(/ /g, '%20')}/${mainImg.replace(/ /g, '%20')}" alt="${loc.label}" loading="lazy" decoding="async" width="600" height="400">
                </div>
                <div class="location-card-body">
                  <h3>${loc.label}</h3>
                  <div class="location-detail">
                    <span class="detail-icon" aria-hidden="true">${ICONS.mapPin}</span>
                    <span>${loc.address.city}, ${loc.address.district}</span>
                  </div>
                  <div class="location-detail">
                    <span class="detail-icon" aria-hidden="true">${ICONS.clock}</span>
                    <span>${loc.hours.display}</span>
                  </div>
                  <div class="location-card-footer">
                    <div class="rating-badge">${ICONS.star} ${loc.googleRating}/5 (${loc.googleReviewCount} reviews)</div>
                    <span class="location-card-arrow">View Location &rarr;</span>
                  </div>
                </div>
              </a>`;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- Instagram Embed -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="insta-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="insta-heading">Follow Us on Instagram</h2>
            <div class="section-divider"></div>
            <p><a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 700;">${config.social.instagramHandle}</a></p>
          </div>
          <div class="insta-embed animate-fade-up" style="display: flex; justify-content: center;">
            <blockquote class="instagram-media" data-instgrm-permalink="${config.social.instagram}/" data-instgrm-version="14" style="background: var(--color-white); border: 1px solid var(--color-gray-light); border-radius: var(--radius-md); max-width: 540px; width: 100%; min-width: 326px; padding: 0;">
            </blockquote>
          </div>
          <div style="text-align: center; margin-top: var(--space-4);" class="animate-fade-up">
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Our Instagram</a>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initDragScroll('.dish-strip');

  // Load Instagram embed script
  const igScript = document.createElement('script');
  igScript.async = true;
  igScript.src = 'https://www.instagram.com/embed.js';
  document.body.appendChild(igScript);
});
