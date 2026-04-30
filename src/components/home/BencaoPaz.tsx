"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, Headphones } from "lucide-react";

interface BencaoPazProps {
  audioUrl: string | null;
  titulo: string;
  data: string;
}

export default function BencaoPaz({ audioUrl, titulo, data }: BencaoPazProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  function togglePlay() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

  if (!audioUrl) {
    return (
      <section className="py-12 bg-gradient-to-br from-[#f5ecd7] to-[#e8dcc8]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-8 text-center">
            <div className="w-16 h-16 bg-[#4a7c59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-[#4a7c59]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
              Benção de Paz
            </h2>
            <p className="text-[#8b5e3c]">
              Em breve uma nova mensagem inspiradora estará disponível.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-[#f5ecd7] to-[#e8dcc8]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#fdfaf5] rounded-2xl border border-[#8b5e3c]/10 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2c1810]">
                Benção de Paz
              </h2>
              <p className="text-sm text-[#8b5e3c]">
                {titulo} · {data}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-14 h-14 bg-[#4a7c59] hover:bg-[#2d5c3a] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>

            <div className="flex-1">
              <div className="h-2 bg-[#8b5e3c]/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#4a7c59] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#8b5e3c]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            className="hidden"
          />
        </div>
      </div>
    </section>
  );
}
