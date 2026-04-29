import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Novo Post" };

export default function NovoBlogPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Novo Post
      </h1>
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Título
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Categoria
              </label>
              <input
                type="text"
                name="category"
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Status
              </label>
              <select
                name="status"
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Resumo (excerpt)
            </label>
            <textarea
              name="excerpt"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Conteúdo
            </label>
            <textarea
              name="content"
              rows={12}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition resize-y font-mono text-sm"
              placeholder="Conteúdo em HTML ou markdown..."
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Salvar post
          </button>
        </form>
      </div>
    </div>
  );
}
