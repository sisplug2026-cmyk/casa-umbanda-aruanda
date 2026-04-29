import type { Metadata } from "next";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rifas e Sorteios",
  description:
    "Participe das rifas da Casa de Umbanda Aruanda e concorra a prêmios especiais.",
};

// Cliente Supabase simples sem cookies para dados públicos
async function getRifas() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.error("Missing env vars");
    return [];
  }
  
  const res = await fetch(`${url}/rest/v1/rifas?status=in.(active,closed)&order=created_at.desc`, {
    headers: {
      "apikey": key,
      "Authorization": `Bearer ${key}`,
    },
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    console.error("Error fetching rifas:", res.status, await res.text());
    return [];
  }
  
  return res.json();
}

export default async function RifasPage() {
  const rifas = await getRifas();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Sorteios
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Rifas
        </h1>
        <p className="text-[#6b4c3b] text-lg">
          Participe, colabore com a casa e concorra a prêmios especiais
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      {rifas.length === 0 ? (
        <div className="text-center py-20 text-[#8b5e3c]">
          <p className="font-serif text-2xl mb-2">Nenhuma rifa ativa</p>
          <p className="text-sm">Volte em breve para participar de novos sorteios.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rifas.map((rifa: any) => (
            <Link
              key={rifa.id}
              href={`/rifas/${rifa.id}`}
              className="group bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {rifa.prize_images && rifa.prize_images[0] ? (
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${rifa.prize_images[0]})` }}
                />
              ) : (
                <div className="h-48 bg-gradient-to-br from-[#d97706]/20 to-[#b45309]/20 flex items-center justify-center">
                  <span className="text-4xl opacity-40">🎉</span>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      rifa.status === "active"
                        ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                        : "bg-[#8b5e3c]/15 text-[#8b5e3c]"
                    }`}
                  >
                    {rifa.status === "active" ? "Ativa" : "Encerrada"}
                  </span>
                  <span className="text-sm font-semibold text-[#d97706]">
                    {formatCurrency(rifa.price_per_num)} / número
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold text-[#2c1810] mb-2 group-hover:text-[#4a7c59] transition-colors">
                  {rifa.title}
                </h2>
                {rifa.description && (
                  <p className="text-[#6b4c3b] text-sm line-clamp-2">
                    {rifa.description}
                  </p>
                )}
                <p className="text-xs text-[#8b5e3c] mt-3">
                  Números: {rifa.numero_inicio.toString().padStart(3, "0")} a{" "}
                  {rifa.numero_fim.toString().padStart(3, "0")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
