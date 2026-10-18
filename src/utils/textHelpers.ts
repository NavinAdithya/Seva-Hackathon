import { Language, EmergencyPhrase, ResponderQuestion, QuestionOption, CategoryConfig } from '../types';

export function getLocalizedText<T extends Record<string, any>>(
  item: T,
  fieldPrefix: string,
  language: Language
): string {
  const key = `${fieldPrefix}_${language}` as keyof T;
  const fallbackKey = `${fieldPrefix}_en` as keyof T;
  return (item[key] as string) || (item[fallbackKey] as string) || '';
}

export function getPhraseText(phrase: EmergencyPhrase, language: Language): string {
  return getLocalizedText(phrase, 'text', language);
}

export function getQuestionText(question: ResponderQuestion, language: Language): string {
  return getLocalizedText(question, 'question', language);
}

export function getOptionText(option: QuestionOption, language: Language): string {
  return getLocalizedText(option, 'option', language);
}

export function getCategoryLabel(category: CategoryConfig, language: Language): string {
  return getLocalizedText(category, 'label', language);
}

export function generateConversationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
