import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, MapPin, Clock, Wrench, Phone, Mail, Star, ChevronLeft } from "lucide-react";
import { CRAFTSMEN, getCraftsmanBySlug } from "@/data/remeslnici";
import { PhotoGallery } from "./PhotoGallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CRAFTSMEN.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getCraftsmanBySlug(slug);
  if (!c) return { title: "Řemeslník nenalezen" };

  return {
    title: `${c.name} — ${c.trade} Praha | Řemeslník.app`,
    description: `${c.name} je prověřený ${c.trade.toLowerCase()} v ${c.location}. Hodnocení ${c.rating} ★ z ${c.reviewCount} recenzí. Kontaktujte ho přes Řemeslník.app.`,
    openGraph: {
      title: `${c.name} — ${c.trade} v Praze`,
      description: `Prověřený ${c.trade.toLowerCase()} · ${c.location} · Hodnocení ${c.rating}★`,
    },
  };
}

function StarRating({ rating, count, size = "default" }: { rating: number; count: number; size?: "default" | "large" }) {
  const starSize = size === "large" ? "size-5" : "size-4";
  return (
    <span className="flex items-center gap-1.5">
      <Star className={`${starSize} fill-[#F59E0B] text-[#F59E0B]`} />
      <span className={`font-bold ${size === "large" ? "text-lg" : "text-sm"} text-gray-900`}>
        {rating.toFixed(1)}
      </span>
      <span className={`${size === "large" ? "text-base" : "text-sm"} text-gray-500`}>
        · {count} {count === 1 ? "recenze" : count < 5 ? "recenze" : "recenzí"}
      </span>
    </span>
  );
}

export default async function CraftsmanProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const craftsman = getCraftsmanBySlug(slug);

  if (!craftsman) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Person"],
    name: craftsman.name,
    description: craftsman.description.split("\n")[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: craftsman.location.split(",")[0].trim(),
      addressCountry: "CZ",
    },
    telephone: craftsman.phone,
    email: craftsman.email,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: craftsman.rating,
      reviewCount: craftsman.reviewCount,
      bestRating: 5,
    },
    knowsAbout: craftsman.services,
    url: `https://remeslnik.app/remeslnik/${craftsman.slug}`,
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-navy-700 transition-colors">Řemeslník.app</Link>
          <span>/</span>
          <Link href="/remeslnici" className="hover:text-navy-700 transition-colors">Katalog</Link>
          <span>/</span>
          <span className="text-gray-900">{craftsman.name}</span>
        </nav>

        {/* Mobile back button */}
        <Link
          href="/remeslnici"
          className="sm:hidden flex items-center gap-1 text-sm text-navy-700 mb-4 -ml-1"
        >
          <ChevronLeft className="size-4" />
          Zpět na katalog
        </Link>

        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Profile Hero */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <Image
                    src={craftsman.avatarSrc}
                    alt={craftsman.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                    unoptimized
                    priority
                  />
                  {craftsman.verified && (
                    <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <CheckCircle className="size-5 text-green-600 fill-white" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {craftsman.name}
                  </h1>
                  <span className="inline-block mt-1.5 px-3 py-1 rounded-full text-sm font-medium bg-navy-100 text-navy-700">
                    {craftsman.trade}
                  </span>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="size-4 shrink-0" />
                    {craftsman.location}
                  </div>
                  <div className="mt-2">
                    <StarRating rating={craftsman.rating} count={craftsman.reviewCount} size="large" />
                  </div>

                  {/* Meta badges */}
                  <div className="mt-3 flex flex-wrap gap-3">
                    {craftsman.verified && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                        <CheckCircle className="size-3.5" />
                        Ověřen
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      <Clock className="size-3.5" />
                      Odpovídá {craftsman.responseTime}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      <Wrench className="size-3.5" />
                      {craftsman.completedJobs} zakázek
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* About */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">O mně</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                {craftsman.description.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Co nabízím</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {craftsman.services.map((service) => (
                  <div key={service} className="flex items-center gap-2.5 text-gray-800">
                    <CheckCircle className="size-4 text-green-600 fill-white shrink-0" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio */}
            {craftsman.portfolio.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ukázky práce</h2>
                <PhotoGallery photos={craftsman.portfolio} />
              </section>
            )}

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Co říkají zákazníci</h2>
              <div className="flex items-center gap-2 mb-5">
                <StarRating rating={craftsman.rating} count={craftsman.reviewCount} size="large" />
              </div>
              <div className="space-y-4">
                {craftsman.reviews.map((review, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.06)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{review.author}</p>
                        <p className="text-xs text-gray-500">{review.location}</p>
                      </div>
                      <p className="text-xs text-gray-400 shrink-0">{review.date}</p>
                    </div>
                    <div className="mt-2 flex">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`size-3.5 ${j < review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      &quot;{review.text}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Desktop contact sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Image
                    src={craftsman.avatarSrc}
                    alt={craftsman.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{craftsman.name}</p>
                    <p className="text-xs text-gray-500">{craftsman.trade}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <a
                    href={`tel:${craftsman.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-navy-700 transition-colors"
                  >
                    <Phone className="size-4 text-gray-400" />
                    {craftsman.phone}
                  </a>
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <Mail className="size-4 text-gray-400" />
                    <span className="italic text-xs">Zobrazit e-mail po kontaktu</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-700">
                    <MapPin className="size-4 text-gray-400" />
                    {craftsman.location}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Clock className="size-4 text-gray-400" />
                    {craftsman.workingHours}
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-3">
                  <a
                    href={`tel:${craftsman.phone.replace(/\s/g, "")}`}
                    className="block w-full text-center bg-navy-500 text-white font-semibold rounded-lg px-4 py-3 hover:bg-navy-700 transition-colors"
                  >
                    Kontaktovat
                  </a>
                  <Link
                    href="/poptavka"
                    className="block w-full text-center border border-navy-500 text-navy-500 font-medium rounded-lg px-4 py-3 hover:bg-navy-50 transition-colors text-sm"
                  >
                    Zadat poptávku přes Řemeslník.app
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-white border-t border-gray-200 shadow-lg px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Image
              src={craftsman.avatarSrc}
              alt={craftsman.name}
              width={36}
              height={36}
              className="rounded-full object-cover shrink-0"
              unoptimized
            />
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{craftsman.name}</p>
              <p className="text-xs text-gray-500">{craftsman.trade}</p>
            </div>
          </div>
          <a
            href={`tel:${craftsman.phone.replace(/\s/g, "")}`}
            className="shrink-0 bg-navy-500 text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-navy-700 transition-colors text-sm"
          >
            Kontaktovat
          </a>
        </div>
      </div>
    </>
  );
}
