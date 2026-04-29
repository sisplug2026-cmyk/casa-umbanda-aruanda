import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundação da Umbanda",
  description:
    "Conheça a história do nascimento da Umbanda com Zélio Fernandino de Morais em 15 de novembro de 1908.",
  openGraph: {
    title: "Fundação da Umbanda | Casa de Umbanda Aruanda",
    description:
      "A história do nascimento da Umbanda com Zélio Fernandino de Morais.",
  },
};

export default function FundacaoPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero da página */}
      <header className="mb-12 text-center">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          15 de novembro de 1908
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-6">
          Fundação da Umbanda
        </h1>
        <p className="text-[#6b4c3b] text-xl leading-relaxed max-w-2xl mx-auto">
          A história de como uma religião genuinamente brasileira nasceu da fé e
          da missão de um jovem médium na cidade de Niterói.
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      {/* Conteúdo */}
      <div className="prose prose-lg max-w-none text-[#2c1810]">
        <section className="bg-[#fdfaf5] rounded-2xl p-8 mb-8 border border-[#8b5e3c]/10">
          <h2 className="font-serif text-3xl font-bold text-[#2c1810] mb-4">
            Zélio Fernandino de Morais
          </h2>
          <p className="text-[#5c3d1e] leading-relaxed mb-4">
            Nascido em 1891 em São Gonçalo, Rio de Janeiro, Zélio Fernandino de
            Morais foi o fundador da Umbanda. Aos 17 anos, apresentou sintomas
            que os médicos não conseguiam diagnosticar. Sua família, católica
            fervorosa, buscou auxílio em um centro espírita kardecista em
            Niterói.
          </p>
          <p className="text-[#5c3d1e] leading-relaxed mb-4">
            Na sessão de 15 de novembro de 1908, incorporou uma entidade que se
            identificou como o <strong>Caboclo das Sete Encruzilhadas</strong>.
            Quando questionado sobre sua identidade, a entidade respondeu:{" "}
            <em>
              &ldquo;Se querem saber quem sou, digo que sou um espírito que
              deseja praticar a caridade.&rdquo;
            </em>
          </p>
          <p className="text-[#5c3d1e] leading-relaxed">
            No dia seguinte, 16 de novembro de 1908, foi realizada a primeira
            sessão de Umbanda, no município de Niterói. Assim nasceu a primeira
            tenda de Umbanda do Brasil: a <strong>Tenda Espírita Nossa Senhora da Piedade</strong>.
          </p>
        </section>

        <section className="bg-[#fdfaf5] rounded-2xl p-8 mb-8 border border-[#8b5e3c]/10">
          <h2 className="font-serif text-3xl font-bold text-[#2c1810] mb-4">
            A Mensagem do Caboclo
          </h2>
          <blockquote className="border-l-4 border-[#4a7c59] pl-6 italic text-[#5c3d1e] text-xl leading-relaxed my-6">
            &ldquo;A Umbanda é uma religião que está nascendo. Seus médiuns serão
            pessoas humildes, trabalhadoras, que usarão suas capacidades para o
            bem, sem cobrar nada por isso. A caridade será a base desta
            doutrina.&rdquo;
          </blockquote>
          <p className="text-[#5c3d1e] leading-relaxed">
            A Umbanda surge como uma religião essencialmente brasileira, que une
            elementos do espiritismo kardecista, do catolicismo, das religiões
            africanas e das tradições indígenas. Uma síntese única que reflete a
            alma do povo brasileiro.
          </p>
        </section>

        <section className="bg-[#fdfaf5] rounded-2xl p-8 border border-[#8b5e3c]/10">
          <h2 className="font-serif text-3xl font-bold text-[#2c1810] mb-4">
            Princípios Fundamentais
          </h2>
          <ul className="space-y-3">
            {[
              "Caridade como base de todos os atos",
              "Prática espiritual gratuita — nunca cobrar pelo passe ou consulta",
              "Fraternidade entre todos os seres",
              "Respeito à natureza e seus elementos",
              "União das tradições brasileiras: africanas, indígenas e europeias",
              "Amor ao próximo sem distinção de raça, cor ou condição social",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#5c3d1e]">
                <span className="mt-1 w-5 h-5 rounded-full bg-[#4a7c59]/20 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#4a7c59]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
