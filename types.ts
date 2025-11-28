export interface AudioData {
  chapterName: string;
  companyName: string;
  companyWebsite?: string;
  audioUrl: string;
}

export interface ApiResponse {
  success: boolean;
  audio?: AudioData;
  message?: string;
}


