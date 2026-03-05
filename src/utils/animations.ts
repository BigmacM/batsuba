export function initDragScroll(selector: string): void {
  document.querySelectorAll<HTMLElement>(selector).forEach(el => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => {
      isDown = false;
      el.classList.remove('dragging');
    });

    el.addEventListener('mouseup', () => {
      isDown = false;
      el.classList.remove('dragging');
    });

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    });
  });
}

export function initAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-fade-up').forEach((el) => {
    observer.observe(el);
  });

  // Animated counters for stat values
  initCountUp();
}

function initCountUp(): void {
  const counters = document.querySelectorAll<HTMLElement>('.stat-value');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => counterObserver.observe(el));
}

function animateCounter(el: HTMLElement): void {
  const text = el.textContent || '';
  // Extract numeric part (e.g., "4.7★" → 4.7, "200+" → 200, "#4" → 4, "86%" → 86)
  const match = text.match(/([\d.]+)/);
  if (!match) return;

  const target = parseFloat(match[1]);
  const isDecimal = text.includes('.');
  const prefix = text.slice(0, text.indexOf(match[1]));
  const suffix = text.slice(text.indexOf(match[1]) + match[1].length);

  const duration = 1500;
  const startTime = performance.now();

  function update(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
