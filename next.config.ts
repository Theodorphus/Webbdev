import type { NextConfig } from "next";

// Säkerhetsheaders för alla routes. CSP:n begränsar medvetet inte script-src:
// Google Ads laddar skript och pixlar från många Google-domäner (google.se,
// doubleclick m.fl.) och en för snäv lista skulle tyst bryta konverterings-
// mätningen. Direktiven nedan stoppar i stället inramning (clickjacking),
// plugins, <base>-kapning och formulär som postar till främmande domäner.
const contentSecurityPolicy = [
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // HSTS sätts redan av Vercel för egna domäner.
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
