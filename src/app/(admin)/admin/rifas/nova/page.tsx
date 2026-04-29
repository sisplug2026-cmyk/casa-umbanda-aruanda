import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Nova Rifa" };

export default function NovaRifaPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Nova Rifa
      </h1>
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <form className="space-y-5 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Título da rifa
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Descrição do prêmio
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Número inicial
              </label>
              <input
                type="number"
                name="numero_inicio"
                defaultValue={1}
                min={1}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Número final
              </label>
              <input
                type="number"
                name="numero_fim"
                defaultValue={100}
                min={2}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Valor (R$)
              </label>
              <input
                type="number"
                name="price_per_num"
                defaultValue={10}
                min={1}
                step={0.01}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-[#8b5e3c] mb-3">
              Ao criar a rifa, todos os números serão gerados automaticamente no banco.
            </p>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Criar rifa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
