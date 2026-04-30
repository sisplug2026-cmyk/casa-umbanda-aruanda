import type { Metadata } from "next";
import NovoDownloadForm from "./NovoDownloadForm";

export const metadata: Metadata = { title: "Admin — Novo Download" };

export default function NovoDownloadPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Novo Arquivo para Download
      </h1>
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <NovoDownloadForm />
      </div>
    </div>
  );
}
