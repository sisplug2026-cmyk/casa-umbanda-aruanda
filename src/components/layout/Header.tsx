"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/fundacao", label: "Fundação" },
  { href: "/orixas", label: "Orixás" },
  { href: "/misterios", label: "Mistérios" },
  { href: "/blog", label: "Blog" },
  { href: "/doacoes", label: "Doações" },
  { href: "/rifas", label: "Rifas" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fdfaf5]/95 backdrop-blur-sm border-b border-[#8b5e3c]/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#2d5c3a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-lg font-bold font-serif">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[#2c1810] font-serif font-bold text-lg leading-tight">
                Casa de Umbanda
              </p>
              <p className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase">
                Aruanda
              </p>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#5c3d1e] hover:text-[#4a7c59] hover:bg-[#4a7c59]/10 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] rounded-lg hover:opacity-90 transition-opacity shadow-sm"
            >
              Área do Membro
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#5c3d1e] hover:bg-[#8b5e3c]/10 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t border-[#8b5e3c]/15 bg-[#fdfaf5] overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#5c3d1e] hover:text-[#4a7c59] hover:bg-[#4a7c59]/10 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-3 py-2 text-sm font-semibold text-center text-white bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] rounded-lg"
          >
            Área do Membro
          </Link>
        </nav>
      </div>
    </header>
  );
}
