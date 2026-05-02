"use client";

import { Download } from "lucide-react";

interface DownloadImageButtonProps {
  imageUrl: string;
  fileName?: string;
}

export default function DownloadImageButton({ imageUrl, fileName }: DownloadImageButtonProps) {
  async function handleDownload() {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "imagem.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar imagem:", error);
      alert("Erro ao baixar imagem");
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#4a7c59] hover:bg-[#2d5c3a] text-white text-sm font-medium rounded-lg transition-colors"
    >
      <Download className="w-4 h-4" />
      Baixar imagem
    </button>
  );
}
