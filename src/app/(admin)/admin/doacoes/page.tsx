import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin — Doações" };

export default async function AdminDoacoesPage() {
  const supabase = await createClient();
  const { data: doacoes } = await supabase
    .from("doacoes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const total = doacoes
    ?.filter((d) => d.status === "approved")
    .reduce((sum, d) => sum + d.amount, 0) ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810]">Doações</h1>
        <div className="bg-[#4a7c59]/15 rounded-xl px-4 py-2 text-right">
          <p className="text-xs text-[#4a7c59] font-semibold uppercase tracking-wide">
            Total aprovado
          </p>
          <p className="font-serif font-bold text-[#2c1810]">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {!doacoes || doacoes.length === 0 ? (
          <p className="text-[#8b5e3c] text-sm py-8 text-center">
            Nenhuma doação registrada.
          </p>
        ) : (
          doacoes.map((d) => (
            <div
              key={d.id}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-[#2c1810] text-sm">
                  {d.donor_name ?? d.donor_email ?? "Anônimo"}
                </p>
                <p className="text-xs text-[#8b5e3c] mt-0.5">
                  {d.type === "unica" ? "Única" : "Mensal"} ·{" "}
                  {d.payment_method === "pix" ? "PIX" : "Cartão"} ·{" "}
                  {formatDate(d.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="font-bold text-[#2c1810]">
                  {formatCurrency(d.amount)}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    d.status === "approved"
                      ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                      : d.status === "pending"
                      ? "bg-[#d97706]/15 text-[#d97706]"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {d.status === "approved"
                    ? "Aprovado"
                    : d.status === "pending"
                    ? "Pendente"
                    : "Rejeitado"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
