export type WasteCategory = 'trash' | 'plastic' | 'metal';

export interface Classification {
  id: string;
  imageUrl: string;
  category: WasteCategory;
  confidence: number; // 0-100
  timestamp: Date;
}

export interface DailyStats {
  date: Date;
  trash: number;
  plastic: number;
  metal: number;
}

export interface StatCard {
  label: string;
  value: number;
  trend: number; // percentage change
  category: WasteCategory | 'total';
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'system';
  content: string;
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  label: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
