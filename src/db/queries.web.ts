import {
  EmergencyPhrase,
  ResponderQuestion,
  QuestionOption,
  EmergencyCategory,
  EmergencyCard,
} from '../types';
import {
  MOCK_PHRASES,
  MOCK_QUESTIONS,
  MOCK_OPTIONS,
} from '../constants/mockData';

let memoryEmergencyCard: EmergencyCard | null = {
  name: 'Priya Sharma / பிரியா',
  age: 26,
  bloodGroup: 'O+ Positive',
  allergies: 'Penicillin, Dust',
  medications: 'Asthma Inhaler (Salbutamol)',
  conditions: 'Non-speaking, Asthma',
  language: 'en',
  communicationPreference: ['speech', 'hearing'],
  emergencyContacts: [
    { id: '1', name: 'Primary Contact (Family)', phone: '112', relationship: 'Family / Emergency' },
  ],
};

const memoryPreferences: Record<string, string> = {};

export async function getPhrasesByCategory(category: EmergencyCategory): Promise<EmergencyPhrase[]> {
  return (MOCK_PHRASES as EmergencyPhrase[]).filter((p) => p.category === category);
}

export async function getPhraseById(id: number): Promise<EmergencyPhrase | null> {
  const item = (MOCK_PHRASES as EmergencyPhrase[]).find((p) => p.id === id);
  return item || null;
}

export async function getQuestionsForPhrase(phraseId: number): Promise<ResponderQuestion[]> {
  return (MOCK_QUESTIONS as ResponderQuestion[]).filter((q) => q.phrase_id === phraseId);
}

export async function getOptionsForQuestion(questionId: number): Promise<QuestionOption[]> {
  return (MOCK_OPTIONS as QuestionOption[]).filter((o) => o.question_id === questionId);
}

export async function saveEmergencyCard(card: EmergencyCard): Promise<void> {
  memoryEmergencyCard = card;
}

export async function getEmergencyCard(): Promise<EmergencyCard | null> {
  return memoryEmergencyCard;
}

export async function setPreference(key: string, value: string): Promise<void> {
  memoryPreferences[key] = value;
}

export async function getPreference(key: string): Promise<string | null> {
  return memoryPreferences[key] ?? null;
}

export async function getAllPhrases(): Promise<EmergencyPhrase[]> {
  return MOCK_PHRASES as EmergencyPhrase[];
}
