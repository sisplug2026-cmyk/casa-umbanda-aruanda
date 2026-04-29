import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diferenças entre Umbanda e Candomblé",
  description:
    "Entenda as principais diferenças e semelhanças entre Umbanda e Candomblé de forma clara e respeitosa.",
};

const diferencas = [
  {
    aspecto: "Origem",
    umbanda: "Brasil, 1908 — síntese das culturas africana, indígena e europeia",
    candomble:
      "África, trazida pelos escravizados — preserva tradições originais africanas",
  },
  {
    aspecto: "Entidades cultuadas",
    umbanda: "Orixás, Caboclos, Pretos-Velhos, Exus, Crianças (Erês) e outras linhas",
    candomble: "Principalmente Orixás, Voduns (Jeje) e Inquices (Angola/Banto)",
  },
  {
    aspecto: "Idioma ritual",
    umbanda: "Português (com alguns termos africanos e indígenas)",
    candomble:
      "Yorùbá (Ketu), Fon (Jeje) ou Quimbundo/Quicongo (Angola) — conforme a nação",
  },
  {
    aspecto: "Iniciação",
    umbanda: "Desenvolvimento mediúnico — não obrigatório para frequentar",
    candomble:
      "Iniciação (feitura do santo) — processo longo e estruturado, obrigatório para médiuns",
  },
  {
    aspecto: "Sacrifício de animais",
    umbanda: "Não utiliza (na maioria das casas tradicionais)",
    candomble:
      "Presente em alguns rituais — parte da tradição africana de oferenda aos Orixás",
  },
  {
    aspecto: "Vestimenta",
    umbanda: "Branco como base; roupas coloridas conforme o Orixá do médium",
    candomble: "Roupas elaboradas conforme a nação e o Orixá — traje típico africano",
  },
];

export default function UmbandaCandonblePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Comparativo
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Umbanda e Candomblé
        </h1>
        <p className="text-[#6b4c3b] text-lg max-w-2xl mx-auto">
          Duas religiões de matriz africana, cada uma com sua identidade,
          riqueza e beleza próprias
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 overflow-hidden mb-10">
        <div className="grid grid-cols-3 bg-gradient-to-r from-[#2d5c3a] to-[#4a7c59] text-white">
          <div className="p-4 font-semibold text-sm text-[#e8d9bf]">Aspecto</div>
          <div className="p-4 font-semibold text-sm text-center border-l border-white/20">
            Umbanda
          </div>
          <div className="p-4 font-semibold text-sm text-center border-l border-white/20">
            Candomblé
          </div>
        </div>
        {diferencas.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 border-t border-[#8b5e3c]/10 ${
              i % 2 === 0 ? "bg-[#fdfaf5]" : "bg-[#f5ecd7]/50"
            }`}
          >
            <div className="p-4 font-semibold text-[#2c1810] text-sm">
              {item.aspecto}
            </div>
            <div className="p-4 text-[#5c3d1e] text-sm border-l border-[#8b5e3c]/10">
              {item.umbanda}
            </div>
            <div className="p-4 text-[#5c3d1e] text-sm border-l border-[#8b5e3c]/10">
              {item.candomble}
            </div>
          </div>
        ))}
      </div>

      <section className="bg-gradient-to-br from-[#8b5e3c] to-[#5c3d1e] rounded-2xl p-8 text-white">
        <h2 className="font-serif text-2xl font-bold text-[#f5ecd7] mb-4">
          O que une as duas religiões
        </h2>
        <p className="text-[#e8d9bf] leading-relaxed">
          Umbanda e Candomblé compartilham raízes na sabedoria africana e o culto
          aos Orixás. Ambas representam a resistência e a riqueza espiritual do
          povo negro no Brasil. Merecem igual respeito, admiração e proteção
          contra o preconceito religioso.
        </p>
      </section>
    </div>
  );
}
