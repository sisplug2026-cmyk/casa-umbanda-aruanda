import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
      {/* SVG Natureza — Folhas decorativas */}
      <NaturezaDecoracao />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#f5ecd7] text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#7bae8d] animate-pulse" />
            Desde 15 de novembro de 1908
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Casa de Umbanda{" "}
            <span className="text-[#7bae8d]">Aruanda</span>
          </h1>

          <p className="text-[#e8d9bf] text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            Fé, tradição e amor ao próximo. Uma comunidade espiritual aberta a
            todos que buscam luz, equilíbrio e conexão com as forças da natureza.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/fundacao"
              className="inline-flex items-center px-6 py-3 bg-[#7bae8d] text-[#2c1810] font-semibold rounded-xl hover:bg-[#4a7c59] hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Nossa História
            </Link>
            <Link
              href="/orixas"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Conhecer os Orixás
            </Link>
          </div>
        </div>
      </div>

      {/* Gradiente de transição na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5ecd7] to-transparent" />
    </section>
  );
}

function NaturezaDecoracao() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Folha grande — canto superior direito */}
      <svg
        className="absolute -top-10 -right-16 w-96 h-96 text-[#2d5c3a]/30 animate-[spin_60s_linear_infinite]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100 10 C130 10 180 40 190 100 C180 160 130 190 100 190 C70 190 20 160 10 100 C20 40 70 10 100 10Z" />
      </svg>

      {/* Folha média — canto inferior esquerdo */}
      <svg
        className="absolute -bottom-8 -left-12 w-64 h-64 text-[#4a7c59]/25 animate-[spin_45s_linear_infinite_reverse]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100 5 C60 5 5 40 5 100 C5 160 60 195 100 195 C140 195 195 160 195 100 C195 40 140 5 100 5Z" />
      </svg>

      {/* Círculos de água — centro direito */}
      <div className="absolute top-1/3 right-10 space-y-4 opacity-20">
        {[80, 56, 32].map((size, i) => (
          <div
            key={i}
            className="rounded-full border-2 border-[#7b9ec0]"
            style={{
              width: size,
              height: size,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Pontos decorativos */}
      <div className="absolute top-20 left-1/3 grid grid-cols-4 gap-3 opacity-15">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f5ecd7]" />
        ))}
      </div>
    </div>
  );
}
