export type Language = 'en' | 'ta' | 'hi';

export type AssistanceMode = 'vision' | 'hearing' | 'speech';

export type EmergencyCategory = 
  | 'medical'
  | 'safety' 
  | 'fire'
  | 'natural_disaster'
  | 'accident'
  | 'general';

export interface EmergencyPhrase {
  id: number;
  category: EmergencyCategory;
  subcategory: string;
  text_en: string;
  text_ta: string;
  text_hi: string;
  icon: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  sort_order: number;
}

export interface ResponderQuestion {
  id: number;
  phrase_id: number;
  question_en: string;
  question_ta: string;
  question_hi: string;
  sort_order: number;
}

export interface QuestionOption {
  id: number;
  question_id: number;
  option_en: string;
  option_ta: string;
  option_hi: string;
  icon?: string;
  sort_order: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface EmergencyCard {
  name: string;
  age?: number;
  bloodGroup?: string;
  allergies?: string;
  medications?: string;
  conditions?: string;
  emergencyContacts: EmergencyContact[];
  language: Language;
  communicationPreference: AssistanceMode[];
}

export interface ConversationEntry {
  id: string;
  timestamp: number;
  role: 'user' | 'responder';
  phraseId?: number;
  questionId?: number;
  optionId?: number;
  text: string;
  language: Language;
}

export interface CategoryConfig {
  id: EmergencyCategory;
  label_en: string;
  label_ta: string;
  label_hi: string;
  icon: string;
  color: string;
  bgColor: string;
}
