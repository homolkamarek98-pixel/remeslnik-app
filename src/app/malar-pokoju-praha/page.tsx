import type { Metadata } from "next";
import { SeoLandingPage, type SeoPageConfig } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Malíř pokojů Praha — ověřený, s termínem do 24 hodin | Řemeslník.app",
  description: "Hledáte malíře pokojů v Praze? Napište nám co potřebujete a do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
  openGraph: {
    title: "Malíř pokojů Praha — ověřený, s termínem do 24 hodin",
    description: "Hledáte malíře pokojů v Praze? Do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
    locale: "cs_CZ",
    type: "website",
  },
  alternates: { canonical: "https://remeslnik.app/malar-pokoju-praha" },
};

const config: SeoPageConfig = {
  obor: "Malíř pokojů",
  oborGen: "malíře pokojů",
  h1: "Malíř pokojů Praha — ověřený, s termínem do 24 hodin",
  heroDesc: "Vymalování bytu, oprava prasklin na omítce, stěrkování nebo čerstvá barva před nastěhováním? Popište nám rozsah práce a do 24 hodin máte 3 nabídky od prověřených malířů v Praze. Zdarma, bez závazku.",
  typPrace: "Malování a natírání",
  iconEmoji: "🖌️",
  benefits: [
    { icon: "🔍", title: "Prověřené reference", desc: "Každý malíř má reálné hodnocení od zákazníků v Praze. Žádná anonymní firma bez historie." },
    { icon: "📐", title: "Přesná kalkulace", desc: "Malíř přijde na prohlídku a dá vám cenu za m² nebo paušál — bez překvapení po dokončení." },
    { icon: "🎨", title: "Poradíme s výběrem barev", desc: "Zkušení malíři vám poradí s výběrem barev, podkladů i strukturovaných omítek." },
    { icon: "📍", title: "Celá Praha", desc: "Máme malíře ve všech pražských čtvrtích — byty, domy, kanceláře." },
    { icon: "🛡️", title: "Bez závazků", desc: "Nabídky dostanete zdarma. Přijmete tu, která vám vyhovuje — nebo žádnou." },
    { icon: "⏱️", title: "Přesný termín", desc: "Domluvíte termín předem. Malíř ví, co od něj čekáte — žádné vágní \"přijdu příští týden\"." },
  ],
  faq: [
    { q: "Kolik stojí vymalování bytu v Praze?", a: "Cena za vymalování se pohybuje od 60 do 150 Kč/m² stěny (bez materiálu), závisí na počtu vrstev, stavu podkladu a výšce místnosti. U bytu 2+1 (cca 60 m² podlahy) počítejte s 5 000–12 000 Kč za práci." },
    { q: "Jak rychle malíř přijde?", a: "Do 24 hodin od poptávky máte nabídku. Samotný termín práce závisí na vytíženosti malíře — typicky 1–2 týdny dopředu, v sezóně (jaro, podzim) déle." },
    { q: "Musím si sám koupit barvy?", a: "Ne, malíř většinou přinese materiál a účtuje jej zvlášť. Při poptávce uveďte, zda chcete malíře s materiálem nebo jen práci — přizpůsobíme doporučení." },
    { q: "Maluje se do prázdného bytu nebo se musí vynést nábytek?", a: "Ideálně do prázdného bytu. Pokud nábytek vynést nejde, malíř ho překryje fólií. V poptávce uveďte, zda bude byt prázdný — ovlivňuje cenu." },
  ],
  testimonials: [
    { name: "Petra N.", location: "Praha 6", rating: 4, text: "Malíř byl o den opožděn, ale práci udělal svědomitě a za rozumnou cenu. Výsledek je hezký, celková spokojenost." },
    { name: "Alena P.", location: "Praha 10", rating: 5, text: "Vymalování celého bytu 3+1 zvládl za 2 dny. Přišel přesně, uklízel po sobě a cena odpovídala domluvě. Doporučuji." },
    { name: "Ondřej K.", location: "Praha 4", rating: 5, text: "Oprava prasklé omítky a přemalování obývacího pokoje. Skvělá práce, nebylo poznat, že tam byla prasklina. Rychle a čistě." },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Malíř pokojů Praha",
    description: "Prověření malíři pokojů v Praze do 24 hodin. Poptávka zdarma, bez závazku.",
    provider: { "@type": "LocalBusiness", name: "Řemeslník.app", url: "https://remeslnik.app" },
    areaServed: { "@type": "City", name: "Praha" },
    serviceType: "Malování a natírání",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CZK", description: "Poptávka zdarma" },
  },
};

export default function MalarPokojuPrahaPage() {
  return <SeoLandingPage config={config} />;
}
