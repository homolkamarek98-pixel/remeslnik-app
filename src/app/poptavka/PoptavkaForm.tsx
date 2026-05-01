"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { submitPoptavka } from "@/app/actions/poptavka";
import { AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  typPrace: z.string().min(1, "Vyberte typ práce"),
  mestskaCast: z.string().min(1, "Vyberte lokalitu"),
  popis: z
    .string()
    .min(20, "Popište práci — minimálně 20 znaků")
    .max(1000, "Maximálně 1000 znaků"),
  jmeno: z.string().min(1, "Zadejte své jméno"),
  telefon: z
    .string()
    .min(1, "Zadejte telefonní číslo")
    .regex(
      /^\+?[0-9 ]{9,16}$/,
      "Zadejte platné telefonní číslo (např. +420 773 000 000)"
    ),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
});

type FormData = z.infer<typeof schema>;

const TYPY_PRACE = [
  "Elektrikářské práce",
  "Instalatérské a topenářské práce",
  "Malování a natírání",
  "Zednické a obkladačské práce",
  "Podlahy a parkety",
  "Stolařské a truhlářské práce",
  "Fasáda a zateplení",
  "Klimatizace a vzduchotechnika",
  "Jiné práce",
];

const MESTSKE_CASTI = [
  "Praha 1 — Staré Město, Josefov, Nové Město, Malá Strana, Hradčany",
  "Praha 2 — Vinohrady, Nusle, Vyšehrad",
  "Praha 3 — Žižkov, Vinohrady",
  "Praha 4 — Michle, Podolí, Braník, Krč, Lhotka, Záběhlice",
  "Praha 5 — Smíchov, Košíře, Motol, Stodůlky, Zličín, Jinonice",
  "Praha 6 — Bubeneč, Dejvice, Střešovice, Břevnov, Veleslavín, Ruzyně",
  "Praha 7 — Holešovice, Letná, Troja",
  "Praha 8 — Karlín, Libeň, Kobylisy, Ďáblice",
  "Praha 9 — Vysočany, Prosek, Letňany, Čakovice",
  "Praha 10 — Vršovice, Strašnice, Hostivař, Malešice",
  "Praha 11 — Háje, Chodov, Opatov",
  "Praha 12 — Modřany, Komořany, Zbraslav",
  "Praha 13 — Řepy, Nové Butovice",
  "Praha 14 — Černý Most, Hloubětín, Kyje",
  "Praha 15 — Horní Měcholupy, Petrovice",
  "Praha 16 — Radotín, Lipence, Zbraslav",
  "Praha 17 — Řepy",
  "Praha 18 — Letňany",
  "Praha 19 — Kbely",
  "Praha 20 — Horní Počernice",
  "Praha 21 — Újezd nad Lesy, Koloděje, Běchovice",
  "Praha 22 — Uhříněves",
];

const PLACEHOLDERS: Record<string, string> = {
  "Elektrikářské práce":
    "Např. Porucha jističe v panelákové bytové jednotce. Praha 3, 2+1.",
  "Instalatérské a topenářské práce":
    "Např. Oprava kapající baterie v koupelně + výměna těsnění.",
  "Malování a natírání":
    "Např. Vymalování 3 místností (60 m²), světlé barvy. Byt po rekonstrukci.",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
      <AlertCircle className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function PoptavkaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typFromUrl = searchParams.get("typ") ?? "";

  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { typPrace: typFromUrl },
  });

  useEffect(() => {
    if (typFromUrl && TYPY_PRACE.includes(typFromUrl)) {
      setValue("typPrace", typFromUrl);
    }
  }, [typFromUrl, setValue]);

  const popisValue = watch("popis") ?? "";
  const typValue = watch("typPrace") ?? "";
  const placeholder = PLACEHOLDERS[typValue] ?? "Popište práci co nejpodrobněji — typ, rozsah, termín.";

  const onSubmit = async (data: FormData) => {
    setGlobalError(null);
    const result = await submitPoptavka(data);
    if (result.success) {
      router.push(
        `/poptavka/odeslano?typ=${encodeURIComponent(data.typPrace)}&lokalita=${encodeURIComponent(data.mestskaCast)}`
      );
    } else if ("message" in result && result.message) {
      setGlobalError(result.message);
    } else {
      setGlobalError("Opravte prosím označená pole.");
    }
  };

  const inputClass = (hasError: boolean) =>
    [
      "w-full rounded border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition min-h-[48px]",
      hasError
        ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200"
        : "border-gray-300 bg-white focus:border-navy-500 focus:ring-navy-100",
    ].join(" ");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {globalError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          {globalError}
        </div>
      )}

      {/* Typ práce */}
      <div>
        <label htmlFor="typPrace" className="block text-sm font-medium text-gray-700 mb-1.5">
          Co potřebujete udělat? <span className="text-red-500">*</span>
        </label>
        <select
          id="typPrace"
          {...register("typPrace")}
          className={inputClass(!!errors.typPrace)}
        >
          <option value="">— Vyberte typ práce —</option>
          {TYPY_PRACE.map((typ) => (
            <option key={typ} value={typ}>
              {typ}
            </option>
          ))}
        </select>
        <FieldError message={errors.typPrace?.message} />
      </div>

      {/* Lokalita */}
      <div>
        <label htmlFor="mestskaCast" className="block text-sm font-medium text-gray-700 mb-1.5">
          Kde se nachází místo práce? <span className="text-red-500">*</span>
        </label>
        <select
          id="mestskaCast"
          {...register("mestskaCast")}
          className={inputClass(!!errors.mestskaCast)}
        >
          <option value="">— Vyberte městskou část —</option>
          {MESTSKE_CASTI.map((cast) => (
            <option key={cast} value={cast}>
              {cast}
            </option>
          ))}
        </select>
        <FieldError message={errors.mestskaCast?.message} />
      </div>

      {/* Popis */}
      <div>
        <label htmlFor="popis" className="block text-sm font-medium text-gray-700 mb-1.5">
          Popište práci <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-1.5">
          Čím více detailů uvedete, tím přesněji vám pomůžeme. Min. 20 znaků.
        </p>
        <textarea
          id="popis"
          rows={5}
          maxLength={1000}
          placeholder={placeholder}
          {...register("popis")}
          className={[inputClass(!!errors.popis), "min-h-[140px] resize-y"].join(" ")}
        />
        <div className="flex items-start justify-between mt-1">
          <FieldError message={errors.popis?.message} />
          <span
            className={[
              "text-xs ml-auto",
              popisValue.length > 800
                ? popisValue.length >= 1000
                  ? "text-red-600"
                  : "text-amber-600"
                : "text-gray-400",
            ].join(" ")}
          >
            {popisValue.length} / 1000
          </span>
        </div>
      </div>

      {/* Kontaktní údaje */}
      <div className="pt-2">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Kam vám pošleme výsledky?
        </h3>
        <div className="space-y-5">
          {/* Jméno */}
          <div>
            <label htmlFor="jmeno" className="block text-sm font-medium text-gray-700 mb-1.5">
              Vaše jméno <span className="text-red-500">*</span>
            </label>
            <input
              id="jmeno"
              type="text"
              autoComplete="given-name"
              placeholder="Jana Nováková"
              {...register("jmeno")}
              className={inputClass(!!errors.jmeno)}
            />
            <FieldError message={errors.jmeno?.message} />
          </div>

          {/* Telefon */}
          <div>
            <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1.5">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input
              id="telefon"
              type="tel"
              autoComplete="tel"
              placeholder="+420 773 000 000"
              {...register("telefon")}
              className={inputClass(!!errors.telefon)}
            />
            <p className="mt-1 text-xs text-gray-500">Řemeslník vás kontaktuje telefonicky</p>
            <FieldError message={errors.telefon?.message} />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jana@example.com"
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            <p className="mt-1 text-xs text-gray-500">Poptávku vám potvrdíme e-mailem</p>
            <FieldError message={errors.email?.message} />
          </div>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="bg-gray-50 border-l-4 border-gray-300 rounded px-4 py-3 text-xs text-gray-600">
        🔒 Vaše kontaktní údaje předáme pouze vybranému řemeslníkovi. Neposkytujeme
        je třetím stranám ani je nepoužíváme k marketingu. Odesláním souhlasíte s{" "}
        <a href="/podminky-pouziti" className="text-navy-500 underline">
          Podmínkami použití
        </a>{" "}
        a{" "}
        <a href="/ochrana-osobnich-udaju" className="text-navy-500 underline">
          Zásadami ochrany osobních údajů
        </a>
        .
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-navy-500 text-white font-semibold text-base rounded-lg px-7 py-4 hover:bg-navy-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Odesílám...
          </>
        ) : (
          "Odeslat poptávku →"
        )}
      </button>
    </form>
  );
}
