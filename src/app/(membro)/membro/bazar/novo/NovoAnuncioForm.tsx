"use client";

import { useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NovoAnuncioForm() {
  const [imagens, setImagens] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (imagens.length > 0) {
      formData.append("imagens", JSON.stringify(imagens));
    }

    try {
      const res = await fetch("/api/bazar/criar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Erro ao criar anúncio");
        setLoading(false);
        return;
      }

      window.location.href = "/bazar";
    } catch (err: any) {
      setError(err.message || "Erro ao criar anúncio");
      setLoading(false);
    }
  }

  function handleImageUpload(url: string) {
    setImagens((prev) => [...prev, url]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#2c1810] mb-1">
          Título do produto *
        </label>
        <input
          type="text"
          name="titulo"
          required
          placeholder="Ex: Livro de Orações Umbandistas"
          className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2c1810] mb-1">
            Preço (R$) *
          </label>
          <input
            type="number"
            name="preco"
            min={0}
            step={0.01}
            required
            placeholder="0,00"
            className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2c1810] mb-1">
            Condição *
          </label>
          <select
            name="condicao"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
          >
            <option value="novo">Novo</option>
            <option value="usado">Usado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2c1810] mb-1">
            Categoria
          </label>
          <input
            type="text"
            name="categoria"
            placeholder="Ex: Livros, Roupas, Decoração..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2c1810] mb-1">
            Localização
          </label>
          <input
            type="text"
            name="localizacao"
            placeholder="Ex: São Paulo - SP"
            className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2c1810] mb-1">
          Telefone para contato *
        </label>
        <input
          type="tel"
          name="telefone"
          required
          placeholder="(11) 99999-9999"
          className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2c1810] mb-1">
          Descrição
        </label>
        <textarea
          name="descricao"
          rows={4}
          placeholder="Descreva o produto, estado de conservação, etc."
          className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2c1810] mb-1">
          Fotos do produto
        </label>
        <ImageUpload onUpload={handleImageUpload} />
        <input type="hidden" name="imagens" value={JSON.stringify(imagens)} />
        
        {imagens.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {imagens.map((img, i) => (
              <div key={i} className="aspect-square rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Criando anúncio..." : "Publicar anúncio"}
      </button>
    </form>
  );
}
