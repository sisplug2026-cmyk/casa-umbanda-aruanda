import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard Admin" };

export default async function AdminDashboardPage() {
  const supabase = createServiceClient();

  // Buscar contagens
  const { count: postsCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  const { count: downloadsCount } = await supabase
    .from("downloads")
    .select("*", { count: "exact", head: true });

  const { count: rifasCount } = await supabase
    .from("rifas")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const { count: doacoesCount } = await supabase
    .from("doacoes")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  const cards = [
    { label: "Posts publicados", value: postsCount ?? 0, color: "from-[#4a7c59] to-[#2d5c3a]" },
    { label: "Downloads", value: downloadsCount ?? 0, color: "from-[#8b5e3c] to-[#5c3d1e]" },
    { label: "Doações aprovadas", value: doacoesCount ?? 0, color: "from-[#d97706] to-[#b45309]" },
    { label: "Rifas ativas", value: rifasCount ?? 0, color: "from-[#7b9ec0] to-[#4a7c80]" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-2">
        Dashboard
      </h1>
      <p className="text-[#6b4c3b] mb-8">
        Bem-vindo ao painel de administração da Casa de Umbanda Aruanda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white`}
          >
            <p className="text-white/70 text-sm font-medium mb-1">{card.label}</p>
            <p className="text-4xl font-serif font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
