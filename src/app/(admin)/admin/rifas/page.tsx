import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { excluirRifa } from "./actions";

export const metadata: Metadata = { title: "Admin — Rifas" };

export default async function AdminRifasPage() {
  const supabase = createServiceClient();
  const { data: rifas } = await supabase
    .from("rifas")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810]">Rifas</h1>
        <Link
          href="/admin/rifas/nova"
          className="px-4 py-2 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          + Nova rifa
        </Link>
      </div>

      <div className="space-y-3">
        {!rifas || rifas.length === 0 ? (
          <p className="text-[#8b5e3c] text-sm py-8 text-center">
            Nenhuma rifa criada ainda.
          </p>
        ) : (
          rifas.map((rifa) => (
            <div
              key={rifa.id}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-[#2c1810] text-sm truncate">
                  {rifa.title}
                </p>
                <p className="text-xs text-[#8b5e3c] mt-0.5">
                  Números: {rifa.numero_inicio}–{rifa.numero_fim} ·{" "}
                  {formatCurrency(rifa.price_per_num)}/número
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    rifa.status === "active"
                      ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                      : rifa.status === "drawn"
                      ? "bg-[#8b5e3c]/15 text-[#8b5e3c]"
                      : "bg-[#d97706]/15 text-[#d97706]"
                  }`}
                >
                  {rifa.status === "active"
                    ? "Ativa"
                    : rifa.status === "drawn"
                    ? "Sorteada"
                    : "Encerrada"}
                </span>
                <Link
                  href={`/admin/rifas/${rifa.id}`}
                  className="text-xs text-[#8b5e3c] hover:text-[#4a7c59] font-medium transition-colors"
                >
                  Gerenciar
                </Link>
                <form action={excluirRifa} className="inline">
                  <input type="hidden" name="id" value={rifa.id} />
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
