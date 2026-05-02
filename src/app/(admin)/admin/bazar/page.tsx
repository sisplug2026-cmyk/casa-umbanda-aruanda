import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { excluirAnuncio } from "./actions";

export const metadata: Metadata = { title: "Admin — Bazar" };

export default async function AdminBazarPage() {
  const supabase = createServiceClient();
  const { data: anuncios } = await supabase
    .from("bazar_anuncios")
    .select("*, profiles(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810]">Bazar</h1>
        <Link
          href="/bazar"
          className="px-4 py-2 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Ver página pública
        </Link>
      </div>

      <div className="space-y-3">
        {!anuncios || anuncios.length === 0 ? (
          <p className="text-[#8b5e3c] text-sm py-8 text-center">
            Nenhum anúncio no bazar.
          </p>
        ) : (
          anuncios.map((anuncio) => (
            <div
              key={anuncio.id}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex items-center gap-3">
                {anuncio.imagens && anuncio.imagens[0] ? (
                  <div
                    className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${anuncio.imagens[0]})` }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-[#8b5e3c]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📦</span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-[#2c1810] text-sm truncate">
                    {anuncio.titulo}
                  </p>
                  <p className="text-xs text-[#8b5e3c] mt-0.5">
                    {formatCurrency(anuncio.preco)} · {anuncio.condicao === "novo" ? "Novo" : "Usado"} ·{" "}
                    {(anuncio.profiles as { name: string } | null)?.name ?? "Membro"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    anuncio.status === "ativo"
                      ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                      : anuncio.status === "vendido"
                      ? "bg-[#8b5e3c]/15 text-[#8b5e3c]"
                      : "bg-[#d97706]/15 text-[#d97706]"
                  }`}
                >
                  {anuncio.status === "ativo"
                    ? "Ativo"
                    : anuncio.status === "vendido"
                    ? "Vendido"
                    : "Cancelado"}
                </span>
                <Link
                  href={`/bazar/${anuncio.id}`}
                  className="text-xs text-[#8b5e3c] hover:text-[#4a7c59] font-medium transition-colors"
                >
                  Ver
                </Link>
                <form action={excluirAnuncio} className="inline">
                  <input type="hidden" name="id" value={anuncio.id} />
                  <button
                    type="submit"
                    className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
