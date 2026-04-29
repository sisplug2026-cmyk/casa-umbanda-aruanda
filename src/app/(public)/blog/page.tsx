import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos, mensagens e ensinamentos da Casa de Umbanda Aruanda.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_url, category, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(20);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14">
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          Ensinamentos
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2c1810] mb-4">
          Blog
        </h1>
        <p className="text-[#6b4c3b] text-lg">
          Artigos e reflexões espirituais da nossa comunidade
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#4a7c59] to-[#8b5e3c] rounded mx-auto" />
      </header>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-20 text-[#8b5e3c]">
          <p className="font-serif text-2xl mb-2">Nenhum post ainda</p>
          <p className="text-sm">Em breve novos conteúdos serão publicados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {post.cover_url ? (
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.cover_url})` }}
                />
              ) : (
                <div className="h-48 bg-gradient-to-br from-[#4a7c59]/20 to-[#8b5e3c]/20 flex items-center justify-center">
                  <span className="text-4xl opacity-40">🌿</span>
                </div>
              )}
              <div className="p-5">
                {post.category && (
                  <span className="text-xs font-semibold text-[#4a7c59] uppercase tracking-wide">
                    {post.category}
                  </span>
                )}
                <h2 className="font-serif text-lg font-bold text-[#2c1810] mt-1 mb-2 group-hover:text-[#4a7c59] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[#6b4c3b] text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                {post.published_at && (
                  <p className="text-xs text-[#8b5e3c] mt-3">
                    {formatDate(post.published_at)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
