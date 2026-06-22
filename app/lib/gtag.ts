// Google Ads-konverteringsspårning.
//
// Fyll i "send_to"-värdena nedan med dina konverteringsetiketter från Google Ads:
//   Google Ads → Verktyg → Konverteringar → välj konverteringen → "Tagginställning"
//   → "Använd Google-tagg" → kopiera värdet som ser ut som "AW-XXXXXXXXXX/abcDEFghiJKL".
//
// Skapa två konverteringar i Google Ads: en för formulärskick och en för
// telefonklick. Klistra in respektive send_to-värde här.

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

const CONVERSIONS = {
  // Skickat kontaktformulär — din viktigaste konvertering.
  formSubmit: "AW-18237659170/XZ4aCMWl2sMcEKKwsvhD",
  // Klick på telefonnumret.
  phoneClick: "AW-18237659170/__aTCJDK7sMcEKKwsvhD",
} as const;

/** Rapporterar en konvertering till Google Ads om gtag finns laddad. */
export function trackConversion(type: keyof typeof CONVERSIONS) {
  if (typeof window === "undefined") return;
  const { gtag } = window as GtagWindow;
  const sendTo = CONVERSIONS[type];
  // Hoppa över om gtag inte laddats (t.ex. utan annons-ID i utvecklingsläge)
  // eller om etiketten ännu inte är ifylld.
  if (!gtag || sendTo.includes("CONVERSION_ID")) return;
  gtag("event", "conversion", { send_to: sendTo });
}
