import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { atualizarPagina } from "../actions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: pagina } = await supabase
    .from("paginas_conteudo")
    .select("titulo")
    .eq("id", id)
    .single();
  if (!pagina) return {};
  return { title: `Editar: ${pagina.titulo}` };
}

export default async function EditarPaginaPage({ params }: Props) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data: pagina } = await supabase
    .from("paginas_conteudo")
    .select("*")
    .eq("id", id)
    .single();

  if (!pagina) notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810]">
          Editar Página
        </h1>
        <Link
          href="/admin/paginas"
          className="text-sm text-[#8b5e3c] hover:text-[#4a7c59] transition-colors"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <form action={atualizarPagina} className="space-y-5">
          <input type="hidden" name="id" value={pagina.id} />

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Título da página
            </label>
            <input
              type="text"
              name="titulo"
              defaultValue={pagina.titulo}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Slug (URL)
            </label>
            <input
              type="text"
              value={pagina.slug}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/10 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-[#8b5e3c] mt-1">O slug não pode ser alterado.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Meta descrição (SEO)
            </label>
            <input
              type="text"
              name="meta_descricao"
              defaultValue={pagina.meta_descricao || ""}
              placeholder="Descrição que aparece no Google"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              URL da imagem (opcional)
            </label>
            <input
              type="url"
              name="imagem_url"
              defaultValue={pagina.imagem_url || ""}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Conteúdo (suporta Markdown)
            </label>
            <textarea
              name="conteudo"
              rows={20}
              defaultValue={pagina.conteudo}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition resize-none font-mono text-sm"
            />
            <p className="text-xs text-[#8b5e3c] mt-1">
              Use Markdown para formatar o texto. Ex: **negrito**, *itálico*, ## Título
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Salvar alterações
            </button>
            <Link
              href={`/${pagina.slug}`}
              target="_blank"
              className="px-6 py-2.5 border border-[#8b5e3c]/20 text-[#8b5e3c] font-semibold rounded-xl hover:bg-[#8b5e3c]/5 transition-colors"
            >
              Ver página
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
