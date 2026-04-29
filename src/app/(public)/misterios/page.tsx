import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mistérios e Dúvidas sobre a Umbanda",
  description:
    "Respostas claras sobre os principais mistérios, ritos e práticas da Umbanda.",
};

const faqs = [
  {
    pergunta: "Umbanda é macumba?",
    resposta:
      'Não. "Macumba" é um termo pejorativo e genérico usado popularmente para designar qualquer religião afro-brasileira. A Umbanda é uma religião estruturada com doutrina, hierarquia e princípios éticos bem definidos, baseada na caridade e no amor ao próximo.',
  },
  {
    pergunta: "Umbandistas fazem trabalhos para prejudicar pessoas?",
    resposta:
      "Não. A verdadeira Umbanda trabalha exclusivamente para o bem, baseada na caridade. Qualquer prática que vise prejudicar terceiros vai contra os fundamentos da religião. Trabalhos negativos são associados à Quimbanda ou ao feitiço, práticas distintas da Umbanda.",
  },
  {
    pergunta: "Preciso me iniciar para frequentar uma gira?",
    resposta:
      "Não é necessário. Qualquer pessoa pode assistir a uma sessão de Umbanda como consulente. A iniciação (corte de santo) é apenas para aqueles que desejam desenvolver sua mediunidade como médiuns trabalhadores da casa.",
  },
  {
    pergunta: "O que são as entidades espirituais da Umbanda?",
    resposta:
      "São espíritos evoluídos que, por missão e caridade, retornam ao plano terreno para auxiliar a humanidade. As principais linhas são: Caboclos (espíritos de indígenas), Pretos-Velhos (ancestrais africanos), Crianças (Erês), Exus e Pombagiras, Marinheiros, entre outras.",
  },
  {
    pergunta: "Umbanda e Candomblé são a mesma coisa?",
    resposta:
      "Não. Embora compartilhem raízes africanas e cultuem os Orixás, são religiões distintas com rituais, hierarquia e práticas diferentes. O Candomblé preserva com mais rigor as tradições africanas originais (nações Nagô, Jeje, Angola), enquanto a Umbanda é uma síntese tipicamente brasileira.",
  },
  {
    pergunta: "Por que se usa branco nas sessões?",
    resposta:
      "O branco representa pureza, paz e proteção espiritual. É a cor de Oxalá, o orixá de maior vibração espiritual. Usar branco nas sessões facilita a conexão espiritual e protege o médium durante os trabalhos.",
  },
  {
    pergunta: "O que são os Orixás?",
    resposta:
      "Os Orixás são forças da natureza divinizadas, emanações do criador supremo (Olorum/Zambi). Cada Orixá governa um elemento da natureza e aspectos da vida humana. Eles são intermediários entre o divino e os seres humanos.",
  },
];

export default function MisteriosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Esclarecimentos
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Mistérios e Dúvidas
        </h1>
        <p className="text-[#6b4c3b] text-lg max-w-xl mx-auto">
          Respostas simples e honestas sobre a Umbanda para quem deseja
          conhecer melhor esta religião
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#fdfaf5] rounded-2xl p-6 border border-[#8b5e3c]/10 hover:border-[#4a7c59]/30 transition-colors"
          >
            <h2 className="font-serif text-xl font-bold text-[#2c1810] mb-3 flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-[#4a7c59] text-white text-xs flex items-center justify-center flex-shrink-0 font-sans">
                ?
              </span>
              {faq.pergunta}
            </h2>
            <p className="text-[#5c3d1e] leading-relaxed pl-9">{faq.resposta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
