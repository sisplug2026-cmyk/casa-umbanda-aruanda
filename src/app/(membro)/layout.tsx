import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default async function MembroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/membro/perfil");

  return (
    <>
      <Header />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-56 flex-shrink-0">
            <nav className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-3 space-y-1">
              {[
                { href: "/membro/perfil", label: "Meu Perfil" },
                { href: "/membro/downloads", label: "Downloads" },
                { href: "/membro/historico-doacoes", label: "Doações" },
                { href: "/membro/historico-rifas", label: "Minhas Rifas" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#5c3d1e] hover:bg-[#4a7c59]/10 hover:text-[#4a7c59] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Conteúdo */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
