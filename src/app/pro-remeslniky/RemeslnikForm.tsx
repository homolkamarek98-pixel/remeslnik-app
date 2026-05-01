"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitRemeslnik } from "@/app/actions/remeslnik";
import { AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  obor: z.string().min(1, "Vyberte svůj obor"),
  rokZalozeni: z.string().min(1, "Zadejte roky zkušeností"),
  lokality: z.string().min(1, "Vyberte lokality, kde působíte"),
  jmeno: z.string().min(1, "Zadejte jméno a příjmení"),
  telefon: z
    .string()
    .min(1, "Zadejte telefonní číslo")
    .regex(
      /^\+?[0-9 ]{9,16}$/,
      "Zadejte platné telefonní číslo (např. +420 773 000 000)"
    ),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
  cenikInfo: z.string().max(500, "Maximálně 500 znaků").optional(),
});

type FormData = z.infer<typeof schema>;

const OBORY = [
  "Elektrikářské práce",
  "Instalatérské a topenářské práce",
  "Malování a natírání",
  "Zednické a obkladačské práce",
  "Podlahy a parkety",
  "Stolařské a truhlářské práce",
  "Fasáda a zateplení",
  "Klimatizace a vzduchotechnika",
  "Jiné řemeslné práce",
];

const ZKUSENOSTI = [
  "1–2 roky",
  "3–5 let",
  "6–10 let",
  "11–20 let",
  "Více než 20 let",
];

const PRAZSKE_CTVRTI = [
  "Praha 1–4 (centrum)",
  "Praha 5–8 (vnitřní město)",
  "Praha 9–14 (severovýchod)",
  "Praha 10–15 (jihovýchod)",
  "Praha 16–22 (okraj)",
  "Celá Praha",
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
      <AlertCircle className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function RemeslnikForm() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const cenikValue = watch("cenikInfo") ?? "";

  const onSubmit = async (data: FormData) => {
    setGlobalError(null);
    const result = await submitRemeslnik(data);
    if (result.success) {
      router.push("/pro-remeslniky/odeslano");
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

      {/* Obor */}
      <div>
        <label htmlFor="obor" className="block text-sm font-medium text-gray-700 mb-1.5">
          Váš obor <span className="text-red-500">*</span>
        </label>
        <select
          id="obor"
          {...register("obor")}
          className={inputClass(!!errors.obor)}
        >
          <option value="">— Vyberte obor —</option>
          {OBORY.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <FieldError message={errors.obor?.message} />
      </div>

      {/* Zkušenosti */}
      <div>
        <label htmlFor="rokZalozeni" className="block text-sm font-medium text-gray-700 mb-1.5">
          Roky praxe <span className="text-red-500">*</span>
        </label>
        <select
          id="rokZalozeni"
          {...register("rokZalozeni")}
          className={inputClass(!!errors.rokZalozeni)}
        >
          <option value="">— Vyberte roky zkušeností —</option>
          {ZKUSENOSTI.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
        <FieldError message={errors.rokZalozeni?.message} />
      </div>

      {/* Lokalita */}
      <div>
        <label htmlFor="lokality" className="block text-sm font-medium text-gray-700 mb-1.5">
          Kde v Praze působíte? <span className="text-red-500">*</span>
        </label>
        <select
          id="lokality"
          {...register("lokality")}
          className={inputClass(!!errors.lokality)}
        >
          <option value="">— Vyberte oblast —</option>
          {PRAZSKE_CTVRTI.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <FieldError message={errors.lokality?.message} />
      </div>

      {/* Orientační ceník */}
      <div>
        <label htmlFor="cenikInfo" className="block text-sm font-medium text-gray-700 mb-1.5">
          Orientační ceník (nepovinné)
        </label>
        <p className="text-xs text-gray-500 mb-1.5">
          Např. hodinová sazba, minimální výjezd, typ zakázek které preferujete.
        </p>
        <textarea
          id="cenikInfo"
          rows={3}
          maxLength={500}
          placeholder="Např. 400–600 Kč/hod, minimální výjezd 500 Kč, preferuji menší opravy a revize."
          {...register("cenikInfo")}
          className={[inputClass(!!errors.cenikInfo), "resize-y"].join(" ")}
        />
        <div className="flex items-start justify-between mt-1">
          <FieldError message={errors.cenikInfo?.message} />
          <span className={["text-xs ml-auto", cenikValue.length > 400 ? "text-amber-600" : "text-gray-400"].join(" ")}>
            {cenikValue.length} / 500
          </span>
        </div>
      </div>

      {/* Kontaktní údaje */}
      <div className="pt-2">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Kontaktní údaje
        </h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="jmeno" className="block text-sm font-medium text-gray-700 mb-1.5">
              Jméno a příjmení <span className="text-red-500">*</span>
            </label>
            <input
              id="jmeno"
              type="text"
              autoComplete="name"
              placeholder="Jan Novák"
              {...register("jmeno")}
              className={inputClass(!!errors.jmeno)}
            />
            <FieldError message={errors.jmeno?.message} />
          </div>

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
            <p className="mt-1 text-xs text-gray-500">Na toto číslo vás budeme kontaktovat s poptávkami</p>
            <FieldError message={errors.telefon?.message} />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jan@example.com"
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            <p className="mt-1 text-xs text-gray-500">Potvrzení přihlášky vám pošleme e-mailem</p>
            <FieldError message={errors.email?.message} />
          </div>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="bg-gray-50 border-l-4 border-gray-300 rounded px-4 py-3 text-xs text-gray-600">
        🔒 Vaše kontaktní údaje používáme pouze pro zprostředkování poptávek.
        Nesdílíme je s třetími stranami. Odesláním souhlasíte s{" "}
        <a href="/podminky-pouziti" className="text-navy-500 underline">Podmínkami použití</a>{" "}
        a{" "}
        <a href="/ochrana-osobnich-udaju" className="text-navy-500 underline">Zásadami ochrany osobních údajů</a>.
      </div>

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
          "Přihlásit se jako řemeslník →"
        )}
      </button>
    </form>
  );
}
