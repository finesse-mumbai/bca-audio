import { AudioData, ApiResponse } from '../types';

// Mock data to show when no API is available (for demonstration purposes)
const MOCK_AUDIO_DATA: AudioData = {
  chapterName: "Welcome to AudioFlow",
  companyName: "AudioFlow Demo",
  companyWebsite: "https://example.com",
  // Using a sample MP3 for demonstration
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
};

export const fetchAudioData = async (uniqueId: string): Promise<ApiResponse> => {
  try {
    // In a real scenario, this fetches from the backend
    const res = await fetch(`/api/formsAPI/getAudio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uniqueId }),
    });

    // Check if the endpoint actually exists (it won't in this pure frontend demo)
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.warn("API unavailable, falling back to mock data for demonstration.");
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        audio: MOCK_AUDIO_DATA
      };
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.warn("Fetch error, falling back to mock data:", error);
    // Fallback for demo so the UI is visible
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        success: true,
        audio: MOCK_AUDIO_DATA
    };
  }
};
