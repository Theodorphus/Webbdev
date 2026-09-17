'use client';

import { track } from '@vercel/analytics';

type ConversionEvent = 'demo_started' | 'demo_step_completed' | 'demo_shared' | 'demo_submitted' | 'demo_error' | 'chat_lead_submitted' | 'chat_lead_error' | 'contact_started' | 'contact_submitted' | 'contact_error' | 'calculator_started' | 'calculator_quote_clicked' | 'case_cta_clicked';
type ConversionProperties = { step?: number; industry?: string; style?: string; palette?: string; type?: string; pages?: number; feature_count?: number; case?: string; destination?: 'demo' | 'contact' };

// Only categorical design choices and counts. Never names, email, free text or shared URLs.
export function trackConversion(event: ConversionEvent, properties: ConversionProperties = {}) {
  try { track(event, properties); } catch { /* Analytics must never interrupt a customer request. */ }
}
