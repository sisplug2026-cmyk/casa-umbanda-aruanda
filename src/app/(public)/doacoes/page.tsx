import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça uma Doação",
  description:
    "Contribua com a Casa de Umbanda Aruanda. Doação única ou recorrente via PIX ou cartão.",
};

export default function DoacoesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Contribua
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Doações
        </h1>
        <p className="text-[#6b4c3b] text-lg max-w-md mx-auto">
          Sua contribuição ajuda a manter a casa, os trabalhos espirituais e a
          comunidade ativa. Toda ajuda é bem-vinda e recebida com gratidão.
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-8">
        <form className="space-y-6">
          {/* Tipo */}
          <div>
            <label className="block text-sm font-semibold text-[#2c1810] mb-3">
              Tipo de doação
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["unica", "recorrente"].map((tipo) => (
                <label
                  key={tipo}
                  className="flex items-center gap-3 p-4 border-2 border-[#8b5e3c]/20 rounded-xl cursor-pointer hover:border-[#4a7c59] transition-colors"
                >
                  <input
                    type="radio"
                    name="type"
                    value={tipo}
                    className="accent-[#4a7c59]"
                    defaultChecked={tipo === "unica"}
                  />
                  <span className="font-medium text-[#2c1810] capitalize">
                    {tipo === "unica" ? "Única" : "Mensal"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Valor */}
          <div>
            <label className="block text-sm font-semibold text-[#2c1810] mb-3">
              Valor
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[10, 20, 50, 100].map((val) => (
                <button
                  key={val}
                  type="button"
                  className="py-2.5 border-2 border-[#8b5e3c]/20 rounded-xl text-sm font-semibold text-[#5c3d1e] hover:border-[#4a7c59] hover:text-[#4a7c59] transition-colors"
                >
                  R$ {val}
                </button>
              ))}
            </div>
            <input
              type="number"
              name="amount"
              min="1"
              step="0.01"
              placeholder="Outro valor (R$)"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] placeholder-[#8b5e3c]/50 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>

          {/* Método */}
          <div>
            <label className="block text-sm font-semibold text-[#2c1810] mb-3">
              Forma de pagamento
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "pix", label: "PIX", emoji: "📱" },
                { value: "credit_card", label: "Cartão", emoji: "💳" },
              ].map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-3 p-4 border-2 border-[#8b5e3c]/20 rounded-xl cursor-pointer hover:border-[#4a7c59] transition-colors"
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.value}
                    className="accent-[#4a7c59]"
                  />
                  <span className="font-medium text-[#2c1810]">
                    {method.emoji} {method.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md text-lg"
          >
            Continuar para pagamento
          </button>
        </form>
      </div>
    </div>
  );
}
