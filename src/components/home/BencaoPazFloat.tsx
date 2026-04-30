"use client";

import { useState, useRef } from "react";
import { Headphones, Play, Pause, X, Volume2 } from "lucide-react";

interface BencaoPazProps {
  audios: Array<{
    id: string;
    title: string;
    file_url: string;
    created_at: string;
  }>;
}

export default function BencaoPazFloat({ audios }: BencaoPazProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<typeof audios[0] | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  function togglePlay(audio?: typeof audios[0]) {
    if (audio && audio.id !== currentAudio?.id) {
      // Trocar de áudio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = audio.file_url;
        audioRef.current.load();
        audioRef.current.play();
        setCurrentAudio(audio);
        setIsPlaying(true);
        setProgress(0);
        setCurrentTime(0);
      }
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  }

  function handleLoadedMetadata() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  function handleEnded() {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <>
      {/* Botão flutuante no canto superior direito */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-14 h-14 bg-[#4a7c59] hover:bg-[#2d5c3a] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        title="Benção de Paz"
      >
        <Headphones className="w-7 h-7" />
        {audios.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d97706] text-white text-xs rounded-full flex items-center justify-center font-bold">
            {audios.length}
          </span>
        )}
      </button>

      {/* Pop-up */}
      {isOpen && (
        <div className="fixed top-20 right-4 z-50 w-80 sm:w-96 bg-[#fdfaf5] rounded-2xl shadow-2xl border border-[#8b5e3c]/20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4a7c59] to-[#2d5c3a] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-white" />
              <h3 className="text-white font-serif font-bold">Benção de Paz</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Player atual */}
          {currentAudio && (
            <div className="p-4 bg-[#f5ecd7] border-b border-[#8b5e3c]/10">
              <p className="text-sm font-semibold text-[#2c1810] mb-2 truncate">
                {currentAudio.title}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePlay()}
                  className="w-10 h-10 bg-[#4a7c59] text-white rounded-full flex items-center justify-center hover:bg-[#2d5c3a] transition"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-[#8b5e3c]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4a7c59] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[#8b5e3c] mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lista de áudios */}
          <div className="max-h-64 overflow-y-auto">
            {audios.length === 0 ? (
              <div className="p-6 text-center text-[#8b5e3c]">
                <Headphones className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma benção disponível no momento.</p>
              </div>
            ) : (
              audios.map((audio) => (
                <button
                  key={audio.id}
                  onClick={() => togglePlay(audio)}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-[#f5ecd7] transition border-b border-[#8b5e3c]/5 text-left ${
                    currentAudio?.id === audio.id ? "bg-[#f5ecd7]" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    currentAudio?.id === audio.id && isPlaying
                      ? "bg-[#4a7c59] text-white"
                      : "bg-[#4a7c59]/10 text-[#4a7c59]"
                  }`}>
                    {currentAudio?.id === audio.id && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2c1810] truncate">
                      {audio.title}
                    </p>
                    <p className="text-xs text-[#8b5e3c]">
                      {new Date(audio.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
    </>
  );
}
