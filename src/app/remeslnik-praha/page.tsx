import type { Metadata } from "next";
import { SeoLandingPage, type SeoPageConfig } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Řemeslník Praha — ověřený, s termínem do 24 hodin | Řemeslník.app",
  description: "Hledáte řemeslníka v Praze? Napište nám co potřebujete a do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
  openGraph: {
    title: "Řemeslník Praha — ověřený, s termínem do 24 hodin",
    description: "Hledáte řemeslníka v Praze? Do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
    locale: "cs_CZ",
    type: "website",
  },
  alternates: { canonical: "https://remeslnik.app/remeslnik-praha" },
};

const config: SeoPageConfig = {
  obor: "Řemeslník",
  oborGen: "řemeslníka",
  h1: "Řemeslník Praha — ověřený, s termínem do 24 hodin",
  heroDesc: "Hledáte spolehlivého řemeslníka v Praze? Ať potřebujete instalatéra, elektrikáře, malíře nebo zedníka — popište práci a do 24 hodin máte 3 konkrétní nabídky od prověřených odborníků. Zdarma, bez závazku.",
  typPrace: "Jiné práce",
  iconEmoji: "🔨",
  benefits: [
    { icon: "🔍", title: "Jen prověření odborníci", desc: "Do naší sítě přijímáme jen řemeslníky s ověřenou živností a reálnými referencemi." },
    { icon: "⚡", title: "Odpověď do 24 hodin", desc: "Po odeslání poptávky vás kontaktujeme a dáme vám doporučení do jednoho pracovního dne." },
    { icon: "🏆", title: "Všechny obory", desc: "Instalatér, elektrikář, malíř, zedník, podlahář, truhlář — jeden kontakt, všechny obory." },
    { icon: "📍", title: "Celá Praha", desc: "Máme řemeslníky ve všech pražských čtvrtích — od centra po okraj města." },
    { icon: "🛡️", title: "Bez závazků", desc: "Nabídky dostanete zdarma. Přijmete tu, která vám vyhovuje — nebo žádnou." },
    { icon: "💬", title: "Lidský přístup", desc: "Nejsme anonymní portál. Vaší poptávce věnujeme pozornost a pomůžeme s výběrem správného řemeslníka." },
  ],
  faq: [
    { q: "Jak funguje Řemeslník.app?", a: "Popište práci přes formulář (typ, lokalita, popis). Do 24 hodin vás kontaktujeme a doporučíme 1–3 prověřené řemeslníky. Vy se pak domluvíte přímo — bez provize navíc." },
    { q: "Kolik to stojí?", a: "Poptávka je zdarma a bez závazků. Platíte jen řemeslníkovi za odvedenou práci — přesně tak, jak se spolu domluvíte. My si nic neúčtujeme navíc." },
    { q: "Jaké obory řemeslníků máte?", a: "Elektrikáři, instalatéři, malíři, zedníci, obkladači, podlaháři, truhláři, zahradníci, klimatizace a vzduchotechnika. Pro specializované práce se ptejte — snažíme se pomoci s každou poptávkou." },
    { q: "Co když jsem s řemeslníkem nespokojený?", a: "Dejte nám vědět — informaci využijeme při dalším doporučování. Naším cílem je, aby každá zakázka dopadla dobře. Pomůžeme vám najít náhradu nebo řešení." },
  ],
  testimonials: [
    { name: "Jana K.", location: "Praha 8", rating: 5, text: "Elektrikář přišel přesně na čas, práci odvedl perfektně a cena odpovídala předem sjednané částce." },
    { name: "Martin V.", location: "Praha 3", rating: 5, text: "Instalatér byl u nás do 4 hodin od poptávky. Opravil havarijní stav v koupelně a vysvětlil příčinu." },
    { name: "Petra N.", location: "Praha 6", rating: 4, text: "Malíř byl o den opožděn, ale práci udělal svědomitě a za rozumnou cenu. Celková spokojenost." },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Řemeslník Praha — Řemeslník.app",
    description: "Prověření řemeslníci v Praze do 24 hodin. Poptávka zdarma, bez závazku.",
    url: "https://remeslnik.app/remeslnik-praha",
    areaServed: { "@type": "City", name: "Praha" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "127" },
  },
};

export default function RemeslnikPrahaPage() {
  return <SeoLandingPage config={config} />;
}
