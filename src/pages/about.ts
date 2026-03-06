import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';

const config = SITE_CONFIG;
const loc1 = config.locations[0];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="About Us">
        <div class="hero-overlay"></div>
        <!-- TODO: Replace with actual atmospheric photo of the restaurant -->
        <div class="hero-content">
          <h1>Our Story</h1>
          <p>A passion for fine wine and authentic cuisine in the heart of Pattaya</p>
        </div>
      </section>

      <!-- Story -->
      <section class="section" aria-labelledby="story-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div>
              <h2 id="story-heading" style="color: var(--color-primary); margin-bottom: 1rem;">A Dining Destination Born of Passion</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>BUTSABA Wine &amp; Cafe was born from a singular vision: to bring the warmth of Italian hospitality and the artistry of fine wine to the vibrant coastal city of Pattaya. From our very first evening, we set out to create a space where every detail speaks of elegance and every dish tells a story of authentic craftsmanship.</p>
              <p>Our kitchen marries the time-honoured traditions of Italian cooking with the bold, aromatic flavors of Thailand and the refined precision of Japanese cuisine. Each plate is a celebration of quality ingredients, prepared with care by our team of Italian and Thai-trained chefs who share a deep respect for culinary heritage.</p>
              <p>At the heart of the experience is our carefully curated wine collection — over two hundred bottles sourced from renowned vineyards around the world, chosen to complement every course and occasion.</p>
            </div>
            <div class="img-placeholder img-placeholder-food" style="min-height: 24rem; border-radius: var(--radius-md);">
              <!-- TODO: Replace with actual photo of the restaurant interior -->
              Restaurant Interior
            </div>
          </div>
        </div>
      </section>

      <!-- Philosophy -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="philosophy-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="philosophy-heading">Our Philosophy</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="philosophy-card">
              <div class="philosophy-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M15 9h.01"/><path d="M9 9h.01"/></svg>
              </div>
              <h3>Authentic Ingredients</h3>
              <p>We source the finest Italian imports alongside the freshest local Thai produce, ensuring every ingredient meets our exacting standards of quality and flavor.</p>
            </div>
            <div class="philosophy-card">
              <div class="philosophy-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"/></svg>
              </div>
              <h3>Expert Wine Curation</h3>
              <p>Our sommelier has hand-selected over 200 bottles from the world's most celebrated vineyards, offering the perfect pairing for every palate and occasion.</p>
            </div>
            <div class="philosophy-card">
              <div class="philosophy-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <h3>Impeccable Service</h3>
              <p>From your first welcome to your last sip, our Thai and English-speaking team delivers attentive, warm service that makes every guest feel truly at home.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Wine Collection -->
      <section class="section" aria-labelledby="wine-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div class="img-placeholder img-placeholder-food" style="min-height: 20rem; border-radius: var(--radius-md);">
              <!-- TODO: Replace with actual photo of wine collection -->
              Wine Collection
            </div>
            <div>
              <h2 id="wine-heading" style="color: var(--color-primary); margin-bottom: 1rem;">Over 200 Wines, Perfectly Paired</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>Our cellar is a journey through the world's great wine regions. From full-bodied Italian reds that stand up to our Wagyu steak, to crisp whites that dance alongside our seafood, every bottle has been chosen with intention and care.</p>
              <p>Ask our team about wine pairings — we take great pleasure in guiding our guests to the ideal glass for their meal, mood, and moment.</p>
              <a href="/menu.html" class="btn btn-primary" style="margin-top: 1rem;">View Our Menu</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="team-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="team-heading">Our Team</h2>
            <div class="section-divider"></div>
          </div>
          <div class="animate-fade-up" style="max-width: 40rem; margin: 0 auto; text-align: center;">
            <p style="color: var(--color-text-muted); margin: 0 auto;">Our team of Italian and Thai-trained chefs brings together decades of combined culinary expertise. United by a shared passion for exceptional dining, they craft each dish with precision, creativity, and an unwavering commitment to quality that our guests have come to expect.</p>
          </div>
        </div>
      </section>

      <!-- Awards/Recognition -->
      <section class="cta-banner" aria-label="Recognition">
        <div class="container animate-fade-up">
          <h2 style="color: var(--color-white); margin-bottom: 2rem;">Recognised Excellence</h2>
          <div class="stats-strip" style="padding: 0;">
            <div class="stat-item">
              <div class="stat-value">${loc1.googleRating}★</div>
              <div class="stat-label" style="color: rgba(255,255,255,0.7);">Google Rating (${loc1.googleReviewCount} reviews)</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">#4</div>
              <div class="stat-label" style="color: rgba(255,255,255,0.7);">TripAdvisor in Nong Prue</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">86%</div>
              <div class="stat-label" style="color: rgba(255,255,255,0.7);">Facebook Recommend</div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
});
