import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Admin — Gerenciar Rifa" };

export default async function AdminRifaDetalhe({ params }: Props) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data: rifa } = await supabase
    .from("rifas")
    .select("*")
    .eq("id", id)
    .single();

  if (!rifa) notFound();

  const { data: numeros } = await supabase
    .from("rifa_numeros")
    .select("numero, nome_exibicao, status, nome_interessado, telefone_interessado, paid_at")
    .eq("rifa_id", id)
    .order("numero");

  const pagos = numeros?.filter((n) => n.status === "pago").length ?? 0;
  const total = numeros?.length ?? 0;
  const todosPagos = total > 0 && pagos === total;
  const usaNomes = rifa.tipo_numeracao !== "numerica";

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-2">
        {rifa.title}
      </h1>
      <p className="text-[#8b5e3c] text-sm mb-4">
        {formatCurrency(rifa.price_per_num)}/número · {pagos}/{total} pagos
      </p>

      {/* Imagem do prêmio */}
      {rifa.prize_images && rifa.prize_images[0] && (
        <div className="mb-6">
          <img
            src={rifa.prize_images[0]}
            alt={rifa.title}
            className="w-full max-w-md h-64 object-cover rounded-2xl border border-[#8b5e3c]/10"
          />
        </div>
      )}

      {/* Status e ação de sorteio */}
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#2c1810] mb-1">
              Status:{" "}
              <span
                className={
                  rifa.status === "active"
                    ? "text-[#4a7c59]"
                    : rifa.status === "drawn"
                    ? "text-[#8b5e3c]"
                    : "text-[#d97706]"
                }
              >
                {rifa.status === "active"
                  ? "Ativa"
                  : rifa.status === "drawn"
                  ? "Sorteada"
                  : "Encerrada"}
              </span>
            </p>
            {rifa.status === "drawn" && rifa.winner_numero && (
              <p className="text-sm text-[#4a7c59] font-semibold">
                Vencedor: {usaNomes 
                  ? numeros?.find(n => n.numero === rifa.winner_numero)?.nome_exibicao || rifa.winner_numero
                  : String(rifa.winner_numero).padStart(3, "0")
                }
              </p>
            )}
          </div>

          {todosPagos && rifa.status === "active" && (
            <form action={`/api/rifas/${id}/sortear`} method="POST">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                🎉 Realizar Sorteio
              </button>
            </form>
          )}

          {!todosPagos && rifa.status === "active" && (
            <p className="text-xs text-[#8b5e3c]">
              Sorteio disponível quando todos os {total} números forem pagos.
            </p>
          )}
        </div>
      </div>

      {/* Grid de números */}
      <h2 className="font-serif text-lg font-bold text-[#2c1810] mb-3">
        {usaNomes ? "Nomes" : "Números"}
      </h2>
      <div className={`grid gap-1.5 mb-4 ${
        usaNomes 
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" 
          : "grid-cols-5 sm:grid-cols-8 md:grid-cols-10"
      }`}>
        {numeros?.map((n) => {
          const display = n.nome_exibicao || n.numero.toString().padStart(3, "0");
          return (
            <div
              key={n.numero}
              title={n.nome_interessado ?? undefined}
              className={`
                rounded-lg text-xs font-bold flex items-center justify-center
                ${usaNomes ? "py-3 px-2" : "aspect-square"}
                ${
                  n.status === "pago"
                    ? "bg-[#6b7280] text-white"
                    : n.status === "reservado"
                    ? "bg-[#d97706] text-white"
                    : "bg-[#4a7c59] text-white"
                }
              `}
            >
              {display}
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="flex gap-4 text-xs text-[#6b4c3b] mb-8">
        {[
          { color: "bg-[#4a7c59]", label: "Disponível" },
          { color: "bg-[#d97706]", label: "Reservado" },
          { color: "bg-[#6b7280]", label: "Pago" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Lista de participantes pagos */}
      {pagos > 0 && (
        <>
          <h2 className="font-serif text-lg font-bold text-[#2c1810] mb-3">
            Participantes ({pagos})
          </h2>
          <div className="space-y-2">
            {numeros
              ?.filter((n) => n.status === "pago")
              .map((n) => (
                <div
                  key={n.numero}
                  className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-3 flex items-center justify-between text-sm"
                >
                  <span className="font-semibold text-[#2c1810]">
                    {usaNomes ? n.nome_exibicao : `#${n.numero.toString().padStart(3, "0")}`}
                  </span>
                  <span className="text-[#5c3d1e]">{n.nome_interessado}</span>
                  <span className="text-[#8b5e3c] text-xs">
                    {n.telefone_interessado}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
