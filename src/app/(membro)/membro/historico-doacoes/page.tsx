import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Histórico de Doações" };

export default async function HistoricoDoacoesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: doacoes } = await supabase
    .from("doacoes")
    .select("*")
    .eq("donor_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Minhas Doações
      </h1>

      {!doacoes || doacoes.length === 0 ? (
        <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-10 text-center text-[#8b5e3c]">
          <p className="font-serif text-xl mb-2">Nenhuma doação ainda</p>
          <p className="text-sm">
            Sua contribuição faz diferença para nossa comunidade.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {doacoes.map((d) => (
            <div
              key={d.id}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-[#2c1810] text-sm capitalize">
                  {d.type === "unica" ? "Doação Única" : "Doação Mensal"} ·{" "}
                  {d.payment_method === "pix" ? "PIX" : "Cartão"}
                </p>
                <p className="text-[#8b5e3c] text-xs mt-0.5">
                  {formatDate(d.created_at)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#2c1810]">
                  {formatCurrency(d.amount)}
                </p>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    d.status === "approved"
                      ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                      : d.status === "pending"
                      ? "bg-[#d97706]/15 text-[#d97706]"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {d.status === "approved"
                    ? "Confirmado"
                    : d.status === "pending"
                    ? "Pendente"
                    : "Rejeitado"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
