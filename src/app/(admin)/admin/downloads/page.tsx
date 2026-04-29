import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin — Downloads" };

export default async function AdminDownloadsPage() {
  const supabase = await createClient();
  const { data: downloads } = await supabase
    .from("downloads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810]">Downloads</h1>
        <Link
          href="/admin/downloads/novo"
          className="px-4 py-2 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          + Novo arquivo
        </Link>
      </div>

      <div className="space-y-2">
        {!downloads || downloads.length === 0 ? (
          <p className="text-[#8b5e3c] text-sm py-8 text-center">
            Nenhum arquivo adicionado ainda.
          </p>
        ) : (
          downloads.map((file) => (
            <div
              key={file.id}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl flex-shrink-0">
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
                  <p className="text-xs text-[#8b5e3c] truncate">
                    {file.category ?? "Sem categoria"} · {file.file_type?.toUpperCase()}
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#8b5e3c] flex-shrink-0">
                {file.size_bytes
                  ? `${(file.size_bytes / 1024 / 1024).toFixed(1)} MB`
                  : "—"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
