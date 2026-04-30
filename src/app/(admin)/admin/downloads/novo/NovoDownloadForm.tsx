"use client";

import { useState } from "react";
import { criarDownload } from "./actions";
import AudioUpload from "@/components/admin/AudioUpload";

export default function NovoDownloadForm() {
  const [audioUrl, setAudioUrl] = useState("");
  const [fileType, setFileType] = useState("pdf");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (audioUrl) {
      formData.set("file_url", audioUrl);
    }

    const result = await criarDownload(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    window.location.href = "/admin/downloads";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#2c1810] mb-1">
          Título *
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
            Categoria *
          </label>
          <select
            name="category"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
          >
            <option value="">Selecione...</option>
            <option value="bencao-de-paz">Benção de Paz</option>
            <option value="oracoes">Orações</option>
            <option value="musicas">Músicas</option>
            <option value="estudos">Estudos</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2c1810] mb-1">
            Tipo *
          </label>
          <select
            name="file_type"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
          >
            <option value="pdf">PDF</option>
            <option value="audio">Áudio</option>
            <option value="video">Vídeo</option>
            <option value="other">Outro</option>
          </select>
        </div>
      </div>

      {fileType === "audio" ? (
        <div>
          <label className="block text-sm font-medium text-[#2c1810] mb-1">
            Arquivo de áudio *
          </label>
          <AudioUpload onUpload={setAudioUrl} />
          <input type="hidden" name="file_url" value={audioUrl} />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-[#2c1810] mb-1">
            URL do arquivo (Supabase Storage) *
          </label>
          <input
            type="url"
            name="file_url"
            placeholder="https://..."
            required
            className="w-full px-4 py-2.5 rounded-xl border border-[#8b5e3c]/20 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 transition"
          />
          <p className="text-xs text-[#8b5e3c] mt-1">
            Faça upload do arquivo no Supabase Storage e cole a URL aqui.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar download"}
      </button>
    </form>
  );
}
