export interface AudioData {
  id: string;                  // NEW FIELD
  chapterName: string;
  companyName: string;
  companyWebsite?: string;
  audioUrl: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  audio?: AudioData;
}
