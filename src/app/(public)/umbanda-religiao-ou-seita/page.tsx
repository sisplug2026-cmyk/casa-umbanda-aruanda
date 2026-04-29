import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Umbanda: Religião ou Seita?",
  description:
    "Análise profunda sobre a natureza da Umbanda como religião reconhecida e seus fundamentos doutrinários.",
};

export default function UmbandaReligiaoOuSeitaPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-12">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Esclarecimento
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Umbanda: Religião ou Seita?
        </h1>
        <p className="text-[#6b4c3b] text-lg max-w-2xl mx-auto">
          Uma análise honesta e fundamentada sobre a natureza da Umbanda no
          contexto religioso e social brasileiro
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      <div className="space-y-8">
        <section className="bg-[#fdfaf5] rounded-2xl p-8 border border-[#8b5e3c]/10">
          <h2 className="font-serif text-3xl font-bold text-[#2c1810] mb-4">
            O que é uma religião?
          </h2>
          <p className="text-[#5c3d1e] leading-relaxed mb-4">
            Segundo a definição acadêmica e jurídica, uma religião é um sistema
            organizado de crenças, práticas, valores éticos e rituais que conecta
            os seres humanos ao sagrado. A Umbanda preenche todos esses critérios.
          </p>
          <p className="text-[#5c3d1e] leading-relaxed">
            No Brasil, a liberdade religiosa está garantida pela Constituição
            Federal de 1988 (Art. 5º, VI), e a Umbanda é uma religião legalmente
            reconhecida, com federações, confederações e representação nacional.
          </p>
        </section>

        <section className="bg-[#fdfaf5] rounded-2xl p-8 border border-[#8b5e3c]/10">
          <h2 className="font-serif text-3xl font-bold text-[#2c1810] mb-4">
            A Umbanda tem doutrina?
          </h2>
          <p className="text-[#5c3d1e] leading-relaxed mb-4">
            Sim. A Umbanda possui uma estrutura doutrinária clara, baseada em:
          </p>
          <ul className="space-y-3">
            {[
              "Crença em Deus supremo (Olorum/Zambi)",
              "Intermediação dos Orixás como forças da natureza",
              "Trabalho com espíritos evoluídos (entidades)",
              "Lei do karma e da reencarnação",
              "Caridade como pilar central",
              "Evolução espiritual contínua",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#5c3d1e]">
                <span className="w-2 h-2 rounded-full bg-[#4a7c59] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-gradient-to-br from-[#2d5c3a] to-[#4a7c59] rounded-2xl p-8 text-white">
          <h2 className="font-serif text-3xl font-bold text-[#f5ecd7] mb-4">
            A resposta
          </h2>
          <p className="text-[#e8d9bf] leading-relaxed text-lg">
            <strong className="text-white">A Umbanda é uma religião.</strong>{" "}
            Com mais de um século de existência, milhões de adeptos no Brasil e
            no mundo, doutrina estruturada, práticas rituais definidas e
            fundamentos éticos sólidos baseados na caridade e no amor ao próximo.
          </p>
          <p className="text-[#e8d9bf] leading-relaxed mt-4">
            O termo "seita" carrega conotação pejorativa e não se aplica à
            Umbanda. É fruto de preconceito histórico contra as religiões de
            matriz africana no Brasil — um preconceito que a educação e o
            conhecimento têm o poder de superar.
          </p>
        </section>
      </div>
    </article>
  );
}
