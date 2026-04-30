"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview local
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `rifas/${fileName}`;

      // Upload para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("rifas")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        alert("Erro ao fazer upload da imagem");
        return;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from("rifas")
        .getPublicUrl(filePath);

      onUpload(publicUrl);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#8b5e3c]/20">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onUpload("");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition"
          >
            Remover
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 border-2 border-dashed border-[#8b5e3c]/30 rounded-xl flex flex-col items-center justify-center gap-2 text-[#8b5e3c] hover:border-[#4a7c59] hover:text-[#4a7c59] transition-colors"
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Enviando...</span>
            </>
          ) : (
            <>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Clique para enviar foto do prêmio</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
