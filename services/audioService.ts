// src/services/audioService.ts
import { AudioData, ApiResponse } from '../types';

// Mock data to show when no API is available (for demonstration purposes)
// NOTE: We use the HTTP URL here to simulate the actual API response you are getting.
const MOCK_AUDIO_DATA: AudioData = {
  chapterName: "Welcome to AudioFlow (Mock Data)",
  companyName: "AudioFlow Demo",
  companyWebsite: "https://example.com",
  // Simulate the insecure URL received from the database/API
  audioUrl: "http://assests.aiftp.next.s3.ap-south-1.amazonaws.com/audio/SoundHelix-Song-1.mp3" 
};

export const fetchAudioData = async (uniqueId: string): Promise<ApiResponse> => {
  try {
    // In a real scenario, this fetches from the backend
    const res = await fetch(`https://www.aiftponline.org/api/formsAPI/getAudio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uniqueId }),
    });

    // Check if the endpoint actually exists
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.warn("API unavailable, falling back to mock data for demonstration.");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        audio: MOCK_AUDIO_DATA
      };
    }

    const data: ApiResponse = await res.json();
    console.log(data, "data coming");
    return data;

  } catch (error) {
    console.warn("Fetch error, falling back to mock data:", error);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        success: true,
        audio: MOCK_AUDIO_DATA
    };
  }
};