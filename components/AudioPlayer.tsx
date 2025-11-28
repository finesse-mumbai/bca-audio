import React, { useState, useRef, useEffect } from "react";
import { Music, Loader2, Share2, Download, Check, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AudioData } from "../types";

interface AudioPlayerProps {
  data: AudioData;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle Share
  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Handle Download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data.audioUrl;
    link.download = `${data.chapterName || "audio"}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Audio Controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(240,92,146,0.15)] rounded-3xl p-8 w-full max-w-lg text-center animate-fadeIn transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(240,92,146,0.25)]">
      
      {/* Header Info */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f05c92] to-[#ff9a9e] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-full p-4 shadow-sm">
                 <Music className="w-12 h-12 text-[#f05c92]" />
            </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-800 mt-6 mb-2 tracking-tight">
          {data.chapterName}
        </h2>
        
        <p className="text-gray-500 font-medium">
          {data.companyName}
          {data.companyWebsite && (
            <>
              <span className="mx-2 text-gray-300">•</span>
              <a
                href={data.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f05c92] hover:text-[#d94b7e] transition-colors hover:underline decoration-2 decoration-transparent hover:decoration-[#f05c92]/30 underline-offset-4"
              >
                Visit Website
              </a>
            </>
          )}
        </p>
      </div>

      {/* Custom Player UI */}
      <div className="bg-white/60 rounded-2xl p-6 shadow-inner mb-8 border border-white/50">
        <audio
          ref={audioRef}
          src={'http://assests.aiftp.next.s3.ap-south-1.amazonaws.com/audio/1764337658969-fk38gelm5q.m4a'}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
        
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#f05c92] hover:accent-[#d94b7e] transition-all"
            style={{
                backgroundImage: `linear-gradient(#f05c92, #f05c92)`,
                backgroundSize: `${(currentTime / duration) * 100}% 100%`,
                backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
            <button 
                onClick={toggleMute}
                className="p-2 text-gray-400 hover:text-[#f05c92] transition-colors rounded-full hover:bg-[#f05c92]/10"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <button
                onClick={togglePlay}
                className="w-16 h-16 flex items-center justify-center bg-[#f05c92] text-white rounded-full shadow-lg hover:bg-[#d94b7e] hover:scale-105 active:scale-95 transition-all duration-300"
            >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>

            {/* Spacer for centering play button */}
             <div className="w-9"></div> 
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 hover:text-[#f05c92] transition-all duration-200 group"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />}
          {copied ? "Copied" : "Share"}
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f05c92]/10 text-[#f05c92] font-semibold hover:bg-[#f05c92] hover:text-white transition-all duration-200 group border border-[#f05c92]/20"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          Download
        </button>
      </div>
    </div>
  );
};
