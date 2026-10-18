import { getDatabase } from './schema';
import { EmergencyPhrase, ResponderQuestion, QuestionOption, EmergencyCategory, EmergencyCard, Language } from '../types';

export async function getPhrasesByCategory(category: EmergencyCategory): Promise<EmergencyPhrase[]> {
  const db = await getDatabase();
  return db.getAllAsync<EmergencyPhrase>(
    'SELECT * FROM emergency_phrases WHERE category = ? ORDER BY sort_order',
    category
  );
}

export async function getPhraseById(id: number): Promise<EmergencyPhrase | null> {
  const db = await getDatabase();
  return db.getFirstAsync<EmergencyPhrase>(
    'SELECT * FROM emergency_phrases WHERE id = ?',
    id
  );
}

export async function getQuestionsForPhrase(phraseId: number): Promise<ResponderQuestion[]> {
  const db = await getDatabase();
  return db.getAllAsync<ResponderQuestion>(
    'SELECT * FROM responder_questions WHERE phrase_id = ? ORDER BY sort_order',
    phraseId
  );
}

export async function getOptionsForQuestion(questionId: number): Promise<QuestionOption[]> {
  const db = await getDatabase();
  return db.getAllAsync<QuestionOption>(
    'SELECT * FROM question_options WHERE question_id = ? ORDER BY sort_order',
    questionId
  );
}

export async function saveEmergencyCard(card: EmergencyCard): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO emergency_card (id, name, age, blood_group, allergies, medications, conditions, language, communication_preferences, emergency_contacts, updated_at)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    card.name,
    card.age ?? null,
    card.bloodGroup ?? '',
    card.allergies ?? '',
    card.medications ?? '',
    card.conditions ?? '',
    card.language,
    JSON.stringify(card.communicationPreference),
    JSON.stringify(card.emergencyContacts),
    Date.now()
  );
}

export async function getEmergencyCard(): Promise<EmergencyCard | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<any>(
    'SELECT * FROM emergency_card WHERE id = 1'
  );
  if (!row || !row.name) return null;
  return {
    name: row.name,
    age: row.age,
    bloodGroup: row.blood_group,
    allergies: row.allergies,
    medications: row.medications,
    conditions: row.conditions,
    language: row.language as Language,
    communicationPreference: JSON.parse(row.communication_preferences || '[]'),
    emergencyContacts: JSON.parse(row.emergency_contacts || '[]'),
  };
}

export async function setPreference(key: string, value: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT OR REPLACE INTO user_preferences (key, value) VALUES (?, ?)',
    key, value
  );
}

export async function getPreference(key: string): Promise<string | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ value: string }>(
    'SELECT value FROM user_preferences WHERE key = ?',
    key
  );
  return row?.value ?? null;
}

export async function getAllPhrases(): Promise<EmergencyPhrase[]> {
  const db = await getDatabase();
  return db.getAllAsync<EmergencyPhrase>(
    'SELECT * FROM emergency_phrases ORDER BY category, sort_order'
  );
}
