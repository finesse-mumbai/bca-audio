import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchAudioData } from "./services/audioService";
import { AudioPlayer } from "./components/AudioPlayer";
import { AudioData } from "./types";

export default function App() {
  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const keys = Array.from(searchParams.keys());
  const uniqueId = keys[0]; // ?b08dabfb9c5d4aaa → "b08dabfb9c5d4aaa"

  if (!uniqueId) {
    setError("No audio ID provided in URL!");
    setLoading(false);
    return;
  }

  const loadData = async () => {
    const data = await fetchAudioData(uniqueId);

    if (data.success && data.audio) {
      setAudioData(data.audio);
    } else {
      setError("Audio not found!");
    }

    setLoading(false);
  };

  loadData();
}, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff5f8] to-[#fce8ef] p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(0,0%,90%)_1px,transparent_1px),linear-gradient(90deg,hsl(0,0%,90%)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_90%)]"></div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#f05c92]/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s'}}></div>

      {loading ? (
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#f05c92]/20 blur-xl rounded-full"></div>
            <Loader2 className="animate-spin w-12 h-12 text-[#f05c92] relative z-10" />
          </div>
          <p className="mt-6 text-gray-500 font-medium animate-pulse">Loading audio experience...</p>
        </div>
      ) : error ? (
        <div className="relative z-10 bg-white/80 backdrop-blur-md border border-red-100 shadow-xl rounded-2xl p-8 max-w-md text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load</h3>
            <p className="text-red-500 font-medium">{error}</p>
            <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
            >
                Try Again
            </button>
        </div>
      ) : (
        audioData && <AudioPlayer data={audioData} />
      )}
      
      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
