import Link from "next/link";

const features = [
  {
    icon: "🌿",
    title: "Fundação da Umbanda",
    description:
      "Conheça a história do nascimento da Umbanda com Zélio Fernandino de Morais em 1908.",
    href: "/fundacao",
    color: "from-[#4a7c59] to-[#2d5c3a]",
  },
  {
    icon: "✨",
    title: "Os Orixás",
    description:
      "Descubra as energias e domínios de cada Orixá que rege a Umbanda.",
    href: "/orixas",
    color: "from-[#8b5e3c] to-[#5c3d1e]",
  },
  {
    icon: "🔮",
    title: "Mistérios e Dúvidas",
    description:
      "Respostas claras sobre os ritos, rituais e práticas da Umbanda.",
    href: "/misterios",
    color: "from-[#7b9ec0] to-[#4a7c80]",
  },
  {
    icon: "📖",
    title: "Blog Espiritual",
    description:
      "Artigos, mensagens e ensinamentos da nossa comunidade espiritual.",
    href: "/blog",
    color: "from-[#4a7c59] to-[#2d5c3a]",
  },
  {
    icon: "🕊️",
    title: "Doações",
    description:
      "Contribua com a manutenção e crescimento da casa com amor e fé.",
    href: "/doacoes",
    color: "from-[#8b5e3c] to-[#5c3d1e]",
  },
  {
    icon: "🎉",
    title: "Rifas e Sorteios",
    description:
      "Participe das nossas rifas e concorra a prêmios especiais.",
    href: "/rifas",
    color: "from-[#d97706] to-[#b45309]",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-[#f5ecd7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2c1810] mb-4">
            Nossa Comunidade
          </h2>
          <p className="text-[#6b4c3b] text-lg max-w-2xl mx-auto">
            Explore tudo que a Casa de Umbanda Aruanda tem a oferecer para sua
            jornada espiritual
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2c1810] mb-2 group-hover:text-[#4a7c59] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#6b4c3b] text-sm leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
