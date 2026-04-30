import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { excluirPost } from "./actions";

export const metadata: Metadata = { title: "Admin — Blog" };

export default async function AdminBlogPage() {
  const supabase = createServiceClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, status, category, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810]">Blog</h1>
        <Link
          href="/admin/blog/novo"
          className="px-4 py-2 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          + Novo post
        </Link>
      </div>

      <div className="space-y-2">
        {!posts || posts.length === 0 ? (
          <p className="text-[#8b5e3c] text-sm py-8 text-center">
            Nenhum post criado ainda.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-[#2c1810] text-sm truncate">
                  {post.title}
                </p>
                <p className="text-xs text-[#8b5e3c] mt-0.5">
                  {post.category && <span className="mr-2">{post.category}</span>}
                  {post.published_at
                    ? formatDate(post.published_at)
                    : formatDate(post.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    post.status === "published"
                      ? "bg-[#4a7c59]/15 text-[#4a7c59]"
                      : "bg-[#d97706]/15 text-[#d97706]"
                  }`}
                >
                  {post.status === "published" ? "Publicado" : "Rascunho"}
                </span>
                <Link
                  href={`/admin/blog/${post.id}/editar`}
                  className="text-xs text-[#8b5e3c] hover:text-[#4a7c59] font-medium transition-colors"
                >
                  Editar
                </Link>
                <form action={excluirPost} className="inline">
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    type="submit"
                    className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
