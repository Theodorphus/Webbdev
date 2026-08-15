import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy — Webbdev Studio",
  description:
    "Så hanterar Webbdev Studio dina personuppgifter enligt GDPR. Vilka uppgifter som samlas in, varför, och dina rättigheter.",
  robots: { index: true, follow: true },
};

function IconBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IntegritetspolicyPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-indigo-300"
        >
          <span className="transition-transform group-hover:-translate-x-0.5"><IconBack /></span>
          Tillbaka till startsidan
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Juridik</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Integritetspolicy
        </h1>
        <p className="mt-4 text-sm text-white/60">
          Senast uppdaterad: {new Date().toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-12 space-y-10">
          <Section title="1. Personuppgiftsansvarig">
            <p>
              Webbdev Studio (enskild firma, org.nr 19950721-XXXX) är
              personuppgiftsansvarig för de uppgifter som behandlas via denna
              webbplats. Du når oss på{" "}
              <a href="mailto:webbdevstudio@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                webbdevstudio@gmail.com
              </a>{" "}
              eller 070‑952 58 22.
            </p>
          </Section>

          <Section title="2. Vilka uppgifter vi samlar in">
            <p>
              När du använder kontaktformuläret, offertformuläret eller chatten
              behandlar vi de uppgifter du själv anger:
            </p>
            <ul className="mt-3 space-y-2">
              <Li>Namn</Li>
              <Li>E-postadress eller annan kontaktuppgift</Li>
              <Li>Meddelanden, chatthistorik och projektinformation du skickar</Li>
            </ul>
            <p className="mt-3">
              Vi använder cookielös, aggregerad besöksstatistik via Vercel
              Analytics för att förstå hur webbplatsen används.
            </p>
          </Section>

          <Section title="3. Varför vi behandlar uppgifterna">
            <p>
              Kontaktuppgifter och meddelanden används för att besvara din
              förfrågan och för eventuell efterföljande kontakt om ett uppdrag.
              Den rättsliga grunden är vårt berättigade intresse av att kunna
              svara dig samt, vid ett uppdrag, fullgörande av avtal.
            </p>
          </Section>

          <Section title="4. Hur länge vi sparar uppgifterna">
            <p>
              Vi sparar din förfrågan så länge det är nödvändigt för att hantera
              dialogen och eventuellt uppdrag. Leder kontakten inte till något
              samarbete raderas uppgifterna inom rimlig tid.
            </p>
          </Section>

          <Section title="5. Vem som får ta del av uppgifterna">
            <p>
              För drift och funktioner används Vercel för hosting och statistik,
              Resend för e-post samt Anthropic för att generera svar i chatten.
              Det du skriver i chatten skickas därför till Anthropic. Skicka inte
              känsliga personuppgifter i formulären eller chatten.
            </p>
          </Section>

          <Section title="6. Dina rättigheter">
            <p>Enligt GDPR har du rätt att:</p>
            <ul className="mt-3 space-y-2">
              <Li>Begära ett utdrag över de uppgifter vi har om dig</Li>
              <Li>Få felaktiga uppgifter rättade</Li>
              <Li>Begära att dina uppgifter raderas</Li>
              <Li>Invända mot behandlingen</Li>
            </ul>
            <p className="mt-3">
              Kontakta oss på{" "}
              <a href="mailto:webbdevstudio@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                webbdevstudio@gmail.com
              </a>{" "}
              så hjälper vi dig. Du har även rätt att lämna klagomål till
              Integritetsskyddsmyndigheten (IMY).
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-white/90">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/60">{children}</div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400/60" />
      <span>{children}</span>
    </li>
  );
}
