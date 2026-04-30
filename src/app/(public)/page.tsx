import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BencaoPaz from "@/components/home/BencaoPaz";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Casa de Umbanda Aruanda — Fé, Tradição e Espiritualidade",
  description:
    "Bem-vindo à Casa de Umbanda Aruanda. Conheça nossa história, os Orixás, nossa comunidade e como participar.",
};

export default async function HomePage() {
  const supabase = createServiceClient();
  
  // Buscar a benção de paz mais recente
  const { data: bencao } = await supabase
    .from("downloads")
    .select("*")
    .eq("category", "bencao-de-paz")
    .eq("file_type", "audio")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <>
      <HeroSection />
      <FeaturesSection />

      {/* Seção Benção de Paz */}
      <BencaoPaz
        audioUrl={bencao?.file_url || null}
        titulo={bencao?.title || "Mensagem de Paz"}
        data={bencao?.created_at 
          ? new Date(bencao.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : ""
        }
      />

      {/* Seção de Citação */}
      <section className="py-16 bg-[#2d5c3a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <blockquote className="font-serif text-2xl sm:text-3xl text-[#f5ecd7] italic leading-relaxed mb-6">
            &ldquo;A Umbanda é a religião que serve ao próximo sem distinção de
            raça, cor, credo ou condição social.&rdquo;
          </blockquote>
          <p className="text-[#7bae8d] font-semibold">
            Zélio Fernandino de Morais — 15 de novembro de 1908
          </p>
        </div>
      </section>
    </>
  );
}
