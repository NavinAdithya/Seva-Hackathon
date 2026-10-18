import * as Speech from 'expo-speech';
import { Language } from '../types';

const LANGUAGE_MAP: Record<Language, string> = {
  en: 'en-US',
  ta: 'ta-IN',
  hi: 'hi-IN',
};

export async function speakText(text: string, language: Language): Promise<void> {
  try {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      await Speech.stop();
    }
    
    Speech.speak(text, {
      language: LANGUAGE_MAP[language] || 'en-US',
      pitch: 1.0,
      rate: 0.9,
      onError: (error) => {
        console.warn('Speech error:', error);
      },
    });
  } catch (err) {
    console.warn('Error in speakText:', err);
  }
}

export async function stopSpeaking(): Promise<void> {
  try {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      await Speech.stop();
    }
  } catch (err) {
    console.warn('Error in stopSpeaking:', err);
  }
}
