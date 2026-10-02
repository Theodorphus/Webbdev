export const GOOGLE_ADS_ID = 'AW-18237659170';
export const ADS_CONSENT_KEY = 'webbdev.ads-consent.v1';
const conversionLabel = 'XZ4aCMWl2sMcEKKwsvhD';

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let consentGranted = false;
let configured = false;

export function initializeGoogleAds() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // Google's queue expects an Arguments object, not a rest-parameter array.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', {
    ad_storage: 'denied', analytics_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
  window.gtag('set', 'allow_ad_personalization_signals', false);
  window.gtag('js', new Date());
}

export function setAdsConsent(granted: boolean) {
  initializeGoogleAds();
  consentGranted = granted;
  window.gtag!('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: 'denied', analytics_storage: 'denied',
  });
  if (granted && !configured) {
    window.gtag!('config', GOOGLE_ADS_ID);
    configured = true;
  }
}

// Called only after the contact endpoint accepts a real submission.
// Never include form contents or contact details in advertising events.
export function trackGoogleAdsContact(transactionId: string) {
  if (!consentGranted || !conversionLabel || !/^[\w-]+$/.test(conversionLabel)) return;
  try {
    window.gtag?.('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: 1.0,
      currency: 'SEK',
      transaction_id: transactionId,
    });
  } catch { /* Tracking must never affect the submitted form. */ }
}
