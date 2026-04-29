import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { orixas } from "@/data/orixas";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return orixas.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const orixa = orixas.find((o) => o.slug === slug);
  if (!orixa) return {};
  return {
    title: `${orixa.nome} — Orixá da Umbanda`,
    description: orixa.descricao,
  };
}

export default async function OrixaPage({ params }: Props) {
  const { slug } = await params;
  const orixa = orixas.find((o) => o.slug === slug);
  if (!orixa) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#8b5e3c] mb-8">
        <Link href="/orixas" className="hover:text-[#4a7c59] transition-colors">
          Orixás
        </Link>
        <span>/</span>
        <span className="text-[#2c1810] font-medium">{orixa.nome}</span>
      </nav>

      {/* Hero do Orixá */}
      <div
        className="rounded-3xl p-10 mb-10 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${orixa.corHex}cc, ${orixa.corHex}44)`,
        }}
      >
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-3">
            {orixa.elemento}
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl font-bold mb-2">
            {orixa.nome}
          </h1>
          <p className="text-white/80 text-2xl font-serif italic mb-6">
            {orixa.saudacao}
          </p>
          <p className="text-white/90 text-lg max-w-xl leading-relaxed">
            {orixa.dominio}
          </p>
        </div>
        {/* Círculo decorativo */}
        <div
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* Atributos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Cor sagrada", value: orixa.cor },
          { label: "Dia da semana", value: orixa.dia },
          { label: "Elemento", value: orixa.elemento },
          { label: "Saudação", value: orixa.saudacao },
        ].map((attr) => (
          <div
            key={attr.label}
            className="bg-[#fdfaf5] rounded-xl p-4 border border-[#8b5e3c]/10 text-center"
          >
            <p className="text-[#8b5e3c] text-xs font-semibold uppercase tracking-wide mb-1">
              {attr.label}
            </p>
            <p className="text-[#2c1810] font-serif font-bold text-sm">
              {attr.value}
            </p>
          </div>
        ))}
      </div>

      {/* Descrição */}
      <section className="bg-[#fdfaf5] rounded-2xl p-8 border border-[#8b5e3c]/10 mb-10">
        <h2 className="font-serif text-3xl font-bold text-[#2c1810] mb-4">
          Sobre {orixa.nome}
        </h2>
        <p className="text-[#5c3d1e] leading-relaxed text-lg">{orixa.descricao}</p>
      </section>

      {/* Navegação entre orixás */}
      <div className="flex justify-between">
        <Link
          href="/orixas"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f5ecd7] text-[#5c3d1e] font-medium rounded-xl hover:bg-[#e8d9bf] transition-colors text-sm"
        >
          ← Ver todos os Orixás
        </Link>
      </div>
    </div>
  );
}
