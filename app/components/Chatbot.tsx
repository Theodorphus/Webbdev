'use client';

import { trackConversion } from '../lib/analytics';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '../i18n/LanguageProvider';

/**
 * AI-chatt-widget — flytande bubbla nere till höger som öppnar en panel.
 * Pratar med /api/chat (Claude) och streamar svaret tecken för tecken.
 * Tvåspråkig via useLang(); matchar sidans varma färgpalett.
 */

type Msg = { role: 'user' | 'assistant'; content: string };

export default function Chatbot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [contactVisibility, setContactVisibility] = useState({ path: '', visible: false });
  const hideDockOnMobile = !open && (pathname === '/gratis-demo' || (contactVisibility.path === pathname && contactVisibility.visible));
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  // Honeypot: osynligt fält som bara bottar fyller i.
  const [company, setCompany] = useState('');

  // Lead-kort: formulär som mejlar Theo via /api/lead.
  const [showLead, setShowLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadSending, setLeadSending] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadMessage, setLeadMessage] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Leave the contact form unobstructed, without closing an active conversation.
  useEffect(() => {
    const contact = document.getElementById('kontakt');
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => {
      setContactVisibility({ path: pathname, visible: entry.isIntersecting });
    });
    observer.observe(contact);
    return () => observer.disconnect();
  }, [pathname]);

  // Auto-scrolla till botten när nya meddelanden kommer.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  // Fokusera fältet när panelen öppnas.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function openChat() {
    setOpen(true);
  }

  function closeChat() {
    setOpen(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  }

  // Stäng med Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    const nextMessages: Msg[] = [...messages, { role: 'user', content: text }];
    // Lägg till en tom assistent-bubbla som vi fyller på medan svaret streamar.
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    void streamReply(nextMessages);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  // Skicka ett snabbsvar direkt (samma flöde som att skriva och trycka enter).
  function sendQuick(text: string) {
    if (sending) return;
    setInput('');
    const nextMessages: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    void streamReply(nextMessages);
  }

  // Bryt ut själva strömningen så både send() och sendQuick() kan återanvända den.
  async function streamReply(nextMessages: Msg[]) {
    setError(false);
    setSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, lang, company }),
      });
      if (!res.ok || !res.body) throw new Error('request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
      if (!acc.trim()) {
        setMessages((prev) => prev.slice(0, -1));
        setError(true);
      }
    } catch {
      setMessages((prev) => prev.slice(0, -1));
      setError(true);
    } finally {
      setSending(false);
    }
  }

  // Skicka leadet till /api/lead (mejlar Theo). Bifogar chatt-historiken
  // så Theo ser kontexten besökaren skrev innan.
  async function sendLead() {
    if (leadSending) return;
    if (!leadName.trim() || !leadContact.trim()) {
      setLeadError(t.chat.lead.kravs);
      return;
    }
    setLeadError('');
    setLeadSending(true);

    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Besökare' : 'Bot'}: ${m.content}`)
      .join('\n');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName.trim(),
          contact: leadContact.trim(),
          message: leadMessage.trim() || undefined,
          transcript: transcript || undefined,
          company,
        }),
      });
      if (!res.ok) throw new Error('lead failed');
      trackConversion('chat_lead_submitted');
      setLeadSent(true);
      setShowLead(false);
      // Bekräfta i chatten.
      setMessages((prev) => [...prev, { role: 'assistant', content: t.chat.lead.success }]);
    } catch {
      trackConversion('chat_lead_error');
      setLeadError(t.chat.lead.fel);
    } finally {
      setLeadSending(false);
    }
  }

  return (
    <>
      {/* Flytande knapp med etikett */}
      <div className={`chat-dock fixed bottom-5 right-5 z-50 flex items-center gap-3 md:bottom-6 md:right-6 ${open ? 'chat-dock--open' : ''} ${hideDockOnMobile ? 'max-md:hidden' : ''}`}>
        <div>
          <button
            ref={toggleRef}
            type="button"
            onClick={open ? closeChat : openChat}
            aria-label={open ? t.chat.stang : t.chat.oppna}
            aria-expanded={open}
            aria-controls="chat-panel"
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 bg-surface-raised text-accent-light shadow-lg transition-colors hover:bg-surface-raised"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <>
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Chatt-panel */}
      <div
        id="chat-panel"
        className={`fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-panel backdrop-blur-xl transition-all duration-300 md:right-6 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        style={{ height: 'min(32rem, calc(100dvh - 8rem))' }}
        role="dialog"
        aria-modal="false"
        aria-label={t.chat.rubrik}
        aria-hidden={!open}
        // inert tar panelen ur tabbordningen när den är stängd — pointer-events-none
        // stoppar bara mus, inte tangentbord/skärmläsare.
        inert={!open}
      >
        {/* Header */}
        <div className="relative flex items-start justify-between gap-3 overflow-hidden border-b border-foreground/10 px-4 py-3.5">
          {/* Subtil gradientglöd i headern (samma palett som heron) */}
          <div className="relative flex items-center gap-3">
            {/* Avatar med online-indikator */}
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-on-accent shadow-card">
                W
              </div>
            </div>
            <div>
              <p className="font-display text-base font-semibold leading-tight text-foreground">
                {t.chat.rubrik}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {t.chat.onlineStatus}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setError(false);
                setShowLead(false);
                setLeadSent(false);
                setLeadError('');
              }}
              className="relative shrink-0 rounded-full px-2 py-1 text-xs text-muted transition-colors hover:bg-surface-raised hover:text-foreground/80"
            >
              {t.chat.rensa}
            </button>
          )}
        </div>

        {/* Meddelanden */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {/* Välkomstbubbla */}
          <Bubble role="assistant">{t.chat.valkomna}</Bubble>

          {/* Snabbsvar — visas innan besökaren skrivit något */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {t.chat.snabbsvar.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendQuick(q)}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent-light transition-colors hover:border-accent/60 hover:bg-accent/20"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.content || (
                <span className="inline-flex gap-1" aria-label="...">
                  <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
                </span>
              )}
            </Bubble>
          ))}

          {/* Lead-CTA — visas när samtalet är igång och leadet inte skickats */}
          {!showLead && !leadSent && messages.length > 0 && !sending && (
            <button
              type="button"
              onClick={() => setShowLead(true)}
              className="w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-on-accent shadow-card transition-colors hover:bg-accent-hover"
            >
              {t.chat.bokaCta}
            </button>
          )}

          {/* Lead-formulär */}
          {showLead && (
            <div className="rounded-2xl border border-accent/25 bg-accent/[0.07] p-3.5">
              <p className="font-display text-sm font-semibold text-foreground">{t.chat.lead.rubrik}</p>
              <p className="mt-0.5 text-xs text-muted">{t.chat.lead.ingress}</p>
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder={t.chat.lead.namnPlaceholder}
                  aria-label={t.chat.lead.namn}
                  className="w-full rounded-lg border border-foreground/10 bg-surface-raised px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
                />
                <input
                  type="text"
                  value={leadContact}
                  onChange={(e) => setLeadContact(e.target.value)}
                  placeholder={t.chat.lead.kontaktPlaceholder}
                  aria-label={t.chat.lead.kontakt}
                  className="w-full rounded-lg border border-foreground/10 bg-surface-raised px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
                />
                <textarea
                  rows={2}
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  placeholder={t.chat.lead.meddelandePlaceholder}
                  aria-label={t.chat.lead.meddelande}
                  className="w-full resize-none rounded-lg border border-foreground/10 bg-surface-raised px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
                />
              </div>
              {leadError && <p className="mt-2 text-xs text-red-300">{leadError}</p>}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={sendLead}
                  disabled={leadSending}
                  className="flex-1 rounded-lg bg-accent py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  {leadSending ? t.chat.lead.skickar : t.chat.lead.skicka}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLead(false);
                    setLeadError('');
                  }}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-raised"
                >
                  {t.chat.lead.avbryt}
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">{t.chat.fel}</p>
          )}
        </div>

        {/* Inmatning */}
        <div className="border-t border-foreground/10 p-3">
          {/* Honeypot — visuellt dolt, men nåbart för bottar */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t.chat.placeholder}
              aria-label={t.chat.placeholder}
              className="max-h-28 flex-1 resize-none rounded-xl border border-foreground/10 bg-surface-raised px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
            <button
              type="button"
              onClick={send}
              disabled={sending || !input.trim()}
              aria-label={t.chat.skicka}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 px-1 text-[10px] leading-tight text-muted">{t.chat.friskrivning}</p>
        </div>
      </div>
    </>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-accent text-on-accent'
            : 'rounded-bl-sm bg-foreground/[0.06] text-foreground'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Dot({ delay = '0ms' }: { delay?: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-surface-raised0"
      style={{ animationDelay: delay }}
    />
  );
}
