import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Minhas Rifas" };

export default async function HistoricoRifasPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: numeros } = await supabase
    .from("rifa_numeros")
    .select("*, rifas(title, status)")
    .eq("reservado_por", user!.id)
    .order("reserved_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Minhas Rifas
      </h1>

      {!numeros || numeros.length === 0 ? (
        <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-10 text-center text-[#8b5e3c]">
          <p className="font-serif text-xl mb-2">Nenhuma participação ainda</p>
          <Link href="/rifas" className="text-[#4a7c59] text-sm font-semibold hover:underline">
            Ver rifas disponíveis →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {numeros.map((n) => (
            <div
              key={n.id}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-[#2c1810] text-sm">
                  {(n.rifas as { title: string } | null)?.title ?? "Rifa"}
                </p>
                <p className="text-[#8b5e3c] text-xs mt-0.5">
                  Número {n.numero.toString().padStart(3, "0")} ·{" "}
                  {n.reserved_at ? formatDate(n.reserved_at) : "—"}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  n.status === "pago"
                    ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                    : n.status === "reservado"
                    ? "bg-[#d97706]/15 text-[#d97706]"
                    : "bg-[#8b5e3c]/10 text-[#8b5e3c]"
                }`}
              >
                {n.status === "pago"
                  ? "Pago"
                  : n.status === "reservado"
                  ? "Reservado"
                  : "Disponível"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
