import type { Metadata } from "next";
import NovaRifaForm from "./NovaRifaForm";

export const metadata: Metadata = { title: "Admin — Nova Rifa" };

export default function NovaRifaPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Nova Rifa
      </h1>
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <NovaRifaForm />
      </div>
    </div>
  );
}
