import type { Metadata } from "next";
import { SeoLandingPage, type SeoPageConfig } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Zedník Praha — ověřený, s termínem do 24 hodin | Řemeslník.app",
  description: "Hledáte zedníka v Praze? Napište nám co potřebujete a do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
  openGraph: {
    title: "Zedník Praha — ověřený, s termínem do 24 hodin",
    description: "Hledáte zedníka v Praze? Do 24 hodin máte 3 nabídky od ověřených řemeslníků. Zdarma, bez závazku.",
    locale: "cs_CZ",
    type: "website",
  },
  alternates: { canonical: "https://remeslnik.app/zednik-praha" },
};

const config: SeoPageConfig = {
  obor: "Zedník",
  oborGen: "zedníka",
  h1: "Zedník Praha — ověřený, s termínem do 24 hodin",
  heroDesc: "Obkladačské práce, oprava omítek, příčky ze sádrokartonu nebo kompletní rekonstrukce koupelny? Popište nám práci a do 24 hodin máte 3 nabídky od prověřených zedníků v Praze. Zdarma, bez závazku.",
  typPrace: "Zednické a obkladačské práce",
  iconEmoji: "🏗️",
  benefits: [
    { icon: "🔍", title: "Prověřené reference", desc: "Každý zedník má ověřenou živnost a reálná hodnocení od zákazníků v Praze." },
    { icon: "📐", title: "Přesná kalkulace", desc: "Zedník přijde na prohlídku a dá vám přesnou cenu za práci i materiál — žádná paušální habaďůra." },
    { icon: "🏗️", title: "Komplexní práce", desc: "Obklady, dlažba, omítky, příčky, stropy i hrubá stavba. Jeden zedník, kompletní řešení." },
    { icon: "📍", title: "Celá Praha", desc: "Máme zedníky ve všech pražských čtvrtích — byty, domy i kanceláře." },
    { icon: "🛡️", title: "Bez závazků", desc: "Nabídky dostanete zdarma. Přijmete tu, která vám vyhovuje — nebo žádnou." },
    { icon: "⏱️", title: "Termín bez čekání", desc: "Nečekáte měsíce. Doporučíme zedníka s reálnou kapacitou pro vaše práce." },
  ],
  faq: [
    { q: "Kolik stojí zedník v Praze?", a: "Hodinová sazba zedníka v Praze se pohybuje od 500 do 1 000 Kč/hod. Obkladačské práce bývají od 400 Kč/m². Celková cena závisí na rozsahu práce, materiálu a složitosti. Přes Řemeslník.app dostanete 3 srovnatelné nabídky." },
    { q: "Jak dlouho trvá rekonstrukce koupelny?", a: "Rekonstrukce koupelny (demontáž, obklady, dlažba, instalace) trvá obvykle 5–10 pracovních dní, závisí na velikosti a rozsahu. Zedník vám dá přesný harmonogram po prohlídce." },
    { q: "Potřebuji pro stavební práce povolení?", a: "Záleží na rozsahu. Většina interiérových prací (příčky, obklady, omítky) povolení nevyžaduje. Pro bourání nosných zdí nebo přístavby ano. Rádi poradíme." },
    { q: "Může zedník dodat materiál?", a: "Ano. Většina zedníků zajistí i materiál a zahrne ho do ceny. Jinak přinesete materiál vy a platíte jen práci. V poptávce uveďte preferenci." },
  ],
  testimonials: [
    { name: "Radek H.", location: "Praha 4", rating: 5, text: "Rekonstrukce koupelny na klíč. Obklady, dlažba i instalace. Přesný termín, skvělá práce, cena odpovídala nabídce." },
    { name: "Mirka V.", location: "Praha 9", rating: 4, text: "Oprava trhlin ve zdech a nová sádrová omítka v obýváku. Práce trvala 3 dny, výsledek je hladký a čistý. Doporučuji." },
    { name: "Pavel Č.", location: "Praha 7", rating: 5, text: "Pokládka dlažby na terase (18 m²). Zedník přišel přesně, materiál si přivezl sám a výsledek je perfektní. Rychlé a profesionální." },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Zedník Praha",
    description: "Prověření zedníci v Praze do 24 hodin. Poptávka zdarma, bez závazku.",
    provider: { "@type": "LocalBusiness", name: "Řemeslník.app", url: "https://remeslnik.app" },
    areaServed: { "@type": "City", name: "Praha" },
    serviceType: "Zednické a obkladačské práce",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CZK", description: "Poptávka zdarma" },
  },
};

export default function ZednikPrahaPage() {
  return <SeoLandingPage config={config} />;
}
