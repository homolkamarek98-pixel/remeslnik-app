import type { Metadata } from "next";
import { SeoLandingPage, type SeoPageConfig } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Rekonstrukce bytu Praha — ověřený tým, s termínem do 24 hodin | Řemeslník.app",
  description: "Plánujete rekonstrukci bytu v Praze? Napište nám co potřebujete a do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
  openGraph: {
    title: "Rekonstrukce bytu Praha — ověřený tým, s termínem do 24 hodin",
    description: "Plánujete rekonstrukci bytu v Praze? Do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
    locale: "cs_CZ",
    type: "website",
  },
  alternates: { canonical: "https://remeslnik.app/rekonstrukce-bytu-praha" },
};

const config: SeoPageConfig = {
  obor: "Rekonstrukce bytu",
  oborGen: "tým na rekonstrukci",
  h1: "Rekonstrukce bytu Praha — ověřený tým, s termínem do 24 hodin",
  heroDesc: "Chystáte rekonstrukci koupelny, kuchyně nebo celého bytu v Praze? Popište nám rozsah práce a do 24 hodin máte 3 nabídky od prověřených řemeslnických týmů. Zdarma, bez závazku.",
  typPrace: "Jiné práce",
  iconEmoji: "🏠",
  benefits: [
    { icon: "🔍", title: "Prověřené týmy", desc: "Spolupracujeme s řemeslníky, kteří mají ověřenou živnost a reálné reference od zákazníků v Praze." },
    { icon: "📋", title: "Koordinace na klíč", desc: "Pomůžeme vám sestavit tým — instalatér, elektrikář, malíř, zedník — bez nutnosti shánění každého zvlášť." },
    { icon: "💰", title: "Přesná cenová nabídka", desc: "Řemeslník přijde na prohlídku a dá vám přesnou cenu za práci — bez překvapení v průběhu." },
    { icon: "📍", title: "Celá Praha", desc: "Máme řemeslníky ve všech pražských čtvrtích. Od Prahy 1 po Prahu 22." },
    { icon: "🛡️", title: "Bez závazků", desc: "Nabídky dostanete zdarma. Přijmete tu, která vám vyhovuje — nebo žádnou." },
    { icon: "⏱️", title: "Reálný termín", desc: "Neslibujeme termíny, které nejdou dodržet. Doporučíme řemeslníka s reálnou dostupností pro váš projekt." },
  ],
  faq: [
    { q: "Kolik stojí rekonstrukce bytu v Praze?", a: "Závisí na rozsahu. Rekonstrukce koupelny stojí typicky 80 000–200 000 Kč (práce + materiál). Rekonstrukce celého bytu 2+1 pak 300 000–800 000 Kč a více. Přesnou cenu dostanete po prohlídce." },
    { q: "Jak dlouho rekonstrukce trvá?", a: "Koupelna: 2–4 týdny. Kuchyně: 1–3 týdny. Celý byt: 2–4 měsíce. Závisí na rozsahu, dostupnosti materiálu a počtu řemeslníků na projektu." },
    { q: "Potřebuji stavební povolení?", a: "Interiérové rekonstrukce (koupelna, kuchyně, malování) povolení nevyžadují. Bourání nosných zdí, přístavby nebo změna dispozice bytu povolení mohou vyžadovat. Rádi poradíme." },
    { q: "Jak postupovat při rekonstrukci bytu v paneláku?", a: "V paneláku je třeba dbát na nosné zdi a schválit bourací práce se správcem. Doporučujeme začít prohlídkou a konzultací s řemeslníkem, který má s panelákovými rekonstrukcemi zkušenosti." },
  ],
  testimonials: [
    { name: "Eva S.", location: "Praha 5", rating: 5, text: "Rekonstrukce koupelny na klíč — bourání, obklady, dlažba, instalatér, malíř. Vše koordinováno přes Řemeslník.app. Skvělý výsledek za 3 týdny." },
    { name: "Jiří D.", location: "Praha 2", rating: 5, text: "Kompletní rekonstrukce bytu 2+1. Tým instalatéra, elektrikáře a malíře. Přesný termín, přesná cena. Velmi doporučuji." },
    { name: "Zuzana F.", location: "Praha 8", rating: 4, text: "Rekonstrukce kuchyně včetně elektřiny a vody. Trvalo o týden déle, ale výsledek za to stál. Dobré ceny a profesionální přístup." },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rekonstrukce bytu Praha",
    description: "Prověření řemeslníci na rekonstrukci bytu v Praze do 24 hodin. Poptávka zdarma, bez závazku.",
    provider: { "@type": "LocalBusiness", name: "Řemeslník.app", url: "https://remeslnik.app" },
    areaServed: { "@type": "City", name: "Praha" },
    serviceType: "Rekonstrukce bytu",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CZK", description: "Poptávka zdarma" },
  },
};

export default function RekonstrukcePrahaPage() {
  return <SeoLandingPage config={config} />;
}
