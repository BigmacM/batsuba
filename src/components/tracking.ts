import { SITE_CONFIG } from '../utils/config';

export function initTracking(): void {
  const { googleTagManagerId, metaPixelId } = SITE_CONFIG.tracking;

  // Google Tag Manager
  if (googleTagManagerId && !googleTagManagerId.includes('XXXXXXX')) {
    // dataLayer init + gtm.start event (matches official GTM snippet)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${googleTagManagerId}`;
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(gtmScript, firstScript);
    } else {
      document.head.appendChild(gtmScript);
    }

    // noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.prepend(noscript);
  } else {
    console.warn('[BUTSABA] Google Tag Manager ID is a placeholder. Skipping GTM injection.');
  }

  // Meta Pixel
  if (metaPixelId && !metaPixelId.includes('XXXXXXX')) {
    const pixelScript = document.createElement('script');
    pixelScript.textContent = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init','${metaPixelId}');
      fbq('track','PageView');
    `;
    document.head.appendChild(pixelScript);
  } else {
    console.warn('[BUTSABA] Meta Pixel ID is a placeholder. Skipping Pixel injection.');
  }
}
