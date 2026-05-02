import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin — Páginas" };

export default async function AdminPaginasPage() {
  const supabase = createServiceClient();
  const { data: paginas } = await supabase
    .from("paginas_conteudo")
    .select("*")
    .order("slug");

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Editar Páginas
      </h1>

      <div className="grid gap-4">
        {!paginas || paginas.length === 0 ? (
          <p className="text-[#8b5e3c] text-sm py-8 text-center">
            Nenhuma página encontrada.
          </p>
        ) : (
          paginas.map((pagina) => (
            <Link
              key={pagina.id}
              href={`/admin/paginas/${pagina.id}/editar`}
              className="bg-[#fdfaf5] rounded-xl border border-[#8b5e3c]/10 p-5 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#2c1810] mb-1">
                    {pagina.titulo}
                  </h2>
                  <p className="text-sm text-[#8b5e3c]">
                    Slug: /{pagina.slug}
                  </p>
                  {pagina.meta_descricao && (
                    <p className="text-xs text-[#8b5e3c]/70 mt-1 line-clamp-1">
                      {pagina.meta_descricao}
                    </p>
                  )}
                </div>
                <span className="px-4 py-2 bg-[#4a7c59] text-white text-sm font-medium rounded-lg">
                  Editar
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
