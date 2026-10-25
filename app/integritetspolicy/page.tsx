import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import CookieSettingsButton from "../components/CookieSettingsButton";
import { business } from "../lib/business";
import { sharedOpenGraph } from "../lib/metadata";

// Uppdatera när policyns innehåll ändras (och samma datum i sitemap.ts).
const UPDATED = "2026-10-25";

export const metadata: Metadata = {
  // Layoutens title-template lägger till " | Webbdev Studio".
  title: "Integritetspolicy",
  description:
    "Så hanterar Webbdev Studio dina personuppgifter enligt GDPR. Vilka uppgifter som samlas in, varför, och dina rättigheter.",
  alternates: { canonical: "/integritetspolicy" },
  robots: { index: true, follow: true },
  openGraph: {
    ...sharedOpenGraph(),
    title: "Integritetspolicy — Webbdev Studio",
    description: "Så hanterar Webbdev Studio dina personuppgifter enligt GDPR.",
    url: "/integritetspolicy",
  },
};

export default function IntegritetspolicyPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-24">
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Breadcrumbs items={[{ name: "Integritetspolicy" }]} />

        <p className="studio-eyebrow mt-10">Juridik</p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Integritetspolicy
        </h1>
        <p className="mt-4 text-sm text-muted">
          Senast uppdaterad:{" "}
          <time dateTime={UPDATED}>
            {new Date(UPDATED).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
          </time>
        </p>

        <div className="mt-12 space-y-10">
          <Section title="1. Personuppgiftsansvarig">
            <p>
              {business.name} (enskild firma, org.nr {business.registrationNumber}) är
              personuppgiftsansvarig för de uppgifter som behandlas via denna
              webbplats. Du når oss på{" "}
              <a href="mailto:webbdevstudio@gmail.com" className="text-accent-light underline underline-offset-2">
                webbdevstudio@gmail.com
              </a>{" "}
              eller 070‑952 58 22.
            </p>
          </Section>

          <Section title="2. Vilka uppgifter vi samlar in">
            <p>
              När du använder kontaktformuläret, demobyggaren eller chatten
              behandlar vi de uppgifter du själv anger:
            </p>
            <ul className="mt-3 space-y-2">
              <Li>Namn</Li>
              <Li>E-postadress eller annan kontaktuppgift</Li>
              <Li>Meddelanden, chatthistorik och projektinformation du skickar</Li>
            </ul>
            <p className="mt-3">
              Demobyggaren sparar företagsnamn och designval lokalt i din
              webbläsare så att du kan fortsätta med ditt utkast i upp till
              30 dagar. Du kan rensa utkastet i byggaren. Kontaktuppgifter
              och fritext sparas inte i utkastet. Om du delar en designlänk
              kan mottagaren se företagsnamnet och designvalen i länken.
            </p>
            <p className="mt-3">
              Ditt val av ljust, mörkt eller systemanpassat tema sparas lokalt i
              webbläsaren tills du ändrar valet eller rensar webbplatsens data.
              Temavalet skickas inte till oss.
            </p>
            <p className="mt-3">
              Vi använder cookielös, aggregerad besöksstatistik via Vercel
              Analytics för att förstå hur webbplatsen används. Vi mäter även
              när demobyggaren och priskalkylatorn används och när en förfrågan
              skickas. Dessa mäthändelser innehåller inte namn, e-post, fritext
              eller innehållet i delade designlänkar.
            </p>
          </Section>

          <Section title="3. Annonsmätning och cookies">
            <p>Om du godkänner annonsmätning laddar vi Google Ads för att mäta om annonser leder till kontaktförfrågningar. Google kan då använda cookies och behandla teknisk information om ditt besök och annonsklick. Vi skickar inte namn, e-postadress eller meddelanden från formuläret till Google.</p>
            <p>
              Google-taggen laddas först efter ditt samtycke. Ditt val sparas lokalt i webbläsaren tills du ändrar det eller rensar webbplatsens data. Du kan när som helst ändra eller återkalla samtycket via{" "}
              <CookieSettingsButton className="text-accent-light underline underline-offset-2">Cookieinställningar</CookieSettingsButton>
              , som också finns längst ned på varje sida. Återkallelse stoppar nya konverteringshändelser men tar inte bort uppgifter som redan skickats.
            </p>
            <p>Läs mer om Googles behandling i <a className="underline underline-offset-2" href="https://policies.google.com/privacy">Googles integritetspolicy</a>.</p>
          </Section>

          <Section title="4. Varför vi behandlar uppgifterna">
            <p>
              Kontaktuppgifter och meddelanden används för att besvara din
              förfrågan och för eventuell efterföljande kontakt om ett uppdrag.
              Den rättsliga grunden är vårt berättigade intresse av att kunna
              svara dig samt, vid ett uppdrag, fullgörande av avtal.
              Annonsmätning sker endast med ditt samtycke.
            </p>
          </Section>

          <Section title="5. Hur länge vi sparar uppgifterna">
            <p>
              Vi sparar din förfrågan så länge det är nödvändigt för att hantera
              dialogen och eventuellt uppdrag. Leder kontakten inte till något
              samarbete raderas uppgifterna inom rimlig tid.
            </p>
          </Section>

          <Section title="6. Vem som får ta del av uppgifterna">
            <p>
              För drift och funktioner används Vercel för hosting och statistik,
              Resend för att skicka e-post samt Anthropic för att generera svar
              i chatten. Förfrågningar från formulären och chatten tas emot i
              vår e-postinkorg hos Google (Gmail). Det du skriver i chatten
              skickas till Anthropic. Skicka inte känsliga personuppgifter i
              formulären eller chatten.
            </p>
            <p>
              Leverantörerna är amerikanska företag, och uppgifterna kan därför
              behandlas utanför EU/EES.
            </p>
          </Section>

          <Section title="7. Dina rättigheter">
            <p>Enligt GDPR har du rätt att:</p>
            <ul className="mt-3 space-y-2">
              <Li>Begära ett utdrag över de uppgifter vi har om dig</Li>
              <Li>Få felaktiga uppgifter rättade</Li>
              <Li>Begära att dina uppgifter raderas</Li>
              <Li>Begära att behandlingen begränsas</Li>
              <Li>Invända mot behandlingen</Li>
              <Li>Få ut uppgifter du lämnat i ett maskinläsbart format (dataportabilitet)</Li>
              <Li>När som helst återkalla ett samtycke, till exempel till annonsmätning</Li>
            </ul>
            <p className="mt-3">
              Kontakta oss på{" "}
              <a href="mailto:webbdevstudio@gmail.com" className="text-accent-light underline underline-offset-2">
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
      <h2 className="font-display text-lg font-bold text-foreground/90">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
      <span>{children}</span>
    </li>
  );
}
