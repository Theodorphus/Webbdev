export const industries = [
  { id: 'restaurant', label: 'Restaurang & café', symbol: '↗', eyebrow: 'Mat, människor & minnesvärda stunder', title: 'En plats att längta tillbaka till.', intro: 'Säsongens smaker, omtanke i varje detalj och plats för långa samtal. Välkommen till oss.', cta: 'Boka ett bord', section: 'Små stunder. Stora smaker.', items: ['Vid lunchbordet', 'En kväll tillsammans', 'Något att fira'], descriptions: ['En paus mitt i dagen, med något riktigt gott på tallriken.', 'Samlas runt säsongens smaker och låt kvällen ta sin tid.', 'Gör plats för födelsedagar, middagar och era speciella tillfällen.'], image: '/demo/restaurant.webp', alt: 'Dukat restaurangbord med mat och vinglas', contact: 'Vi dukar för dig.', contactText: 'En middag för två eller ett större sällskap? Vi hjälper dig att planera besöket.' },
  { id: 'building', label: 'Bygg & hantverk', symbol: '⌂', eyebrow: 'Genomtänkt från första skiss till sista detalj', title: 'Rum för livet du vill leva.', intro: 'Från en första idé till ett hem att trivas i. Vi hjälper dig att förverkliga ditt nästa byggprojekt.', cta: 'Berätta om ditt projekt', section: 'Dina idéer. Vårt hantverk.', items: ['Renovering', 'Tillbyggnad', 'Detaljer som håller'], descriptions: ['Ge det du redan älskar nya möjligheter.', 'Skapa utrymme för nästa kapitel i livet.', 'Omsorg om materialen, uttrycket och helheten.'], image: '/demo/building.webp', alt: 'Modern villa med stora fönster och en grön trädgård', contact: 'Vad vill du skapa?', contactText: 'Berätta om din idé, så pratar vi om hur vi kan ta den vidare tillsammans.' },
  { id: 'beauty', label: 'Skönhet & välmående', symbol: '✳', eyebrow: 'Din stund. Ditt uttryck.', title: 'Lite mer tid för dig.', intro: 'Landa en stund och låt oss ta hand om detaljerna. Här börjar en upplevelse med dig i centrum.', cta: 'Hitta din behandling', section: 'Omtanke i varje detalj.', items: ['En ny känsla', 'Tid för återhämtning', 'Personlig rådgivning'], descriptions: ['Upptäck en behandling som lyfter ditt personliga uttryck.', 'Ge dig själv en välförtjänt paus i en lugn miljö.', 'Tillsammans hittar vi det som passar just dig.'], image: '/demo/beauty.webp', alt: 'Ljus salong med speglar och salongsstolar', contact: 'Din nästa stund börjar här.', contactText: 'Nyfiken på en behandling? Hör av dig så hjälper vi dig att hitta rätt.' },
  { id: 'consulting', label: 'Konsult & tjänster', symbol: '↗', eyebrow: 'Nya perspektiv. Tydlig riktning.', title: 'Nästa steg börjar med rätt partner.', intro: 'Vi gör komplexa frågor tydligare och hjälper din verksamhet att gå från tanke till handling.', cta: 'Boka ett första samtal', section: 'Från insikt till förändring.', items: ['Strategi & riktning', 'Utveckling tillsammans', 'Från plan till praktik'], descriptions: ['Vi sätter ord på målen och hittar vägen framåt.', 'Nya perspektiv som möter din verksamhets vardag.', 'Stöd genom arbetet, från första idé till nästa steg.'], image: '/demo/consulting.webp', alt: 'Ljust kontor med gröna växter och gemensamma arbetsytor', contact: 'Låt oss tänka framåt.', contactText: 'Vilken utmaning vill du ta tag i? Ett första samtal är en bra början.' },
  { id: 'other', label: 'Annan verksamhet', symbol: '◇', eyebrow: 'Personligt engagemang. Nya möjligheter.', title: 'Stora idéer börjar med ett hej.', intro: 'Vi tror på nära samarbeten, genomtänkta lösningar och detaljer som gör skillnad för dig.', cta: 'Lär känna oss', section: 'Det här kan vi göra för dig.', items: ['Dina möjligheter', 'Ett nära samarbete', 'Nästa steg'], descriptions: ['Vi börjar med att förstå vad du vill uppnå.', 'En personlig kontakt genom hela resan.', 'Tillsammans ger vi dina idéer en tydlig riktning.'], image: '/demo/consulting.webp', alt: 'Ljus arbetsplats med öppna ytor och växter', contact: 'Vad har du på gång?', contactText: 'Berätta om dina tankar. Vi ser fram emot att lära känna dig.' },
] as const;

export const styles = [
  { id: 'clean', name: 'Stilren', description: 'Luftigt & skandinaviskt', sample: 'Aa', background: '#f6f5f0', foreground: '#222b28' },
  { id: 'bold', name: 'Färgstark', description: 'Uttrycksfullt & modernt', sample: 'Aa', background: '#f1edff', foreground: '#282238' },
  { id: 'exclusive', name: 'Exklusiv', description: 'Mörkt & redaktionellt', sample: 'Aa', background: '#19231f', foreground: '#f6f0e5' },
] as const;

export const palettes = [
  { id: 'forest', name: 'Skog', color: '#315c48', light: '#b3cfb2', wash: '#edf3e9' },
  { id: 'clay', name: 'Terrakotta', color: '#9a4835', light: '#edb49c', wash: '#fff0e7' },
  { id: 'violet', name: 'Lavendel', color: '#6841ae', light: '#ccb8f5', wash: '#f1edff' },
  { id: 'ocean', name: 'Hav', color: '#275b83', light: '#a6cbe6', wash: '#e9f2fa' },
  { id: 'sand', name: 'Sand', color: '#76603b', light: '#ddc89c', wash: '#f6f0e5' },
] as const;

export const needs = ['Presentera tjänster', 'Kontaktformulär', 'Bokning', 'Bildgalleri', 'Webbshop', 'Jag vill ha hjälp att välja'];
export type Design = { company: string; industry: string; style: string; palette: string; needs: string[] };
export const initialDesign: Design = { company: '', industry: 'restaurant', style: 'clean', palette: 'forest', needs: [] };
export const DRAFT_KEY = 'webbdev-demo-v2';

// Both saved drafts and shared links are untrusted browser input.
export function parseDesign(value: unknown): Design | null {
  if (!value || typeof value !== 'object') return null;
  const data = value as Record<string, unknown>;
  if (typeof data.company !== 'string' || data.company.length > 150 ||
    !industries.some(item => item.id === data.industry) ||
    !styles.some(item => item.id === data.style) ||
    !palettes.some(item => item.id === data.palette) ||
    !Array.isArray(data.needs) || data.needs.length > needs.length ||
    !data.needs.every(item => typeof item === 'string' && needs.includes(item))) return null;
  return { company: data.company, industry: data.industry as string, style: data.style as string, palette: data.palette as string, needs: [...new Set(data.needs as string[])] };
}

export function designHash(design: Design): string {
  return `#design=${encodeURIComponent(JSON.stringify(design))}`;
}
