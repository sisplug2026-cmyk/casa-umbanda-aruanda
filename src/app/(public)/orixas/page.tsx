import type { Metadata } from "next";
import Link from "next/link";
import { orixas } from "@/data/orixas";

export const metadata: Metadata = {
  title: "Os Orixás da Umbanda",
  description:
    "Conheça os 7 Orixás da Umbanda — domínios, cores, saudações e suas histórias sagradas.",
};

export default function OrixasPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Forças da Natureza
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Os Orixás
        </h1>
        <p className="text-[#6b4c3b] text-lg max-w-2xl mx-auto">
          Os Orixás são as forças da natureza divinizadas, intermediários entre
          Olorum e os seres humanos. Cada um rege um elemento e aspectos da vida.
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orixas.map((orixa) => (
          <Link
            key={orixa.slug}
            href={`/orixas/${orixa.slug}`}
            className="group bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Cabeçalho colorido */}
            <div
              className="h-24 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${orixa.corHex}33, ${orixa.corHex}88)`,
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-serif font-bold text-white shadow-lg"
                style={{ backgroundColor: orixa.corHex }}
              >
                {orixa.nome[0]}
              </div>
            </div>

            <div className="p-5">
              <h2 className="font-serif text-xl font-bold text-[#2c1810] mb-1 group-hover:text-[#4a7c59] transition-colors">
                {orixa.nome}
              </h2>
              <p className="text-[#8b5e3c] text-xs font-semibold tracking-wide italic mb-3">
                {orixa.saudacao}
              </p>
              <p className="text-[#6b4c3b] text-sm leading-relaxed line-clamp-3">
                {orixa.dominio}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#8b5e3c]">
                <span
                  className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: orixa.corHex }}
                />
                {orixa.cor} · {orixa.dia}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
