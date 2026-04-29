import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Novo Download" };

export default function NovoDownloadPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-[#2c1810] mb-6">
        Novo Arquivo para Download
      </h1>
      <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6">
        <form className="space-y-5 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Título
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Descrição
            </label>
            <textarea
              name="description"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Categoria
              </label>
              <input
                type="text"
                name="category"
                placeholder="ex: Orações, Músicas..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] placeholder-[#8b5e3c]/50 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c1810] mb-1">
                Tipo
              </label>
              <select
                name="file_type"
                className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
              >
                <option value="pdf">PDF</option>
                <option value="audio">Áudio</option>
                <option value="video">Vídeo</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c1810] mb-1">
              Arquivo
            </label>
            <input
              type="file"
              name="file"
              accept=".pdf,.mp3,.mp4,.wav,.ogg,.m4a"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#4a7c59]/15 file:text-[#4a7c59] file:font-medium file:text-sm"
            />
            <p className="text-xs text-[#8b5e3c] mt-1">
              Aceita PDF, MP3, MP4. Máximo 500 MB.
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Fazer upload
          </button>
        </form>
      </div>
    </div>
  );
}
