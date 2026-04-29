import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Meu Perfil" };

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Meu Perfil
      </h1>
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#2d5c3a] flex items-center justify-center text-white text-2xl font-serif font-bold">
            {profile?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="font-serif font-bold text-xl text-[#2c1810]">
              {profile?.name}
            </p>
            <p className="text-[#8b5e3c] text-sm">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#4a7c59]/15 text-[#4a7c59] text-xs font-semibold rounded-full capitalize">
              {profile?.role}
            </span>
          </div>
        </div>

        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Nome
            </label>
            <input
              type="text"
              defaultValue={profile?.name ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              WhatsApp
            </label>
            <input
              type="tel"
              defaultValue={profile?.phone ?? ""}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] placeholder-[#8b5e3c]/50 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
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
