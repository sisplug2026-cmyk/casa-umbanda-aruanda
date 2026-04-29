import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Criar Conta" };

export default function CadastroPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-[#fdfaf5] rounded-2xl p-8 shadow-lg border border-[#8b5e3c]/10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#2d5c3a] flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold font-serif">A</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2c1810]">
            Criar Conta
          </h1>
          <p className="text-[#6b4c3b] text-sm mt-1">
            Junte-se à nossa comunidade espiritual
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Nome completo
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Seu nome"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] placeholder-[#8b5e3c]/50 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] placeholder-[#8b5e3c]/50 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              WhatsApp (opcional)
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] placeholder-[#8b5e3c]/50 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] placeholder-[#8b5e3c]/50 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-center text-sm text-[#6b4c3b] mt-6">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="text-[#4a7c59] font-semibold hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
