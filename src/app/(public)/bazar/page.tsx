import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bazar — Casa de Umbanda Aruanda",
  description:
    "Anuncie e encontre produtos novos e usados na comunidade da Casa de Umbanda Aruanda.",
};

export default async function BazarPage() {
  const supabase = createServiceClient();
  const { data: anuncios } = await supabase
    .from("bazar_anuncios")
    .select("*, profiles(name)")
    .eq("status", "ativo")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-12">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Comunidade
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Bazar
        </h1>
        <p className="text-[#6b4c3b] text-lg max-w-2xl mx-auto">
          Anuncie produtos novos e usados para a comunidade da Casa de Umbanda Aruanda
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      {/* Aviso de responsabilidade */}
      <div className="bg-[#d97706]/10 border-2 border-[#d97706]/30 rounded-2xl p-6 mb-10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#d97706] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-[#2c1810] mb-1">Aviso Importante</h3>
            <p className="text-[#5c3d1e] text-sm leading-relaxed">
              A <strong>Casa de Umbanda Aruanda</strong> disponibiliza este espaço exclusivamente como 
              canal de comunicação entre os membros da comunidade. <strong>Não nos responsabilizamos</strong>{" "}
              pelas negociações, qualidade dos produtos, entregas, pagamentos ou qualquer outro aspecto 
              relacionado aos anúncios. Toda a responsabilidade pela transação é exclusivamente entre 
              o anunciante e o interessado.
            </p>
          </div>
        </div>
      </div>

      {/* Botão para anunciar */}
      <div className="flex justify-center mb-10">
        <Link
          href="/membro/bazar/novo"
          className="px-6 py-3 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
        >
          + Anunciar produto
        </Link>
      </div>

      {/* Grid de anúncios */}
      {!anuncios || anuncios.length === 0 ? (
        <div className="text-center py-20 text-[#8b5e3c]">
          <p className="font-serif text-2xl mb-2">Nenhum anúncio ativo</p>
          <p className="text-sm">Seja o primeiro a anunciar um produto!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anuncios.map((anuncio) => (
            <Link
              key={anuncio.id}
              href={`/bazar/${anuncio.id}`}
              className="group bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {anuncio.imagens && anuncio.imagens[0] ? (
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${anuncio.imagens[0]})` }}
                />
              ) : (
                <div className="h-48 bg-gradient-to-br from-[#4a7c59]/20 to-[#8b5e3c]/20 flex items-center justify-center">
                  <span className="text-4xl opacity-40">📦</span>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      anuncio.condicao === "novo"
                        ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                        : "bg-[#8b5e3c]/15 text-[#8b5e3c]"
                    }`}
                  >
                    {anuncio.condicao === "novo" ? "Novo" : "Usado"}
                  </span>
                  <span className="text-sm font-bold text-[#d97706]">
                    {formatCurrency(anuncio.preco)}
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold text-[#2c1810] mb-2 group-hover:text-[#4a7c59] transition-colors">
                  {anuncio.titulo}
                </h2>
                {anuncio.descricao && (
                  <p className="text-[#6b4c3b] text-sm line-clamp-2 mb-3">
                    {anuncio.descricao}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-[#8b5e3c]">
                  <span>{(anuncio.profiles as { name: string } | null)?.name ?? "Membro"}</span>
                  {anuncio.localizacao && <span>{anuncio.localizacao}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
