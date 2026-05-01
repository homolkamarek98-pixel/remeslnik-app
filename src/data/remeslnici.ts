export interface PortfolioPhoto {
  src: string;
  alt: string;
}

export interface Review {
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface Craftsman {
  slug: string;
  name: string;
  trade: string;
  tradeSlug: string;
  location: string;
  description: string;
  services: string[];
  phone: string;
  email: string;
  workingHours: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  responseTime: string;
  verified: boolean;
  avatarSrc: string;
  portfolio: PortfolioPhoto[];
  reviews: Review[];
}

export interface Trade {
  slug: string;
  label: string;
  icon: string;
}

export const TRADES: Trade[] = [
  { slug: "elektrikar", label: "Elektrikář", icon: "⚡" },
  { slug: "instalater", label: "Instalatér", icon: "🔧" },
  { slug: "malicar", label: "Malíř / natěrač", icon: "🎨" },
  { slug: "zednik", label: "Zedník", icon: "🧱" },
  { slug: "podlahar", label: "Podlahář", icon: "🪵" },
  { slug: "tesar", label: "Tesař", icon: "🔨" },
];

export const CRAFTSMEN: Craftsman[] = [
  {
    slug: "jan-novak-elektrikar-praha-3",
    name: "Jan Novák",
    trade: "Elektrikář",
    tradeSlug: "elektrikar",
    location: "Praha 3, Praha 2",
    description:
      "Jsem elektrikář s 12 lety praxe v Praze. Specializuji se na kompletní elektroinstalace, rekonstrukce rozvaděčů a chytrou domácnost. Pracuji svědomitě, přicházím včas a vždy předem sdělím přesnou cenu.\n\nPracuji primárně na Praze 2, 3 a 10. Pro velké zakázky dojíždím po celé Praze.",
    services: [
      "Kompletní elektroinstalace",
      "Výměna a oprava rozvaděčů",
      "Montáž světel a zásuvek",
      "Chytrá domácnost (Zigbee, Z-Wave)",
      "Revize elektroinstalací",
      "Havarijní zásahy",
    ],
    phone: "+420 773 123 456",
    email: "jan.novak@example.com",
    workingHours: "Po–Pá 7:00–17:00",
    rating: 4.9,
    reviewCount: 23,
    completedJobs: 47,
    responseTime: "do 4h",
    verified: true,
    avatarSrc: "https://placehold.co/120x120/1D3D6E/FFFFFF?text=JN",
    portfolio: [
      { src: "https://placehold.co/400x400/1D3D6E/DBEAFE?text=Rozvaděč+1", alt: "Nový rozvaděč v bytě Praha 3" },
      { src: "https://placehold.co/400x400/2E5FA3/DBEAFE?text=Instalace+2", alt: "Elektroinstalace kuchyně" },
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=Osvětlení+3", alt: "Montáž LED osvětlení" },
      { src: "https://placehold.co/400x400/1D3D6E/DBEAFE?text=Zásuvky+4", alt: "Instalace zásuvek obývací pokoj" },
      { src: "https://placehold.co/400x400/2E5FA3/DBEAFE?text=Smart+5", alt: "Chytrá domácnost Zigbee" },
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=Revize+6", alt: "Revize elektroinstalace" },
    ],
    reviews: [
      {
        author: "Jana K.",
        location: "Praha 3",
        rating: 5,
        text: "Vynikající přístup. Elektrikář přišel přesně na čas, práci odvedl perfektně a cena odpovídala předem sjednané částce. Určitě využiji znovu.",
        date: "Duben 2026",
      },
      {
        author: "Martin V.",
        location: "Praha 2",
        rating: 5,
        text: "Opravil mi havarijní stav v rozvaděči do 3 hodin od zavolání. Profesionální a spolehlivý přístup, doporučuji.",
        date: "Březen 2026",
      },
      {
        author: "Petra N.",
        location: "Praha 10",
        rating: 5,
        text: "Instaloval nám chytrou domácnost, vysvětlil vše srozumitelně. Přesná cena, žádné překvapení na faktuře.",
        date: "Únor 2026",
      },
    ],
  },
  {
    slug: "petr-svoboda-instalater-praha-5",
    name: "Petr Svoboda",
    trade: "Instalatér",
    tradeSlug: "instalater",
    location: "Praha 5, Praha 4",
    description:
      "Instalatér a topenář s 8 lety zkušeností. Provádím kompletní instalatérské práce v bytech i rodinných domech. Specializuji se na rekonstrukce koupelen a výměnu topných systémů.\n\nVzhledem k mé základně na Praze 5 dokáži být u vás do hodiny.",
    services: [
      "Oprava a výměna potrubí",
      "Rekonstrukce koupelen",
      "Výměna bojlerů a ohřívačů vody",
      "Instalace podlahového topení",
      "Čištění kanalizace",
      "Havarijní zásahy 24/7",
    ],
    phone: "+420 602 456 789",
    email: "petr.svoboda@example.com",
    workingHours: "Po–So 7:00–18:00",
    rating: 4.8,
    reviewCount: 31,
    completedJobs: 62,
    responseTime: "do 2h",
    verified: true,
    avatarSrc: "https://placehold.co/120x120/2E5FA3/FFFFFF?text=PS",
    portfolio: [
      { src: "https://placehold.co/400x400/2E5FA3/DBEAFE?text=Koupelna+1", alt: "Rekonstrukce koupelny Praha 5" },
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=Potrubí+2", alt: "Výměna potrubí v bytovém jádru" },
      { src: "https://placehold.co/400x400/1D3D6E/DBEAFE?text=Topení+3", alt: "Instalace podlahového topení" },
      { src: "https://placehold.co/400x400/2E5FA3/DBEAFE?text=Bojler+4", alt: "Výměna bojleru" },
    ],
    reviews: [
      {
        author: "Ondřej M.",
        location: "Praha 5",
        rating: 5,
        text: "Přišel do hodiny od zavolání, opravil havárii s prasklým potrubím. Naprosto profesionální.",
        date: "Duben 2026",
      },
      {
        author: "Lucie B.",
        location: "Praha 4",
        rating: 5,
        text: "Skvělá rekonstrukce koupelny, vše na čas a v rámci rozpočtu. Výsledek je nádherný!",
        date: "Únor 2026",
      },
    ],
  },
  {
    slug: "martin-kovar-malicar-praha-7",
    name: "Martin Kovář",
    trade: "Malíř / natěrač",
    tradeSlug: "malicar",
    location: "Praha 7, Praha 6",
    description:
      "Malíř a natěrač s 15 lety praxe. Vymalování bytů a domů, fasády, dekorativní techniky. Pracuji čistě, přesně a vždy uklidím po sobě.\n\nPřijímám zakázky po celé Praze s preferovaným zaměřením na pravý břeh Vltavy.",
    services: [
      "Vymalování bytů a domů",
      "Venkovní fasády",
      "Dekorativní malby",
      "Stříkání nábytku a dveří",
      "Tapetování",
      "Nátěry radiátorů",
    ],
    phone: "+420 777 789 012",
    email: "martin.kovar@example.com",
    workingHours: "Po–Pá 8:00–16:00",
    rating: 4.7,
    reviewCount: 18,
    completedJobs: 34,
    responseTime: "do 6h",
    verified: true,
    avatarSrc: "https://placehold.co/120x120/374151/FFFFFF?text=MK",
    portfolio: [
      { src: "https://placehold.co/400x400/F59E0B/FFFFFF?text=Obývák+1", alt: "Vymalování obývacího pokoje" },
      { src: "https://placehold.co/400x400/D97706/FFFFFF?text=Fasáda+2", alt: "Fasáda rodinného domu" },
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=Dekor+3", alt: "Dekorativní malba dětský pokoj" },
      { src: "https://placehold.co/400x400/F59E0B/FFFFFF?text=Tapet+4", alt: "Tapetování chodby" },
    ],
    reviews: [
      {
        author: "Petra N.",
        location: "Praha 6",
        rating: 5,
        text: "Krásně vymaloval celý byt, čistě a rychle. Doporučuji všem!",
        date: "Březen 2026",
      },
      {
        author: "Karel F.",
        location: "Praha 7",
        rating: 4,
        text: "Práce velmi pěkná, byl o den opožděn oproti plánu, ale výsledek stál za to.",
        date: "Leden 2026",
      },
    ],
  },
  {
    slug: "tomas-blaha-zednik-praha-6",
    name: "Tomáš Bláha",
    trade: "Zedník",
    tradeSlug: "zednik",
    location: "Praha 6, Praha 1",
    description:
      "Zedník a obkladač s 10 lety zkušeností. Specializuji se na rekonstrukce koupelen a kuchyní, obklady a dlažby, sádrokarton a omítky.\n\nZakládám si na pečlivém provedení a dodržení termínů.",
    services: [
      "Obklady a dlažby",
      "Rekonstrukce koupelen",
      "Omítky a stěrky",
      "Sádrokarton",
      "Bourací práce",
      "Příčky a přístavby",
    ],
    phone: "+420 605 321 654",
    email: "tomas.blaha@example.com",
    workingHours: "Po–Pá 7:30–16:30",
    rating: 4.9,
    reviewCount: 14,
    completedJobs: 28,
    responseTime: "do 8h",
    verified: true,
    avatarSrc: "https://placehold.co/120x120/1D3D6E/FEF3C7?text=TB",
    portfolio: [
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=Koupelna+1", alt: "Rekonstrukce koupelny Praha 6" },
      { src: "https://placehold.co/400x400/1D3D6E/DBEAFE?text=Obklady+2", alt: "Obklady kuchyně" },
      { src: "https://placehold.co/400x400/2E5FA3/DBEAFE?text=Dlažba+3", alt: "Dlažba terasy" },
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=SDK+4", alt: "Sádrokarton chodba" },
    ],
    reviews: [
      {
        author: "Hana V.",
        location: "Praha 6",
        rating: 5,
        text: "Výborná práce na koupelně. Přesné obklady, vše rovně a čistě. Budu doporučovat.",
        date: "Duben 2026",
      },
      {
        author: "Jiří K.",
        location: "Praha 1",
        rating: 5,
        text: "Rekonstrukce koupelny proběhla přesně dle plánu. Komunikace výborná, bez překvapení.",
        date: "Únor 2026",
      },
    ],
  },
  {
    slug: "lukas-dvorak-podlahar-praha-2",
    name: "Lukáš Dvořák",
    trade: "Podlahář",
    tradeSlug: "podlahar",
    location: "Praha 2, Praha 3",
    description:
      "Podlahář a parketář specializující se na vinylové podlahy, laminát, parkety a koberec. Pracuji rychle a precizně s 7 lety zkušeností v oboru.\n\nBezplatná konzultace a zaměření přímo u vás.",
    services: [
      "Pokládka vinylových podlah",
      "Laminátové podlahy",
      "Dřevěné parkety",
      "Koberce a zátěžové podlahy",
      "Oprava a renovace parket",
      "Nivelace a příprava podkladu",
    ],
    phone: "+420 736 654 321",
    email: "lukas.dvorak@example.com",
    workingHours: "Po–Pá 8:00–17:00",
    rating: 4.8,
    reviewCount: 19,
    completedJobs: 41,
    responseTime: "do 6h",
    verified: true,
    avatarSrc: "https://placehold.co/120x120/2E5FA3/FEF3C7?text=LD",
    portfolio: [
      { src: "https://placehold.co/400x400/D97706/FFFFFF?text=Vinyl+1", alt: "Vinylová podlaha obývací pokoj" },
      { src: "https://placehold.co/400x400/F59E0B/FFFFFF?text=Parkety+2", alt: "Dřevěné parkety ložnice" },
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=Laminát+3", alt: "Laminátová podlaha dětský pokoj" },
    ],
    reviews: [
      {
        author: "Monika S.",
        location: "Praha 2",
        rating: 5,
        text: "Nádherné parkety v celém bytě. Lukáš byl precizní, čistý a dodal vše v termínu.",
        date: "Březen 2026",
      },
    ],
  },
  {
    slug: "jiri-prochazka-elektrikar-praha-8",
    name: "Jiří Procházka",
    trade: "Elektrikář",
    tradeSlug: "elektrikar",
    location: "Praha 8, Praha 9",
    description:
      "Certifikovaný elektrikář s 20 lety zkušeností. Provádím revize, nové elektroinstalace i opravy. Specializuji se na průmyslové objekty i rodinné domy.\n\nHavarijní zásahy 24/7.",
    services: [
      "Elektrorevize",
      "Nové elektroinstalace",
      "Oprava poruch",
      "Fotovoltaické systémy",
      "Datové sítě",
      "Havarijní servis 24/7",
    ],
    phone: "+420 721 987 654",
    email: "jiri.prochazka@example.com",
    workingHours: "Po–Ne 0:00–24:00 (pohotovost)",
    rating: 4.9,
    reviewCount: 42,
    completedJobs: 93,
    responseTime: "do 2h",
    verified: true,
    avatarSrc: "https://placehold.co/120x120/0F2744/F59E0B?text=JP",
    portfolio: [
      { src: "https://placehold.co/400x400/0F2744/DBEAFE?text=Revize+1", alt: "Elektrorevize bytového domu" },
      { src: "https://placehold.co/400x400/1D3D6E/DBEAFE?text=FVE+2", alt: "Fotovoltaický systém rodinný dům" },
      { src: "https://placehold.co/400x400/2E5FA3/DBEAFE?text=Datová+3", alt: "Datová síť kancelář" },
      { src: "https://placehold.co/400x400/374151/F3F4F6?text=Tabule+4", alt: "Nová rozvodná tabule" },
      { src: "https://placehold.co/400x400/0F2744/DBEAFE?text=Průmysl+5", alt: "Průmyslová elektroinstalace" },
    ],
    reviews: [
      {
        author: "Radek H.",
        location: "Praha 8",
        rating: 5,
        text: "Havárie v noci — přišel do hodiny. Profi přístup, výborná cena za pohotovostní výjezd.",
        date: "Duben 2026",
      },
      {
        author: "Eva K.",
        location: "Praha 9",
        rating: 5,
        text: "Revize celého bytového domu provedena rychle a správně. Vše zdokumentováno a odevzdáno v termínu.",
        date: "Март 2026",
      },
      {
        author: "Stanislav Č.",
        location: "Praha 8",
        rating: 5,
        text: "Instalace FVE systému — bezproblémový průběh, skvělá komunikace, výborné výsledky.",
        date: "Leden 2026",
      },
    ],
  },
];

export function getCraftsmanBySlug(slug: string): Craftsman | undefined {
  return CRAFTSMEN.find((c) => c.slug === slug);
}

export function getCraftsmansByTrade(tradeSlug: string): Craftsman[] {
  if (!tradeSlug) return CRAFTSMEN;
  return CRAFTSMEN.filter((c) => c.tradeSlug === tradeSlug);
}

export function getTradeLabel(tradeSlug: string): string {
  return TRADES.find((t) => t.slug === tradeSlug)?.label ?? tradeSlug;
}
