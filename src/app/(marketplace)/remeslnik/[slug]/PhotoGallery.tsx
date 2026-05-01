"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioPhoto } from "@/data/remeslnici";

interface Props {
  photos: PortfolioPhoto[];
}

export function PhotoGallery({ photos }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visible = photos.slice(0, 6);
  const remaining = photos.length - 6;

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function prev() {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }

  function next() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {visible.map((photo, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="relative aspect-square overflow-hidden rounded-sm group focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2"
            aria-label={`Otevřít fotku: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              unoptimized
            />
          </button>
        ))}
      </div>

      {remaining > 0 && (
        <button
          onClick={() => openLightbox(6)}
          className="mt-4 w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-navy-500 hover:text-navy-700 transition-colors"
        >
          + Zobrazit dalších {remaining} fotek
        </button>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={closeLightbox}
            aria-label="Zavřít"
          >
            <X className="size-7" />
          </button>

          {/* Counter */}
          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </p>

          {/* Prev */}
          <button
            className="absolute left-4 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Předchozí"
          >
            <ChevronLeft className="size-10" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-3xl max-h-[80vh] aspect-square mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Další"
          >
            <ChevronRight className="size-10" />
          </button>

          {/* Caption */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center px-4 max-w-md">
            {photos[lightboxIndex].alt}
          </p>
        </div>
      )}
    </>
  );
}
