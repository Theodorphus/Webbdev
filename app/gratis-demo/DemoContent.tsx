'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import DemoPreview from './DemoPreview';
import { DRAFT_KEY, designHash, industries, initialDesign, needs, palettes, parseDesign, styles, type Design } from './demo-model';
import css from './demo.module.css';
import { trackConversion } from '../lib/analytics';

const steps = ['Företag', 'Uttryck', 'Innehåll', 'Din demo'];
const inputClass = 'mt-2 w-full rounded-xl border border-white/15 bg-[#090910] px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent-light';
const primaryClass = 'inline-flex items-center justify-center gap-3 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#7773ff] disabled:cursor-wait disabled:opacity-60';
const subtleButton = 'rounded-lg px-3 py-2 text-xs text-white/65 transition-colors hover:bg-white/10 hover:text-white';

export default function DemoContent() {
  const [design, setDesign] = useState<Design>(initialDesign);
  const [step, setStep] = useState(0);
  const [website, setWebsite] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [mobile, setMobile] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<'settings' | 'preview'>('settings');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [storageReady, setStorageReady] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [shareFallback, setShareFallback] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const sending = useRef(false);
  const started = useRef(false);
  const completedSteps = useRef(new Set<number>());
  const savedOnce = useRef(false);
  const previousOverflow = useRef('');
  const industry = industries.find(item => item.id === design.industry) ?? industries[0];
  const selectedStyle = styles.find(item => item.id === design.style) ?? styles[0];
  const palette = palettes.find(item => item.id === design.palette) ?? palettes[0];

  useEffect(() => {
    function restore() {
      let next: Design | null = null;
      let message = '';
      if (window.location.hash.startsWith('#design=')) {
        try {
          if (window.location.hash.length > 6000) throw new Error('Oversized link');
          next = parseDesign(JSON.parse(decodeURIComponent(window.location.hash.slice(8))));
          if (!next) throw new Error('Invalid design');
          message = 'Delad design öppnad. Gör den till din egen.';
        } catch { message = 'Länken kunde inte läsas. Du kan skapa en ny design här.'; }
      }
      if (!next) {
        try {
          const stored = localStorage.getItem(DRAFT_KEY);
          if (stored) {
            const draft = JSON.parse(stored);
            if (typeof draft.savedAt === 'number' && Date.now() - draft.savedAt < 30 * 24 * 60 * 60 * 1000) next = parseDesign(draft.design);
            if (next && !message) message = 'Välkommen tillbaka. Dina designval finns kvar.';
            if (!next) localStorage.removeItem(DRAFT_KEY);
          }
        } catch { /* Storage can be unavailable in private browsers. */ }
      }
      if (next) { setDesign(next); setStep(0); setStatus('idle'); savedOnce.current = true; }
      setSaveMessage(message);
      setStorageReady(true);
    }
    const timer = window.setTimeout(restore, 0);
    window.addEventListener('hashchange', restore);
    return () => { window.clearTimeout(timer); window.removeEventListener('hashchange', restore); document.body.style.overflow = previousOverflow.current; };
  }, []);

  useEffect(() => {
    if (!storageReady || status === 'success') return;
    const timer = window.setTimeout(() => {
      if (!savedOnce.current && JSON.stringify(design) === JSON.stringify(initialDesign)) return;
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ design, savedAt: Date.now() }));
        savedOnce.current = true;
        setSaveMessage('Designval sparade i den här webbläsaren.');
      } catch { setSaveMessage('Utkastet kan inte sparas här. Kopiera en designlänk för att behålla dina val.'); }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [design, storageReady, status]);

  function updateDesign(patch: Partial<Design>) {
    if (!started.current) { started.current = true; trackConversion('demo_started'); }
    setDesign(current => ({ ...current, ...patch }));
    setShareMessage(''); setShareFallback('');
    if (window.location.hash.startsWith('#design=')) window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function move(next: number) {
    setStep(next); setStatus('idle'); setMobilePanel('settings');
    requestAnimationFrame(() => heading.current?.focus());
  }

  function resetDraft() {
    started.current = false;
    completedSteps.current.clear();
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* Reset still works without storage. */ }
    savedOnce.current = false;
    setDesign(initialDesign);
    setWebsite(''); setDetails(''); setName(''); setEmail(''); setHoneypot('');
    setShareMessage(''); setShareFallback(''); setSaveMessage('Utkastet är rensat.');
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    move(0);
  }

  async function share() {
    const url = `${window.location.origin}/gratis-demo${designHash(design)}`;
    try { await navigator.clipboard.writeText(url); trackConversion('demo_shared'); setShareMessage('Designlänken är kopierad!'); setShareFallback(''); }
    catch { setShareFallback(url); setShareMessage('Kopiera länken nedan för att dela din design.'); }
  }

  function openPreview() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closePreview() {
    document.body.style.overflow = previousOverflow.current;
    dialog.current?.close();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      if (!started.current) { started.current = true; trackConversion('demo_started'); }
      if (!completedSteps.current.has(step)) { completedSteps.current.add(step); trackConversion('demo_step_completed', { step: step + 1 }); }
      move(step + 1); return;
    }
    if (!design.company.trim()) { move(0); return; }
    if (sending.current) return;
    sending.current = true;
    setStatus('sending'); setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(20_000),
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), company: honeypot,
          message: [
            'FÖRFRÅGAN: GRATIS DEMO', `Företag: ${design.company.trim()}`, `Bransch: ${industry.label}`,
            `Befintlig hemsida: ${website.trim() || 'Ingen angiven'}`, `Önskad stil: ${selectedStyle.name}`,
            `Färgpalett: ${palette.name} (${palette.color})`, `Behov: ${design.needs.join(', ') || 'Önskar rådgivning'}`,
            `Övriga önskemål: ${details.trim() || 'Inga angivna'}`,
            `Designlänk: ${window.location.origin}/gratis-demo${designHash(design)}`,
            'Önskar ett gratis designförslag för startsidan, utan köpkrav.',
          ].join('\n'),
        }),
      });
      if (!response.ok) throw new Error(response.status === 429 ? 'Du har skickat flera förfrågningar. Vänta en stund och försök igen.' : 'Det gick inte att skicka just nu. Försök igen eller mejla webbdevstudio@gmail.com.');
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* Best effort. */ }
      setSaveMessage('Din förfrågan är skickad och det lokala utkastet är rensat.');
      setStatus('success');
      trackConversion('demo_submitted', { industry: design.industry, style: design.style, palette: design.palette, feature_count: design.needs.length });
      requestAnimationFrame(() => heading.current?.focus());
    } catch (err) {
      setError(err instanceof Error && err.name !== 'TimeoutError' && err.name !== 'TypeError' ? err.message : 'Kunde inte nå servern. Försök igen eller mejla webbdevstudio@gmail.com.');
      setStatus('error');
      trackConversion('demo_error');
    } finally { sending.current = false; }
  }

  const deviceButtons = <div role="group" aria-label="Förhandsvisningens skärmstorlek" className="flex rounded-lg border border-white/10 bg-black/20 p-1">{[false, true].map(isMobile => <button type="button" key={String(isMobile)} onClick={() => setMobile(isMobile)} aria-pressed={mobile === isMobile} className={`rounded-md px-3 py-1.5 text-xs ${mobile === isMobile ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white'}`}>{isMobile ? 'Mobil' : 'Dator'}</button>)}</div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#19152e_0%,_#050509_55%)] pb-20">

      <main className="mx-auto max-w-[1440px] px-4 pt-28 sm:px-8 sm:pt-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className="font-mono text-[10px] uppercase tracking-[.24em] text-accent-light">Din idé. Ditt uttryck. Din nästa hemsida.</p><h1 className="font-display mt-4 text-[clamp(34px,4.2vw,58px)] font-bold leading-[1.06] tracking-tight">Tänk om det här<br />var <span className="text-accent-light">din hemsida.</span></h1><p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">Utforska stilar, hitta dina färger och se ditt företag ta form. Gillar du riktningen? Jag tar fram ett personligt designförslag – gratis.</p></div><div className="flex flex-wrap gap-4 pb-1 text-xs text-white/60"><span>✓ Ingen registrering</span><span>✓ Gratis designförslag</span><span>✓ Inget köpkrav</span></div></div>
        <div className={`${css.mobileSwitch} mb-4 gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5`} role="group" aria-label="Byggarens vy">{(['settings', 'preview'] as const).map(panel => <button type="button" key={panel} aria-pressed={mobilePanel === panel} onClick={() => setMobilePanel(panel)} className={`flex-1 rounded-lg px-3 py-3 text-sm font-medium ${mobilePanel === panel ? 'bg-accent text-white' : 'text-white/60'}`}>{panel === 'settings' ? 'Anpassa din sida' : 'Se din förhandsvisning ↗'}</button>)}</div>
        <div className={css.workspace}>
          <section aria-label="Anpassa och begär en gratis demo" className={`${css.controls} ${mobilePanel !== 'settings' ? css.mobileHidden : ''}`}>
            {status === 'success' ? <div role="status" className="py-8"><span aria-hidden="true" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl text-accent-light">✓</span><h2 ref={heading} tabIndex={-1} className="font-display mt-6 text-3xl font-bold">Din förfrågan är skickad!</h2><p className="mt-4 text-sm leading-relaxed text-white/65">Tack, {name.trim()}! Jag går igenom dina designval för {design.company.trim()} och återkommer till <strong className="break-all text-white">{email.trim()}</strong>.</p><p className="mt-4 text-sm leading-relaxed text-white/50">Nästa steg är ett personligt designförslag för din startsida. Du väljer själv om du vill gå vidare.</p><Link href="/portfolio" className={`${primaryClass} mt-8`}>Se tidigare projekt ↗</Link></div> : <>
              <ol aria-label="Formulärets steg" className="mb-7 grid grid-cols-4 gap-2">{steps.map((label, i) => <li key={label} aria-current={i === step ? 'step' : undefined} className={`text-[10px] ${i === step ? 'text-accent-light' : 'text-white/45'}`}><span className={`mb-2 block h-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-white/10'}`} />{i + 1}. {label}</li>)}</ol>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Steg {step + 1} av 4</p><h2 ref={heading} tabIndex={-1} className="font-display mt-2 text-2xl font-semibold leading-tight">{['Börja med dig.', 'Hitta din känsla.', 'Gör plats för det viktiga.', 'Låt mig göra den personlig.'][step]}</h2>
              <form onSubmit={submit} className="mt-5">
                <fieldset disabled={status === 'sending' || !storageReady} className="min-w-0 space-y-5"><legend className="sr-only">{steps[step]}</legend>
                  {step === 0 && <>
                    <label className="block text-xs font-medium">Företagsnamn *<input name="businessName" autoComplete="organization" required pattern=".*\S.*" maxLength={150} value={design.company} onChange={e => updateDesign({ company: e.target.value })} className={inputClass} placeholder="Vad heter ditt företag?" /></label>
                    <fieldset><legend className="mb-2 text-xs font-medium">Välj din bransch</legend><div className="space-y-2">{industries.map(item => <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors ${design.industry === item.id ? 'border-accent/70 bg-accent/10' : 'border-white/10 hover:border-white/25'}`}><span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-accent-light">{item.symbol}</span><span className="flex-1 text-xs">{item.label}</span><input type="radio" name="industry" value={item.id} checked={design.industry === item.id} onChange={() => updateDesign({ industry: item.id })} className="accent-[#a5a3ff]" /></label>)}</div></fieldset>
                    <label className="block text-xs">Nuvarande hemsida <span className="text-white/40">(valfritt)</span><input name="website" inputMode="url" autoComplete="url" maxLength={200} value={website} onChange={e => setWebsite(e.target.value)} className={inputClass} placeholder="www.dittforetag.se" /></label>
                  </>}
                  {step === 1 && <>
                    <p className="text-xs leading-relaxed text-white/55">Tre uttryck, fem färgpaletter. Prova dig fram – förhandsvisningen följer dina val.</p>
                    <fieldset><legend className="mb-3 text-xs font-medium">Designstil</legend><div className="grid grid-cols-3 gap-2">{styles.map(style => <label key={style.id} className={`cursor-pointer rounded-xl border p-2 ${design.style === style.id ? 'border-accent-light bg-accent/10' : 'border-white/10 hover:border-white/25'}`}><div className={`flex h-20 items-center justify-center rounded-lg text-4xl ${style.id === 'bold' ? 'font-black' : 'font-serif'}`} style={{ background: style.background, color: style.foreground }}>{style.sample}</div><span className="mt-3 flex items-center justify-between gap-1 text-[11px] font-medium">{style.name}<input type="radio" name="style" checked={design.style === style.id} onChange={() => updateDesign({ style: style.id })} className="accent-[#a5a3ff]" /></span><span className="mt-1 block text-[9px] leading-relaxed text-white/45">{style.description}</span></label>)}</div></fieldset>
                    <fieldset><legend className="mb-3 text-xs font-medium">Färgpalett <span className="text-white/45">/ {palette.name}</span></legend><div className="grid grid-cols-5 gap-2">{palettes.map(item => <label key={item.id} className={`cursor-pointer rounded-xl border px-1 py-3 text-center ${design.palette === item.id ? 'border-accent-light bg-white/5' : 'border-white/10'}`}><span className="mx-auto mb-2 block h-7 w-7 rounded-full border border-white/20" style={{ background: item.color, boxShadow: `inset -9px 0 ${item.light}` }} /><input type="radio" name="palette" aria-label={item.name} checked={design.palette === item.id} onChange={() => updateDesign({ palette: item.id })} className="accent-[#a5a3ff]" /></label>)}</div></fieldset>
                    <div className="rounded-xl bg-white/[0.03] p-4 text-xs leading-relaxed text-white/50">Typografi, färger och bildspråk samverkar. Det personliga designförslaget anpassas sedan efter ditt varumärke.</div>
                  </>}
                  {step === 2 && <>
                    <p className="text-xs leading-relaxed text-white/55">Vad vill du att besökarna ska kunna göra? Prova exempelvis ett galleri eller kontaktformulär och se sidan växa.</p>
                    <div className="space-y-2">{needs.map(need => <label key={need} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-xs ${design.needs.includes(need) ? 'border-accent/60 bg-accent/10' : 'border-white/10 hover:border-white/25'}`}><input type="checkbox" checked={design.needs.includes(need)} onChange={e => updateDesign({ needs: e.target.checked ? [...design.needs, need] : design.needs.filter(item => item !== need) })} className="h-4 w-4 accent-[#a5a3ff]" />{need}</label>)}</div>
                    <label className="block text-xs">Dina tankar <span className="text-white/40">(valfritt)</span><textarea name="details" rows={3} maxLength={1000} value={details} onChange={e => setDetails(e.target.value)} className={inputClass} placeholder="Mål, inspiration eller något som gör ditt företag speciellt …" /></label>
                  </>}
                  {step === 3 && <>
                    <p className="text-xs leading-relaxed text-white/60">Gillar du riktningen? Skicka dina val så tar jag fram ett gratis designförslag för din startsida.</p>
                    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4"><p className="break-words text-sm font-semibold">{design.company}</p><p className="mt-1 text-xs text-white/50">{industry.label}</p><div className="mt-4 flex items-center gap-2 text-xs"><span className="h-4 w-4 rounded-full" style={{ background: palette.light }} />{selectedStyle.name} · {palette.name}</div><p className="mt-3 text-xs leading-relaxed text-white/50">{design.needs.join(' · ') || 'Behov: vi hittar rätt tillsammans'}</p><button type="button" onClick={() => move(0)} className="mt-3 text-xs text-accent-light underline underline-offset-4">Ändra mina val</button></div>
                    <label className="block text-xs">Ditt namn *<input name="name" autoComplete="name" required pattern=".*\S.*" maxLength={150} value={name} onChange={e => setName(e.target.value)} className={inputClass} /></label>
                    <label className="block text-xs">E-post *<input name="email" type="email" autoComplete="email" required maxLength={200} value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="namn@foretag.se" /></label>
                    <p className="text-[11px] leading-relaxed text-white/45">Demon är ett designförslag för startsidan. Utveckling och publicering ingår inte. Jag använder dina uppgifter för att besvara förfrågan. <Link href="/integritetspolicy" target="_blank" rel="noopener noreferrer" className="text-accent-light underline">Integritetspolicy (ny flik)</Link>.</p>
                  </>}
                  <div className="hidden" aria-hidden="true"><label>Lämna tomt<input name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></label></div>
                </fieldset>
                {status === 'error' && <p role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</p>}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">{step > 0 ? <button type="button" disabled={status === 'sending'} onClick={() => move(step - 1)} className="py-2 text-xs text-white/60 hover:text-white disabled:opacity-40">← Tillbaka</button> : <span className="text-[10px] text-white/40">Helt utan köpkrav</span>}<button type="submit" disabled={status === 'sending' || !storageReady} className={primaryClass}>{status === 'sending' ? 'Skickar …' : step === 3 ? 'Begär min gratis demo ↗' : 'Fortsätt →'}</button></div>
              </form>
            </>}
            <div className="mt-6 border-t border-white/10 pt-4"><p className="text-[10px] leading-relaxed text-white/40">Designval sparas lokalt i 30 dagar. Kontaktuppgifter och fritext sparas inte.</p><p role="status" className="mt-2 text-[10px] text-accent-light">{saveMessage}</p>{status !== 'success' && <button type="button" disabled={status === 'sending'} onClick={resetDraft} className="mt-2 text-[10px] text-white/50 underline underline-offset-4 disabled:opacity-40">Börja om och rensa utkast</button>}</div>
          </section>

          <section aria-label="Liveförhandsvisning" className={`${css.stage} ${mobilePanel !== 'preview' ? css.mobileHidden : ''}`}>
            <div className={css.toolbar}><div className="flex items-center gap-2 text-xs"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /><span>Din förhandsvisning</span></div><div className="flex items-center gap-2">{deviceButtons}<button type="button" onClick={openPreview} className={subtleButton} aria-label="Öppna stor förhandsvisning">⤢ <span className="hidden sm:inline">Förstora</span></button></div></div>
            <div className={css.canvas}><DemoPreview design={design} mobile={mobile} /></div>
            <div className="border-t border-white/10 px-5 py-4"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[10px] text-white/50">{industry.label} <span className="mx-1 text-white/20">/</span> {selectedStyle.name} <span className="mx-1 text-white/20">/</span> {palette.name}</p><button type="button" onClick={share} className="text-xs font-medium text-accent-light hover:text-white">Kopiera designlänk ↗</button></div><p className="mt-2 text-[10px] leading-relaxed text-white/35">Stilexempel med exempeltexter och inspirationsbilder. Knappar och formulär i exemplet är illustrationer. Delningslänken innehåller företagsnamn och designval, inga kontaktuppgifter.</p><p role="status" className="mt-2 text-xs text-accent-light">{shareMessage}</p>{shareFallback && <label className="mt-2 block text-xs">Din designlänk<input readOnly value={shareFallback} onFocus={e => e.target.select()} className={inputClass} /></label>}</div>
          </section>
        </div>

        <section aria-labelledby="next-title" className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"><div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]"><div><p className="font-mono text-[10px] uppercase tracking-widest text-accent-light">Från inspiration till din egen sida</p><h2 id="next-title" className="font-display mt-3 text-2xl font-semibold">Det här är bara början.</h2><p className="mt-3 text-sm leading-relaxed text-white/50">Du väljer riktningen. Jag hjälper dig att göra den till något som känns som ditt företag.</p></div><div className="grid gap-6 sm:grid-cols-3">{[['01', 'Hitta ditt uttryck', 'Utforska stilar och färger. Spara länken eller visa din idé för en kollega.'], ['02', 'Få ett personligt förslag', 'Skicka din förfrågan. Jag återkommer om detaljer och tar fram ett designförslag för startsidan.'], ['03', 'Välj nästa steg', 'Vill du gå vidare pratar vi om omfattning och pris. Du har inget köpkrav.']].map(([number, title, text]) => <div key={number}><p className="font-mono text-xs text-accent-light">{number}</p><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-white/50">{text}</p></div>)}</div></div></section>
      </main>
      <dialog ref={dialog} className={css.dialog} aria-label="Stor förhandsvisning" onCancel={closePreview} onClose={() => { document.body.style.overflow = previousOverflow.current; }} onClick={event => { if (event.target === event.currentTarget) closePreview(); }}><div className={css.toolbar}><span className="text-sm">Din hemsida, på lite närmare håll.</span><div className="flex items-center gap-3">{deviceButtons}<button type="button" onClick={closePreview} className={subtleButton} autoFocus>Stäng ×</button></div></div><div className={css.canvas}><DemoPreview design={design} mobile={mobile} /></div><p className="px-5 py-3 text-[10px] text-white/50">Förhandsvisning av designriktning. Personligt innehåll och funktioner tas fram i nästa steg.</p></dialog>
    </div>
  );
}
