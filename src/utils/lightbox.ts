/**
 * Universal lightbox — fully self-contained, no <dialog>, no external CSS.
 * Creates/destroys a fixed overlay on the fly using inline styles only.
 */

/**
 * Open a lightbox viewer for an array of image URLs.
 * @param srcs  Array of image URLs to display
 * @param startIdx  Index to start at (default 0)
 */
export function openLightbox(srcs: string[], startIdx = 0): void {
  if (!srcs.length) return;
  let idx = startIdx;

  // -- Overlay --
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;';
  document.body.appendChild(ov);
  document.body.style.overflow = 'hidden';

  // -- Image --
  const pic = document.createElement('img');
  pic.style.cssText = 'max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;user-select:none;';
  pic.draggable = false;
  ov.appendChild(pic);

  // -- Counter --
  const ctr = document.createElement('div');
  ctr.style.cssText = 'position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.6);font-size:0.85rem;font-weight:700;pointer-events:none;';
  ov.appendChild(ctr);

  // -- Close button --
  const xBtn = document.createElement('button');
  xBtn.textContent = '\u2715';
  xBtn.style.cssText = 'position:absolute;top:1rem;right:1rem;width:3rem;height:3rem;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.15);border:none;border-radius:50%;color:#fff;font-size:1.5rem;cursor:pointer;z-index:1;';
  ov.appendChild(xBtn);

  const showNav = srcs.length > 1;

  // -- Prev button --
  const pvBtn = document.createElement('button');
  pvBtn.innerHTML = '&#8249;';
  pvBtn.style.cssText = 'position:absolute;top:50%;left:1rem;transform:translateY(-50%);width:3rem;height:3rem;display:' + (showNav ? 'flex' : 'none') + ';align-items:center;justify-content:center;background:rgba(255,255,255,0.15);border:none;border-radius:50%;color:#fff;font-size:2rem;cursor:pointer;z-index:1;';
  ov.appendChild(pvBtn);

  // -- Next button --
  const nxBtn = document.createElement('button');
  nxBtn.innerHTML = '&#8250;';
  nxBtn.style.cssText = 'position:absolute;top:50%;right:1rem;transform:translateY(-50%);width:3rem;height:3rem;display:' + (showNav ? 'flex' : 'none') + ';align-items:center;justify-content:center;background:rgba(255,255,255,0.15);border:none;border-radius:50%;color:#fff;font-size:2rem;cursor:pointer;z-index:1;';
  ov.appendChild(nxBtn);

  function update(): void {
    pic.src = srcs[idx];
    ctr.textContent = srcs.length > 1 ? (idx + 1) + ' / ' + srcs.length : '';
  }
  update();

  function destroy(): void {
    ov.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  }

  function go(dir: number): void {
    idx = (idx + dir + srcs.length) % srcs.length;
    update();
  }

  xBtn.onclick = destroy;
  pvBtn.onclick = (e) => { e.stopPropagation(); go(-1); };
  nxBtn.onclick = (e) => { e.stopPropagation(); go(1); };
  ov.onclick = (e) => { if (e.target === ov) destroy(); };

  function onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') destroy();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  }
  document.addEventListener('keydown', onKey);

  // Swipe support
  let touchX = 0;
  ov.ontouchstart = (e) => { touchX = e.touches[0].clientX; };
  ov.ontouchend = (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
  };
}

/**
 * Attach lightbox behavior to a grid of clickable gallery items.
 * Collects the actual displayed image src from each item at click time.
 * @param containerSelector  CSS selector for the grid container
 * @param itemSelector       CSS selector for each clickable item within the container
 */
export function initGalleryLightbox(containerSelector: string, itemSelector = '.gallery-item'): void {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const item = target.closest(itemSelector) as HTMLElement | null;
    if (!item) return;

    // Collect all visible items and their displayed image srcs at click time
    const allItems = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    const visibleItems: HTMLElement[] = [];
    const srcs: string[] = [];

    for (const el of allItems) {
      if (el.offsetParent === null && getComputedStyle(el).display === 'none') continue;
      const img = el.querySelector('img') as HTMLImageElement | null;
      if (!img) continue;
      // Use currentSrc — this is what the browser is actually displaying
      // (handles <picture> + <source> elements correctly)
      const src = img.currentSrc || img.src;
      if (src) {
        visibleItems.push(el);
        srcs.push(src);
      }
    }

    const clickedIdx = visibleItems.indexOf(item);
    if (clickedIdx >= 0 && srcs.length > 0) {
      openLightbox(srcs, clickedIdx);
    }
  });

  // Set cursor on items
  container.querySelectorAll<HTMLElement>(itemSelector).forEach(el => {
    el.style.cursor = 'pointer';
  });
}
