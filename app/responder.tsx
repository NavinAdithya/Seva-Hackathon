import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  AccessibilityRole,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../src/store/useAppStore';
import {
  getPhraseById,
  getQuestionsForPhrase,
  getOptionsForQuestion,
} from '../src/db/queries';
import {
  EmergencyPhrase,
  ResponderQuestion,
  QuestionOption,
} from '../src/types';
import {
  getPhraseText,
  getQuestionText,
  getOptionText,
} from '../src/utils/textHelpers';
import { speakText } from '../src/utils/speech';
import { triggerSelection, triggerSuccess } from '../src/utils/haptics';
import { THEME } from '../src/constants/theme';

interface TranscriptItem {
  speaker: 'patient' | 'responder';
  text: string;
  time: string;
}

export default function ResponderScreen() {
  const router = useRouter();
  const { phraseId } = useLocalSearchParams<{ phraseId: string }>();
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const selectedPhraseId = useAppStore((s) => s.selectedPhraseId);
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const autoSpeak = useAppStore((s) => s.autoSpeakEnabled);

  const targetPhraseId = phraseId ? parseInt(phraseId, 10) : selectedPhraseId || 1;

  const [phrase, setPhrase] = useState<EmergencyPhrase | null>(null);
  const [questions, setQuestions] = useState<ResponderQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState<QuestionOption[]>([]);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const p = await getPhraseById(targetPhraseId);
        setPhrase(p);
        if (p) {
          const initialText = getPhraseText(p, language);
          setTranscript([
            {
              speaker: 'patient',
              text: initialText,
              time: 'Initial Complaint',
            },
          ]);
        }

        const qList = await getQuestionsForPhrase(targetPhraseId);
        setQuestions(qList);

        if (qList.length > 0) {
          const opts = await getOptionsForQuestion(qList[0].id);
          setOptions(opts);
        }
      } catch (e) {
        console.error('Failed to load responder handshake data:', e);
      }
    }
    loadInitialData();
  }, [targetPhraseId]);

  const loadQuestionOptions = async (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      const opts = await getOptionsForQuestion(questions[index].id);
      setOptions(opts);
    }
  };

  const handleSelectOption = async (option: QuestionOption) => {
    if (hapticsEnabled) await triggerSuccess();
    const optText = getOptionText(option, language);
    const qText = getQuestionText(questions[currentQuestionIndex], language);

    if (autoSpeak) {
      speakText(optText, language);
    }

    setTranscript((prev) => [
      ...prev,
      { speaker: 'responder', text: qText, time: 'Q' },
      { speaker: 'patient', text: optText, time: 'A' },
    ]);

    // Auto-advance to next question if available
    if (currentQuestionIndex + 1 < questions.length) {
      await loadQuestionOptions(currentQuestionIndex + 1);
    }
  };

  const handleSelectPain = async (painValue: number, label: string) => {
    if (hapticsEnabled) await triggerSelection();
    setSelectedPain(painValue);

    const painMessage = `Pain level: ${painValue}/10 (${label})`;
    if (autoSpeak) {
      speakText(painMessage, language);
    }

    setTranscript((prev) => [
      ...prev,
      { speaker: 'responder', text: 'Pain Severity Assessment', time: 'Pain' },
      { speaker: 'patient', text: painMessage, time: 'Pain' },
    ]);
  };

  const handleShareSummary = async () => {
    if (hapticsEnabled) await triggerSelection();
    const summaryHeader = `🏥 SignSOS Emergency Handover Summary\nChief Complaint: ${phrase ? getPhraseText(phrase, language) : 'Emergency'}\nPain Level: ${selectedPain !== null ? `${selectedPain}/10` : 'Not recorded'}\n\nClinical Q&A Transcript:\n`;
    const summaryBody = transcript
      .map((item) => `${item.speaker === 'patient' ? '👤 Patient' : '🩺 Clinician'}: ${item.text}`)
      .join('\n');

    Share.share({
      title: 'SignSOS Emergency Handover',
      message: `${summaryHeader}${summaryBody}`,
    });
  };

  const PAIN_SCALE = [
    { value: 0, emoji: '😊', label_en: 'No Pain', label_ta: 'வலி இல்லை', label_hi: 'कोई दर्द नहीं', color: '#10B981' },
    { value: 2, emoji: '🙂', label_en: 'Mild', label_ta: 'லேசான', label_hi: 'हल्का', color: '#84CC16' },
    { value: 4, emoji: '😐', label_en: 'Moderate', label_ta: 'நடுத்தர', label_hi: 'मध्यम', color: '#EAB308' },
    { value: 6, emoji: '😣', label_en: 'Severe', label_ta: 'கடுமையான', label_hi: 'गंभीर', color: '#F97316' },
    { value: 8, emoji: '😫', label_en: 'Very Severe', label_ta: 'மிக கடுமையான', label_hi: 'बहुत गंभीर', color: '#EA580C' },
    { value: 10, emoji: '😭', label_en: 'Worst Pain', label_ta: 'அதிகபட்ச வலி', label_hi: 'असहनीय दर्द', color: '#EF4444' },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.canvas }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Card */}
        <View
          style={{
            backgroundColor: '#16233B',
            borderRadius: THEME.borderRadius.card,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1.5,
            borderColor: '#60A5FA',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>🩺</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: '#93C5FD',
                  fontSize: 12,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {t('responder.title')} (Clinician Handshake)
              </Text>
              <Text
                style={{
                  color: THEME.colors.textPrimary,
                  fontSize: 16,
                  fontWeight: '800',
                }}
              >
                Structured Two-Way Communication Aid
              </Text>
            </View>
          </View>

          {/* Quick Share Transcript Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Export or Share Clinical Transcript with Paramedic"
            onPress={handleShareSummary}
            style={{
              backgroundColor: THEME.colors.surfaceElevated,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#60A5FA',
            }}
          >
            <Text style={{ color: '#93C5FD', fontSize: 13, fontWeight: '800' }}>
              📤 Export
            </Text>
          </TouchableOpacity>
        </View>

        {/* Live Conversation Transcript */}
        <View
          style={{
            backgroundColor: THEME.colors.surface,
            borderRadius: THEME.borderRadius.card,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: THEME.colors.hairline,
          }}
        >
          <Text
            style={{
              color: THEME.colors.textSecondary,
              fontSize: 12,
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            📋 {t('responder.conversation')}
          </Text>

          {transcript.map((item, idx) => {
            const isPatient = item.speaker === 'patient';
            return (
              <View
                key={idx}
                style={{
                  marginVertical: 4,
                  alignSelf: isPatient ? 'flex-start' : 'flex-end',
                  maxWidth: '88%',
                }}
              >
                <View
                  style={{
                    backgroundColor: isPatient ? '#232D42' : '#1E3A5F',
                    borderRadius: 14,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderWidth: 1,
                    borderColor: isPatient ? THEME.colors.accent : '#60A5FA',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '800',
                      color: isPatient ? THEME.colors.accent : '#93C5FD',
                      marginBottom: 2,
                    }}
                  >
                    {isPatient ? '👤 Patient' : '🩺 Clinician / Responder'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: THEME.colors.textPrimary,
                      lineHeight: 21,
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Wong-Baker FACES Pain Scale */}
        <View
          style={{
            backgroundColor: THEME.colors.surface,
            borderRadius: THEME.borderRadius.card,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: THEME.colors.hairline,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <Text
              accessibilityRole={'header' as AccessibilityRole}
              style={{
                color: THEME.colors.accent,
                fontSize: 16,
                fontWeight: '900',
              }}
            >
              Wong-Baker FACES® Pain Scale
            </Text>
            {selectedPain !== null && (
              <View
                style={{
                  backgroundColor: 'rgba(254, 240, 138, 0.15)',
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: THEME.colors.accent, fontSize: 12, fontWeight: '800' }}>
                  Score: {selectedPain}/10
                </Text>
              </View>
            )}
          </View>
          <Text
            style={{
              color: THEME.colors.textSecondary,
              fontSize: 13,
              marginBottom: 12,
            }}
          >
            Patient: Tap the face that represents your pain level right now
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            {PAIN_SCALE.map((p) => {
              const isSelected = selectedPain === p.value;
              const label =
                language === 'ta'
                  ? p.label_ta
                  : language === 'hi'
                  ? p.label_hi
                  : p.label_en;
              return (
                <TouchableOpacity
                  key={p.value}
                  accessibilityRole={'button' as AccessibilityRole}
                  accessibilityLabel={`Pain level ${p.value}: ${label}`}
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => handleSelectPain(p.value, label)}
                  activeOpacity={0.7}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 2,
                    backgroundColor: isSelected ? p.color : '#141824',
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: isSelected ? '#FFFFFF' : p.color,
                  }}
                >
                  <Text style={{ fontSize: 28, marginBottom: 4 }}>{p.emoji}</Text>
                  <Text
                    style={{
                      color: isSelected ? '#FFFFFF' : THEME.colors.textPrimary,
                      fontSize: 14,
                      fontWeight: '900',
                    }}
                  >
                    {p.value}
                  </Text>
                  <Text
                    style={{
                      color: isSelected ? '#FFFFFF' : THEME.colors.textSecondary,
                      fontSize: 10,
                      fontWeight: '700',
                      textAlign: 'center',
                    }}
                    numberOfLines={1}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Current Active Follow-up Question */}
        {currentQuestion ? (
          <View
            style={{
              backgroundColor: THEME.colors.surface,
              borderRadius: THEME.borderRadius.card,
              padding: 16,
              borderWidth: 2,
              borderColor: '#60A5FA',
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: '#93C5FD',
                  fontSize: 12,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                Question {currentQuestionIndex + 1} of {questions.length}
              </Text>

              {/* Question selector step pills */}
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {questions.map((_, qIdx) => (
                  <TouchableOpacity
                    key={qIdx}
                    accessibilityRole={'button' as AccessibilityRole}
                    accessibilityLabel={`Go to question ${qIdx + 1}`}
                    onPress={() => loadQuestionOptions(qIdx)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor:
                        qIdx === currentQuestionIndex ? '#60A5FA' : THEME.colors.surfaceElevated,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          qIdx === currentQuestionIndex ? '#0B0F19' : THEME.colors.textSecondary,
                        fontSize: 12,
                        fontWeight: '800',
                      }}
                    >
                      {qIdx + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text
              style={{
                color: THEME.colors.accent,
                fontSize: 21,
                fontWeight: '900',
                lineHeight: 27,
                marginVertical: 6,
              }}
            >
              {getQuestionText(currentQuestion, language)}
            </Text>

            <Text
              style={{
                color: THEME.colors.textSecondary,
                fontSize: 13,
                marginTop: 4,
                marginBottom: 12,
              }}
            >
              Patient: Tap your answer below:
            </Text>

            {/* Answer Options */}
            <View style={{ gap: 8 }}>
              {options.map((opt) => {
                const optText = getOptionText(opt, language);
                return (
                  <TouchableOpacity
                    key={opt.id}
                    accessibilityRole={'button' as AccessibilityRole}
                    accessibilityLabel={`Answer option: ${optText}`}
                    onPress={() => handleSelectOption(opt)}
                    activeOpacity={0.7}
                    style={{
                      backgroundColor: THEME.colors.surfaceElevated,
                      borderRadius: 14,
                      borderWidth: 1.5,
                      borderColor: THEME.colors.hairlineStrong,
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      minHeight: 56,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: THEME.colors.textPrimary,
                        fontSize: 17,
                        fontWeight: '700',
                      }}
                    >
                      {optText}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <View
            style={{
              padding: 20,
              alignItems: 'center',
              backgroundColor: THEME.colors.surface,
              borderRadius: THEME.borderRadius.card,
              marginVertical: 10,
            }}
          >
            <Text style={{ color: THEME.colors.textSecondary, fontSize: 16 }}>
              {t('responder.noQuestions')}
            </Text>
          </View>
        )}

        {/* Action Row */}
        <View style={{ gap: 10 }}>
          {/* Emergency Card Shortcut */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Show Emergency Medical Card to Responder"
            onPress={() => router.push('/emergency-card')}
            activeOpacity={0.8}
            style={{
              backgroundColor: THEME.colors.surface,
              borderRadius: THEME.borderRadius.card,
              borderWidth: 1.5,
              borderColor: THEME.colors.medical,
              paddingVertical: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: THEME.colors.medical, fontSize: 16, fontWeight: '800' }}>
              🪪 View Emergency Medical Card
            </Text>
          </TouchableOpacity>

          {/* Complete Handshake Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Complete handshake exchange and return to Home Gateway"
            onPress={() => router.replace('/')}
            activeOpacity={0.8}
            style={{
              backgroundColor: THEME.colors.success,
              borderRadius: THEME.borderRadius.card,
              paddingVertical: 16,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#0B0F19',
                fontSize: 18,
                fontWeight: '900',
              }}
            >
              ✓ Complete Handshake
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
