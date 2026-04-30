"use client";

import { useState } from "react";
import { criarRifa } from "./actions";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NovaRifaForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    if (imageUrl) {
      formData.append("prize_image", imageUrl);
    }

    const result = await criarRifa(formData);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Redirecionar via window.location para evitar problemas com Server Action
    window.location.href = "/admin/rifas";
  }

  return (
    <form action={handleSubmit} className="space-y-5 max-w-lg">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#2c1810] mb-1">
          Título da rifa *
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
          Foto do prêmio
        </label>
        <ImageUpload onUpload={setImageUrl} />
        <input type="hidden" name="prize_image" value={imageUrl} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2c1810] mb-1">
          Tipo de numeração *
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
            Número inicial *
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
            Número final *
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
            Valor (R$) *
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
          disabled={loading}
          className="px-6 py-2.5 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar rifa"}
        </button>
      </div>
    </form>
  );
}
