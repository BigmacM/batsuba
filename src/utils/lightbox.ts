/**
 * Shared photo lightbox using native <dialog>.
 * Works on gallery pages and location pages.
 */

/** Render the lightbox dialog HTML (include in innerHTML) */
export function renderLightbox(id = 'photo-lightbox'): string {
  return `
    <dialog class="photo-lightbox" id="${id}">
      <button class="lb-close" aria-label="Close">&times;</button>
      <span class="lb-counter"></span>
      <button class="lb-nav lb-prev" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <img class="lb-img" src="" alt="">
      <button class="lb-nav lb-next" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </dialog>
  `;
}

/** Initialize lightbox on gallery items that contain <img> elements */
export function initLightbox(id = 'photo-lightbox', itemSelector = '.gallery-item'): void {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  if (!dialog) return;

  const lbImg = dialog.querySelector('.lb-img') as HTMLImageElement;
  const lbCounter = dialog.querySelector('.lb-counter') as HTMLElement;
  const lbClose = dialog.querySelector('.lb-close') as HTMLElement;
  const lbPrev = dialog.querySelector('.lb-prev') as HTMLElement;
  const lbNext = dialog.querySelector('.lb-next') as HTMLElement;

  // Collect all visible image srcs from gallery items
  let srcs: string[] = [];
  let alts: string[] = [];
  let idx = 0;

  function collectImages(): void {
    srcs = [];
    alts = [];
    document.querySelectorAll<HTMLElement>(itemSelector).forEach(item => {
      if (item.style.display === 'none') return;
      const img = item.querySelector('img') as HTMLImageElement | null;
      if (img && img.src) {
        srcs.push(img.src);
        alts.push(img.alt || '');
      }
    });
  }

  function render(): void {
    lbImg.src = srcs[idx];
    lbImg.alt = alts[idx];
    lbCounter.textContent = `${idx + 1} / ${srcs.length}`;
    const multi = srcs.length > 1;
    lbPrev.style.display = multi ? '' : 'none';
    lbNext.style.display = multi ? '' : 'none';
    lbCounter.style.display = multi ? '' : 'none';
  }

  function open(startIdx: number): void {
    collectImages();
    if (!srcs.length) return;
    idx = startIdx;
    render();
    dialog.showModal();
  }

  function next(): void { idx = (idx + 1) % srcs.length; render(); }
  function prev(): void { idx = (idx - 1 + srcs.length) % srcs.length; render(); }

  // Attach click to each gallery item
  document.querySelectorAll<HTMLElement>(itemSelector).forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      // Find this item's index among visible items
      collectImages();
      const img = item.querySelector('img') as HTMLImageElement | null;
      if (!img) return;
      const clickedIdx = srcs.indexOf(img.src);
      open(clickedIdx >= 0 ? clickedIdx : 0);
    });
  });

  lbClose.addEventListener('click', () => dialog.close());
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  let touchX = 0;
  dialog.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
  });
}
