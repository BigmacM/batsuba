import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';

const config = SITE_CONFIG;
const loc1 = config.locations[0];
const loc2 = config.locations[1];

const featuredDishes = [
  { name: 'Wagyu Fillet Steak 250g', price: 890, category: 'Steak & Meat' },
  { name: 'Truffle Pizza', price: 380, category: 'Pizza' },
  { name: 'Pescatore', price: 350, category: 'Pasta' },
  { name: 'Tuna Tataki', price: 490, category: 'Salads' },
  { name: 'Tom Yam Kung', price: 290, category: 'Thai Soups' },
  { name: 'Spaghetti Burrata', price: 420, category: 'Pasta' },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero" aria-label="Welcome to ${config.brand.name}">
        <div class="hero-overlay"></div>
        <!-- TODO: Replace with actual hero photo of the restaurant -->
        <div class="hero-content">
          <h1>Where Fine Dining Meets Elegant Wine</h1>
          <p>${config.brand.tagline}</p>
          <div class="hero-ctas">
            <a href="/menu.html" class="btn btn-gold">Explore Our Menu</a>
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
                <div class="img-placeholder img-placeholder-food">
                  <!-- TODO: Replace with actual photo of ${dish.name} -->
                  ${dish.name}
                </div>
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
          <a href="/contact.html#reservation" class="btn btn-gold" style="margin-top: 1rem;">Reserve Now</a>
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
              <div class="cuisine-icon" aria-hidden="true">&#127470;&#127481;</div>
              <h3>Italian Fine Dining</h3>
              <p>Wood-fired pizzas, handmade pastas, and premium steaks crafted with authentic Italian techniques and imported ingredients.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">&#127481;&#127469;</div>
              <h3>Thai Classics</h3>
              <p>From fiery Tom Yam Kung to fragrant Green Curry, savor the bold and aromatic flavors of traditional Thai cuisine.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">&#127843;</div>
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
            ${config.locations.map(loc => `
              <div class="location-card">
                <h3>${loc.label}</h3>
                <div class="location-detail">
                  <span class="detail-icon" aria-hidden="true">&#128205;</span>
                  <span>${loc.address.full}</span>
                </div>
                <div class="location-detail">
                  <span class="detail-icon" aria-hidden="true">&#128222;</span>
                  <a href="tel:${loc.phone}">${loc.phoneFormatted}</a>
                </div>
                <div class="location-detail">
                  <span class="detail-icon" aria-hidden="true">&#128340;</span>
                  <span>${loc.hours.display} — Daily</span>
                </div>
                <div class="rating-badge">★ ${loc.googleRating}/5 (${loc.googleReviewCount} reviews)</div>
                <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top: 1.5rem; display: inline-flex;">Get Directions</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Instagram Strip -->
      <section class="section" style="background: var(--color-white); padding-bottom: 0;" aria-labelledby="insta-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="insta-heading">Follow Us on Instagram</h2>
            <div class="section-divider"></div>
            <p><a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 700;">${config.social.instagramHandle}</a></p>
          </div>
        </div>
        <div class="insta-grid">
          ${Array.from({ length: 6 }, (_, i) => `
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram post ${i + 1}">
              <!-- TODO: Replace with actual Instagram photo ${i + 1} -->
            </a>
          `).join('')}
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
});
