import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import DownloadImageButton from "@/components/blog/DownloadImageButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, cover_url")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: post.cover_url ? { images: [post.cover_url] } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*, profiles(name)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(name)")
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-[#8b5e3c] mb-8">
        <Link href="/blog" className="hover:text-[#4a7c59] transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-[#2c1810] font-medium line-clamp-1">
          {post.title}
        </span>
      </nav>

      {post.category && (
        <p className="text-[#4a7c59] font-semibold text-sm tracking-widest uppercase mb-3">
          {post.category}
        </p>
      )}

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2c1810] mb-4">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-[#8b5e3c] mb-8">
        {post.published_at && <span>{formatDate(post.published_at)}</span>}
      </div>

      {post.cover_url && (
        <div className="mb-8">
          <div
            className="w-full h-64 sm:h-80 rounded-2xl bg-cover bg-center mb-4"
            style={{ backgroundImage: `url(${post.cover_url})` }}
          />
          <DownloadImageButton 
            imageUrl={post.cover_url} 
            fileName={`${post.slug}-capa.jpg`}
          />
        </div>
      )}

      <div
        className="prose prose-stone max-w-none text-[#2c1810] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Comentários */}
      <section className="mt-16 border-t border-[#8b5e3c]/10 pt-10">
        <h2 className="font-serif text-2xl font-bold text-[#2c1810] mb-6">
          Comentários ({comments?.length ?? 0})
        </h2>
        {comments && comments.length > 0 ? (
          <div className="space-y-4 mb-8">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#fdfaf5] rounded-xl p-4 border border-[#8b5e3c]/10"
              >
                <p className="font-semibold text-[#2c1810] text-sm mb-1">
                  {(comment.profiles as { name: string } | null)?.name ?? "Membro"}
                </p>
                <p className="text-[#5c3d1e] text-sm leading-relaxed">
                  {comment.content}
                </p>
                <p className="text-xs text-[#8b5e3c] mt-2">
                  {formatDate(comment.created_at)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#8b5e3c] text-sm mb-8">
            Nenhum comentário ainda. Seja o primeiro!
          </p>
        )}

        <div className="bg-[#fdfaf5] rounded-xl p-4 border border-[#8b5e3c]/10">
          <p className="text-[#6b4c3b] text-sm">
            <Link href="/login" className="text-[#4a7c59] font-semibold hover:underline">
              Faça login
            </Link>{" "}
            para deixar um comentário.
          </p>
        </div>
      </section>
    </article>
  );
}
