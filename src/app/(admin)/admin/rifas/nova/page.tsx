import type { Metadata } from "next";
import { criarRifa } from "./actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Admin — Nova Rifa" };

export default function NovaRifaPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const result = await criarRifa(formData);
    if (result.success) {
      redirect("/admin/rifas");
    }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Nova Rifa
      </h1>
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <form action={handleSubmit} className="space-y-5 max-w-lg">
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

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              URL da foto do prêmio (Supabase Storage)
            </label>
            <input
              type="url"
              name="prize_image"
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
            <p className="text-xs text-[#8b5e3c] mt-1">
              Faça upload da imagem no Supabase Storage e cole a URL aqui.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Tipo de numeração
            </label>
            <select
              name="tipo_numeracao"
              defaultValue="numerica"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            >
              <option value="numerica">Numérica (001, 002, 003...)</option>
              <option value="nomes_masculinos">Nomes Masculinos (Arthur, Bernardo, Carlos...)</option>
              <option value="nomes_femininos">Nomes Femininos (Ana, Beatriz, Carolina...)</option>
              <option value="times_brasil">Times de Futebol do Brasil (Flamengo, Palmeiras, Santos...)</option>
              <option value="times_europa">Times de Futebol da Europa (Real Madrid, Barcelona, Manchester...)</option>
            </select>
            <p className="text-xs text-[#8b5e3c] mt-1">
              Escolha como os números da rifa serão exibidos.
            </p>
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
