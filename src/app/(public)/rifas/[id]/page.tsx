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
  const { data: rifa } = await supabase
    .from("rifas")
    .select("title, description")
    .eq("id", id)
    .single();
  if (!rifa) return {};
  return { title: rifa.title, description: rifa.description ?? undefined };
}

export default async function RifaPage({ params }: Props) {
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
    .select("numero, nome_exibicao, status")
    .eq("rifa_id", id)
    .order("numero");

  const totalNumeros = numeros?.length ?? 0;
  const pagos = numeros?.filter((n) => n.status === "pago").length ?? 0;
  const reservados = numeros?.filter((n) => n.status === "reservado").length ?? 0;
  const disponiveis = numeros?.filter((n) => n.status === "disponivel").length ?? 0;

  // Verificar se usa numeração especial (nomes/times)
  const usaNomes = rifa.tipo_numeracao !== "numerica";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-[#8b5e3c] mb-8">
        <Link href="/rifas" className="hover:text-[#4a7c59] transition-colors">
          Rifas
        </Link>
        <span>/</span>
        <span className="text-[#2c1810] font-medium">{rifa.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info da rifa */}
        <div className="lg:col-span-1">
          {rifa.prize_images && rifa.prize_images[0] ? (
            <div
              className="w-full h-56 rounded-2xl bg-cover bg-center mb-4"
              style={{ backgroundImage: `url(${rifa.prize_images[0]})` }}
            />
          ) : (
            <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-[#d97706]/20 to-[#b45309]/20 flex items-center justify-center mb-4">
              <span className="text-6xl opacity-40">🎉</span>
            </div>
          )}

          <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-2">
            {rifa.title}
          </h1>
          {rifa.description && (
            <p className="text-[#6b4c3b] text-sm leading-relaxed mb-4">
              {rifa.description}
            </p>
          )}

          <div className="bg-[#fdfaf5] rounded-xl p-4 border border-[#8b5e3c]/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#8b5e3c]">Valor por número</span>
              <span className="font-semibold text-[#2c1810]">
                {formatCurrency(rifa.price_per_num)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b5e3c]">Total de números</span>
              <span className="font-semibold text-[#2c1810]">{totalNumeros}</span>
            </div>
            <hr className="border-[#8b5e3c]/10" />
            <div className="flex justify-between">
              <span className="text-[#4a7c59]">Disponíveis</span>
              <span className="font-semibold text-[#4a7c59]">{disponiveis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#d97706]">Reservados</span>
              <span className="font-semibold text-[#d97706]">{reservados}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b5e3c]">Pagos</span>
              <span className="font-semibold text-[#8b5e3c]">{pagos}</span>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {[
              { color: "bg-[#4a7c59]", label: "Disponível" },
              { color: "bg-[#d97706]", label: "Reservado" },
              { color: "bg-[#6b7280]", label: "Pago" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm ${item.color}`} />
                <span className="text-[#6b4c3b]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid de números */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-xl font-bold text-[#2c1810] mb-4">
            {usaNomes ? "Escolha seu(s) nome(s)" : "Escolha seu(s) número(s)"}
          </h2>
          <div className={`grid gap-1.5 ${
            usaNomes 
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" 
              : "grid-cols-5 sm:grid-cols-8 md:grid-cols-10"
          }`}>
            {numeros?.map((n) => {
              const display = n.nome_exibicao || n.numero.toString().padStart(3, "0");
              return (
                <button
                  key={n.numero}
                  disabled={n.status !== "disponivel"}
                  title={display}
                  className={`
                    rounded-lg text-xs font-bold transition-all
                    ${
                      n.status === "disponivel"
                        ? "bg-[#4a7c59] text-white hover:bg-[#2d5c3a] hover:scale-105 cursor-pointer"
                        : n.status === "reservado"
                        ? "bg-[#d97706] text-white cursor-not-allowed opacity-80"
                        : "bg-[#6b7280] text-white cursor-not-allowed opacity-60"
                    }
                    ${usaNomes ? "py-3 px-2" : "aspect-square"}
                  `}
                >
                  {display}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#8b5e3c] mt-4">
            Clique em um {usaNomes ? "nome" : "número"} verde para reservá-lo. A reserva expira em 30 minutos
            sem pagamento.
          </p>
        </div>
      </div>
    </div>
  );
}
