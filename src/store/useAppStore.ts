import { create } from 'zustand';
import { Language, AssistanceMode, ConversationEntry, EmergencyCategory } from '../types';

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Assistance modes (can have multiple active)
  assistanceModes: AssistanceMode[];
  toggleAssistanceMode: (mode: AssistanceMode) => void;
  
  // Settings
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  autoSpeakEnabled: boolean;
  setAutoSpeakEnabled: (enabled: boolean) => void;
  largeTextEnabled: boolean;
  setLargeTextEnabled: (enabled: boolean) => void;
  highContrastEnabled: boolean;
  setHighContrastEnabled: (enabled: boolean) => void;
  
  // Current emergency flow
  selectedCategory: EmergencyCategory | null;
  setSelectedCategory: (category: EmergencyCategory | null) => void;
  selectedPhraseId: number | null;
  setSelectedPhraseId: (id: number | null) => void;
  
  // Conversation
  conversation: ConversationEntry[];
  addConversationEntry: (entry: ConversationEntry) => void;
  clearConversation: () => void;
  
  // Billboard mode
  billboardMode: boolean;
  setBillboardMode: (enabled: boolean) => void;
  
  // Responder mode
  responderMode: boolean;
  setResponderMode: (enabled: boolean) => void;
  
  // DB initialized
  dbReady: boolean;
  setDbReady: (ready: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Language
  language: 'en',
  setLanguage: (language) => set({ language }),
  
  // Assistance modes
  assistanceModes: [],
  toggleAssistanceMode: (mode) =>
    set((state) => ({
      assistanceModes: state.assistanceModes.includes(mode)
        ? state.assistanceModes.filter((m) => m !== mode)
        : [...state.assistanceModes, mode],
    })),
  
  // Settings
  hapticsEnabled: true,
  setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
  autoSpeakEnabled: true,
  setAutoSpeakEnabled: (autoSpeakEnabled) => set({ autoSpeakEnabled }),
  largeTextEnabled: false,
  setLargeTextEnabled: (largeTextEnabled) => set({ largeTextEnabled }),
  highContrastEnabled: true,
  setHighContrastEnabled: (highContrastEnabled) => set({ highContrastEnabled }),
  
  // Current emergency flow
  selectedCategory: null,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  selectedPhraseId: null,
  setSelectedPhraseId: (selectedPhraseId) => set({ selectedPhraseId }),
  
  // Conversation
  conversation: [],
  addConversationEntry: (entry) =>
    set((state) => ({ conversation: [...state.conversation, entry] })),
  clearConversation: () => set({ conversation: [] }),
  
  // Billboard mode
  billboardMode: false,
  setBillboardMode: (billboardMode) => set({ billboardMode }),
  
  // Responder mode
  responderMode: false,
  setResponderMode: (responderMode) => set({ responderMode }),
  
  // DB
  dbReady: false,
  setDbReady: (dbReady) => set({ dbReady }),
}));
