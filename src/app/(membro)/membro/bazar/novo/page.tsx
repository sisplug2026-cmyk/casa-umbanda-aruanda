import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NovoAnuncioForm from "./NovoAnuncioForm";

export const metadata: Metadata = { title: "Novo Anúncio — Bazar" };

export default async function NovoAnuncioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/membro/bazar/novo");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-2">
        Novo Anúncio
      </h1>
      <p className="text-[#8b5e3c] mb-6">
        Preencha os dados do produto que deseja anunciar no bazar.
      </p>

      {/* Aviso */}
      <div className="bg-[#d97706]/10 border-2 border-[#d97706]/30 rounded-xl p-4 mb-6">
        <p className="text-sm text-[#5c3d1e]">
          <strong>Aviso:</strong> A Casa de Umbanda Aruanda disponibiliza este espaço exclusivamente 
          como canal de comunicação. Não nos responsabilizamos pelas negociações, qualidade dos 
          produtos, entregas, pagamentos ou qualquer outro aspecto relacionado aos anúncios.
        </p>
      </div>

      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <NovoAnuncioForm />
      </div>
    </div>
  );
}
