import type { Metadata } from "next";
import { SeoLandingPage, type SeoPageConfig } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Instalatér Praha — ověřený, s termínem do 24 hodin | Řemeslník.app",
  description: "Hledáte instalatéra v Praze? Napište nám co potřebujete a do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
  openGraph: {
    title: "Instalatér Praha — ověřený, s termínem do 24 hodin",
    description: "Hledáte instalatéra v Praze? Do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
    locale: "cs_CZ",
    type: "website",
  },
  alternates: { canonical: "https://remeslnik.app/instalater-praha" },
};

const config: SeoPageConfig = {
  obor: "Instalatér",
  oborGen: "instalatéra",
  h1: "Instalatér Praha — ověřený, s termínem do 24 hodin",
  heroDesc: "Prasklá trubka, výměna baterie, instalace bojleru nebo rekonstrukce koupelny? Napište nám a do 24 hodin máte 3 konkrétní nabídky od prověřených instalatérů v Praze. Zdarma, bez závazku.",
  typPrace: "Instalatérské a topenářské práce",
  iconEmoji: "🔧",
  benefits: [
    { icon: "🔍", title: "Prověřená živnost", desc: "Každý instalatér má ověřenou živnost a reálné reference od zákazníků v Praze." },
    { icon: "⚡", title: "Do 24 hodin", desc: "Poptávku vyřídíme rychle. U havárie voláme instalatéra okamžitě." },
    { icon: "💰", title: "Přesná cena předem", desc: "Žádné překvapení. Cenu domluvíte s instalatérem před zahájením práce." },
    { icon: "📍", title: "Celá Praha", desc: "Máme instalatéry ve všech pražských čtvrtích — od Prahy 1 po okraj města." },
    { icon: "🛡️", title: "Bez závazků", desc: "Nabídky dostanete zdarma. Přijmete tu, která vám vyhovuje — nebo žádnou." },
    { icon: "💬", title: "Osobní přístup", desc: "Nejsme anonymní portál. Vaší poptávce věnujeme pozornost a pomůžeme s výběrem." },
  ],
  faq: [
    { q: "Kolik stojí instalatér v Praze?", a: "Hodinová sazba instalatéra v Praze se pohybuje od 600 do 1 200 Kč/hod, závisí na druhu práce a lokalitě. Materiál se účtuje zvlášť. Přes Řemeslník.app dostanete 3 nabídky se srovnatelnými cenami." },
    { q: "Jak rychle přijde instalatér?", a: "U standardní poptávky máte nabídku do 24 hodin. U havarijního stavu (prasklé potrubí, zápach plynu) volejte přímo — pomůžeme vám sehnat instalatéra na místě co nejrychleji." },
    { q: "Potřebuji instalatéra s atestací na plyn?", a: "Ano, práce na plynovém potrubí musí provádět certifikovaný odborník. Při poptávce uveďte, že se jedná o plynárenské práce — doporučíme vám instalatéra s příslušnou atestací." },
    { q: "Co mám uvést v poptávce?", a: "Stačí popsat, co je potřeba opravit nebo vyměnit, uvést lokalitu (Praha a číslo části) a orientační termín. Čím více detailů, tím přesnější nabídku dostanete." },
  ],
  testimonials: [
    { name: "Martin V.", location: "Praha 3", rating: 5, text: "Instalatér byl u nás do 4 hodin od poptávky. Opravil havarijní stav v koupelně a vysvětlil příčinu. Přesně cena, jakou říkal." },
    { name: "Jana K.", location: "Praha 8", rating: 5, text: "Výměna celé baterie v kuchyni i koupelně. Přišel v sobotu, cena odpovídala domluvě. Doporučuji." },
    { name: "Tomáš B.", location: "Praha 5", rating: 4, text: "Rekonstrukce koupelny včetně instalatérských prací. Trvalo o den déle, ale výsledek je perfektní. Celková spokojenost." },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Instalatér Praha",
    description: "Prověření instalatéři v Praze do 24 hodin. Poptávka zdarma, bez závazku.",
    provider: { "@type": "LocalBusiness", name: "Řemeslník.app", url: "https://remeslnik.app" },
    areaServed: { "@type": "City", name: "Praha" },
    serviceType: "Instalatérské a topenářské práce",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CZK", description: "Poptávka zdarma" },
  },
};

export default function InstalaterPrahaPage() {
  return <SeoLandingPage config={config} />;
}
