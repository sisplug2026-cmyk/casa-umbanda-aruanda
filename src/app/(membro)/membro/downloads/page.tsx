import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = { title: "Downloads" };

export default async function DownloadsMembroPage() {
  const supabase = await createClient();

  const { data: downloads } = await supabase
    .from("downloads")
    .select("*")
    .order("created_at", { ascending: false });

  const categorias = [...new Set(downloads?.map((d) => d.category).filter(Boolean))];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Downloads
      </h1>

      {!downloads || downloads.length === 0 ? (
        <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-10 text-center text-[#8b5e3c]">
          <p className="font-serif text-xl mb-2">Nenhum arquivo disponível</p>
          <p className="text-sm">Novos materiais serão publicados em breve.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {(categorias.length > 0 ? categorias : [null]).map((cat) => {
            const items = downloads.filter((d) =>
              cat ? d.category === cat : true
            );
            return (
              <section key={cat ?? "all"}>
                {cat && (
                  <h2 className="font-serif text-lg font-bold text-[#2c1810] mb-3 capitalize">
                    {cat}
                  </h2>
                )}
                <div className="space-y-2">
                  {items.map((file) => (
                    <div
                      key={file.id}
                      className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl flex-shrink-0">
                          {file.file_type === "pdf"
                            ? "📄"
                            : file.file_type === "audio"
                            ? "🎵"
                            : file.file_type === "video"
                            ? "🎬"
                            : "📁"}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-[#2c1810] text-sm truncate">
                            {file.title}
                          </p>
                          {file.description && (
                            <p className="text-xs text-[#8b5e3c] truncate">
                              {file.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/api/downloads/${file.id}`}
                        className="flex-shrink-0 px-4 py-1.5 bg-[#4a7c59] text-white text-xs font-semibold rounded-lg hover:bg-[#2d5c3a] transition-colors"
                      >
                        Baixar
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
