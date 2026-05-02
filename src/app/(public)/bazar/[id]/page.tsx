import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: anuncio } = await supabase
    .from("bazar_anuncios")
    .select("titulo, descricao")
    .eq("id", id)
    .eq("status", "ativo")
    .single();
  if (!anuncio) return {};
  return { title: anuncio.titulo, description: anuncio.descricao ?? undefined };
}

export default async function BazarDetalhePage({ params }: Props) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data: anuncio } = await supabase
    .from("bazar_anuncios")
    .select("*, profiles(name, phone)")
    .eq("id", id)
    .eq("status", "ativo")
    .single();

  if (!anuncio) notFound();

  const perfil = anuncio.profiles as { name: string; phone: string | null } | null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-[#8b5e3c] mb-8">
        <Link href="/bazar" className="hover:text-[#4a7c59] transition-colors">
          Bazar
        </Link>
        <span>/</span>
        <span className="text-[#2c1810] font-medium line-clamp-1">{anuncio.titulo}</span>
      </nav>

      {/* Aviso */}
      <div className="bg-[#d97706]/10 border-2 border-[#d97706]/30 rounded-xl p-4 mb-8">
        <p className="text-sm text-[#5c3d1e]">
          <strong>Aviso:</strong> A Casa de Umbanda Aruanda não se responsabiliza por esta negociação. 
          Toda responsabilidade é entre o anunciante e o interessado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagens */}
        <div>
          {anuncio.imagens && anuncio.imagens[0] ? (
            <div className="space-y-3">
              <div
                className="w-full h-80 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${anuncio.imagens[0]})` }}
              />
              {anuncio.imagens.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {anuncio.imagens.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-[#4a7c59]/20 to-[#8b5e3c]/20 flex items-center justify-center">
              <span className="text-6xl opacity-40">📦</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  anuncio.condicao === "novo"
                    ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                    : "bg-[#8b5e3c]/15 text-[#8b5e3c]"
                }`}
              >
                {anuncio.condicao === "novo" ? "Novo" : "Usado"}
              </span>
              {anuncio.categoria && (
                <span className="text-sm text-[#8b5e3c]">{anuncio.categoria}</span>
              )}
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-2">
              {anuncio.titulo}
            </h1>
            <p className="text-3xl font-bold text-[#d97706]">
              {formatCurrency(anuncio.preco)}
            </p>
          </div>

          {anuncio.descricao && (
            <div>
              <h2 className="font-semibold text-[#2c1810] mb-2">Descrição</h2>
              <p className="text-[#6b4c3b] leading-relaxed">{anuncio.descricao}</p>
            </div>
          )}

          <div className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-5 space-y-3">
            <h2 className="font-semibold text-[#2c1810]">Contato do vendedor</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#8b5e3c]">Nome</span>
                <span className="font-medium text-[#2c1810]">{perfil?.name ?? "Membro"}</span>
              </div>
              {anuncio.localizacao && (
                <div className="flex justify-between">
                  <span className="text-[#8b5e3c]">Localização</span>
                  <span className="font-medium text-[#2c1810]">{anuncio.localizacao}</span>
                </div>
              )}
            </div>

            {anuncio.telefone && (
              <a
                href={`https://wa.me/55${anuncio.telefone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 px-4 py-3 bg-[#25d366] text-white text-center font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Conversar no WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
