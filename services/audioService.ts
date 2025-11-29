import { AUDIO_LIST } from "../data/audioList";
import { ApiResponse } from "../types";

export const fetchAudioData = async (uniqueId: string): Promise<ApiResponse> => {
  // local find
  const audio = AUDIO_LIST.find(item => item.id === uniqueId);

  if (!audio) {
    return {
      success: false,
      message: "Audio not found"
    };
  }

  return {
    success: true,
    audio
  };
};
