import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2c1810] text-[#e8d9bf] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Identidade */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#2d5c3a] flex items-center justify-center">
                <span className="text-white text-lg font-bold font-serif">A</span>
              </div>
              <div>
                <p className="font-serif font-bold text-[#f5ecd7] leading-tight">
                  Casa de Umbanda
                </p>
                <p className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase">
                  Aruanda
                </p>
              </div>
            </div>
            <p className="text-sm text-[#c4956a] leading-relaxed">
              Religião, tradição e espiritualidade. Luz, fé e amor ao próximo
              desde nossa fundação.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif font-bold text-[#f5ecd7] mb-4">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/fundacao", label: "Fundação da Umbanda" },
                { href: "/orixas", label: "Os Orixás" },
                { href: "/misterios", label: "Mistérios e Dúvidas" },
                { href: "/umbanda-religiao-ou-seita", label: "Umbanda: Religião ou Seita?" },
                { href: "/umbanda-candomble", label: "Umbanda e Candomblé" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#c4956a] hover:text-[#7bae8d] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comunidade */}
          <div>
            <h3 className="font-serif font-bold text-[#f5ecd7] mb-4">
              Comunidade
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/doacoes", label: "Faça uma Doação" },
                { href: "/rifas", label: "Rifas e Sorteios" },
                { href: "/downloads", label: "Área de Downloads" },
                { href: "/cadastro", label: "Cadastre-se" },
                { href: "/login", label: "Área do Membro" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#c4956a] hover:text-[#7bae8d] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#5c3d1e] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8b5e3c]">
          <p>
            &copy; {new Date().getFullYear()} Casa de Umbanda Aruanda. Todos os
            direitos reservados.
          </p>
          <p>
            Fundada em{" "}
            <span className="text-[#c4956a]">15 de novembro de 1908</span> por
            Zélio Fernandino de Morais
          </p>
        </div>
      </div>
    </footer>
  );
}
