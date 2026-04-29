import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/admin/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user!.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/membro/perfil");

  return (
    <>
      <Header />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Admin */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="bg-[#2c1810] rounded-2xl p-3 space-y-1">
              <p className="px-3 py-1.5 text-[#8b5e3c] text-xs font-semibold uppercase tracking-wider">
                Administração
              </p>
              {[
                { href: "/admin/dashboard", label: "Dashboard" },
                { href: "/admin/blog", label: "Blog" },
                { href: "/admin/downloads", label: "Downloads" },
                { href: "/admin/rifas", label: "Rifas" },
                { href: "/admin/doacoes", label: "Doações" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#e8d9bf] hover:bg-[#4a7c59]/20 hover:text-[#7bae8d] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>

          {/* Conteúdo */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
