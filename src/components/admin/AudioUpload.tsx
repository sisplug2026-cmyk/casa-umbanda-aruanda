"use client";

import { useState, useRef } from "react";
import { Upload, Music, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AudioUploadProps {
  onUpload: (url: string) => void;
}

export default function AudioUpload({ onUpload }: AudioUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `audios/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("downloads")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        alert("Erro ao fazer upload do áudio: " + uploadError.message);
        setFileName(null);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("downloads")
        .getPublicUrl(filePath);

      onUpload(publicUrl);
    } catch (error: any) {
      console.error("Erro:", error);
      alert("Erro ao fazer upload: " + error.message);
      setFileName(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {fileName ? (
        <div className="flex items-center gap-2 p-3 bg-[#4a7c59]/10 rounded-xl border border-[#4a7c59]/20">
          <Music className="w-5 h-5 text-[#4a7c59]" />
          <span className="flex-1 text-sm text-[#2c1810] truncate">{fileName}</span>
          <button
            type="button"
            onClick={() => {
              setFileName(null);
              onUpload("");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-20 border-2 border-dashed border-[#8b5e3c]/30 rounded-xl flex flex-col items-center justify-center gap-2 text-[#8b5e3c] hover:border-[#4a7c59] hover:text-[#4a7c59] transition-colors"
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Enviando áudio...</span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6" />
              <span className="text-sm">Clique para enviar áudio</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
