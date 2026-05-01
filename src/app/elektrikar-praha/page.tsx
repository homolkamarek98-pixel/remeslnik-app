import type { Metadata } from "next";
import { SeoLandingPage, type SeoPageConfig } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Elektrikář Praha — ověřený, s termínem do 24 hodin | Řemeslník.app",
  description: "Hledáte elektrikáře v Praze? Napište nám co potřebujete a do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
  openGraph: {
    title: "Elektrikář Praha — ověřený, s termínem do 24 hodin",
    description: "Hledáte elektrikáře v Praze? Do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
    locale: "cs_CZ",
    type: "website",
  },
  alternates: { canonical: "https://remeslnik.app/elektrikar-praha" },
};

const config: SeoPageConfig = {
  obor: "Elektrikář",
  oborGen: "elektrikáře",
  h1: "Elektrikář Praha — ověřený, s termínem do 24 hodin",
  heroDesc: "Výpadek proudu, výměna zásuvek, nová rozvaděčová skříň nebo elektrorevize? Popište nám problém a do 24 hodin máte 3 nabídky od prověřených elektrikářů v Praze. Zdarma, bez závazku.",
  typPrace: "Elektrikářské práce",
  iconEmoji: "⚡",
  benefits: [
    { icon: "🔍", title: "Certifikovaní odborníci", desc: "Každý elektrikář má platnou certifikaci ČSN 33 2000 a pojištění odpovědnosti." },
    { icon: "⚡", title: "Výjezd do 24 hodin", desc: "U elektrické havárie pomůžeme sehnat elektrikáře prioritně — nečekáte zbytečně." },
    { icon: "📋", title: "Revizní zpráva v ceně", desc: "Na vyžádání zajistíme elektrikáře, který po práci vystaví revizní zprávu pro pojišťovnu." },
    { icon: "📍", title: "Celá Praha", desc: "Máme elektrikáře ve všech pražských čtvrtích — od centra po okraj." },
    { icon: "🛡️", title: "Bez závazků", desc: "Nabídky dostanete zdarma. Přijmete tu, která vám vyhovuje — nebo žádnou." },
    { icon: "💬", title: "Jasná cena předem", desc: "Žádné skryté poplatky. Cenu domluvíte přímo s elektrikářem před zahájením práce." },
  ],
  faq: [
    { q: "Kolik stojí elektrikář v Praze?", a: "Hodinová sazba elektrikáře v Praze se pohybuje od 700 do 1 400 Kč/hod, závisí na druhu práce. Jednoduché práce (výměna zásuvky, jističe) bývají za paušál 800–1 500 Kč. Přes Řemeslník.app dostanete 3 srovnatelné nabídky." },
    { q: "Potřebuji po práci elektrikáře revizní zprávu?", a: "Při výměně rozvaděče, rekonstrukci elektroinstalace nebo nové přípojce ano. Při poptávce uveďte, zda revizní zprávu potřebujete — doporučíme elektrikáře s příslušným oprávněním." },
    { q: "Může elektrikář přijít o víkendu?", a: "Ano. Část elektrikářů v naší síti pracuje i o víkendu. Při poptávce uveďte preferovaný termín a my oslovíme dostupné odborníky." },
    { q: "Co mám udělat při výpadku elektřiny?", a: "Zkontrolujte jistič v rozvaděči — často stačí přepnout. Pokud problém trvá, zadejte poptávku nebo nám zavolejte. U havárie doporučujeme vypnout hlavní jistič a kontaktovat elektrikáře okamžitě." },
  ],
  testimonials: [
    { name: "Jana K.", location: "Praha 8", rating: 5, text: "Elektrikář přišel přesně na čas, práci odvedl perfektně a cena odpovídala předem sjednané částce." },
    { name: "Petr M.", location: "Praha 2", rating: 5, text: "Výměna celé elektroinstalace v bytě 3+1. Práce trvala 2 dny, výsledek je bezchybný. Skvělá komunikace." },
    { name: "Lucie N.", location: "Praha 6", rating: 5, text: "Potřebovala jsem revizi elektřiny při prodeji bytu. Elektrikář přišel druhý den, vše vyřídil rychle a profesionálně." },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Elektrikář Praha",
    description: "Prověření elektrikáři v Praze do 24 hodin. Poptávka zdarma, bez závazku.",
    provider: { "@type": "LocalBusiness", name: "Řemeslník.app", url: "https://remeslnik.app" },
    areaServed: { "@type": "City", name: "Praha" },
    serviceType: "Elektrikářské práce",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CZK", description: "Poptávka zdarma" },
  },
};

export default function ElektrikarPrahaPage() {
  return <SeoLandingPage config={config} />;
}
