"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CRAFTSMEN, TRADES, type Craftsman } from "@/data/remeslnici";
import { MapPin, Clock, CheckCircle, Star } from "lucide-react";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <span className="flex items-center gap-1">
      <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
      <span className="font-semibold text-sm text-gray-900">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">({count})</span>
    </span>
  );
}

function CraftsmanCard({ craftsman }: { craftsman: Craftsman }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <Image
            src={craftsman.avatarSrc}
            alt={craftsman.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
            unoptimized
          />
          {craftsman.verified && (
            <span className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
              <CheckCircle className="size-4 text-green-600 fill-white" />
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">
            {craftsman.name}
          </h3>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-700">
            {craftsman.trade}
          </span>
          <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{craftsman.location}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-3">
            <StarRating rating={craftsman.rating} count={craftsman.reviewCount} />
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="size-3.5" />
              {craftsman.responseTime}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          {craftsman.completedJobs} dokončených zakázek
        </p>
        <Link
          href={`/remeslnik/${craftsman.slug}`}
          className="shrink-0 px-4 py-2 bg-navy-500 text-white text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors"
        >
          Zobrazit profil
        </Link>
      </div>
    </div>
  );
}

export function CraftsmanFilter() {
  const [activeTrade, setActiveTrade] = useState<string>("");

  const filtered = activeTrade
    ? CRAFTSMEN.filter((c) => c.tradeSlug === activeTrade)
    : CRAFTSMEN;

  return (
    <div>
      {/* Trade filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTrade("")}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            activeTrade === ""
              ? "bg-navy-700 text-white border-navy-700"
              : "bg-white text-gray-700 border-gray-300 hover:border-navy-500 hover:text-navy-700"
          }`}
        >
          Všechna řemesla
        </button>
        {TRADES.map((trade) => (
          <button
            key={trade.slug}
            onClick={() => setActiveTrade(trade.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeTrade === trade.slug
                ? "bg-navy-700 text-white border-navy-700"
                : "bg-white text-gray-700 border-gray-300 hover:border-navy-500 hover:text-navy-700"
            }`}
          >
            {trade.icon} {trade.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-5">
        {filtered.length === 1
          ? "1 řemeslník"
          : `${filtered.length} řemeslníků`}
        {activeTrade && (
          <span>
            {" "}
            v kategorii{" "}
            <span className="font-medium text-navy-700">
              {TRADES.find((t) => t.slug === activeTrade)?.label}
            </span>
          </span>
        )}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((craftsman) => (
          <CraftsmanCard key={craftsman.slug} craftsman={craftsman} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">Žádný řemeslník nenalezen</p>
          <p className="mt-1 text-sm">Zkuste jiný filtr nebo zadejte poptávku.</p>
        </div>
      )}
    </div>
  );
}
