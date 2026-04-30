import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin — Editar Post" };

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    redirect("/admin/blog");
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const supabase = createServiceClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as "draft" | "published";

    if (!title || !content) {
      return;
    }

    await supabase
      .from("posts")
      .update({
        title,
        content,
        excerpt,
        category,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    redirect("/admin/blog");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810]">
          Editar Post
        </h1>
        <Link
          href="/admin/blog"
          className="text-sm text-[#8b5e3c] hover:text-[#4a7c59] transition-colors"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Título
            </label>
            <input
              type="text"
              name="title"
              defaultValue={post.title}
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
                defaultValue={post.category || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={post.status}
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Resumo
            </label>
            <textarea
              name="excerpt"
              rows={2}
              defaultValue={post.excerpt || ""}
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
              defaultValue={post.content}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition resize-none font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}
