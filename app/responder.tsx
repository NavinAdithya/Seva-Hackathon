import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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
import { PAIN_SCALE } from '../src/constants/categories';
import {
  getPhraseText,
  getQuestionText,
  getOptionText,
} from '../src/utils/textHelpers';
import { speakText } from '../src/utils/speech';
import { triggerSelection, triggerSuccess } from '../src/utils/haptics';

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
      { speaker: 'responder', text: qText, time: `Q${currentQuestionIndex + 1}` },
      { speaker: 'patient', text: optText, time: 'Answer' },
    ]);

    // Advance to next question automatically if available
    if (currentQuestionIndex + 1 < questions.length) {
      loadQuestionOptions(currentQuestionIndex + 1);
    }
  };

  const handleSelectPain = async (val: number, label: string) => {
    if (hapticsEnabled) await triggerSelection();
    setSelectedPain(val);
    const painText = `Pain level: ${val}/10 (${label})`;
    if (autoSpeak) {
      speakText(painText, language);
    }
    setTranscript((prev) => [
      ...prev,
      { speaker: 'responder', text: 'Pain Severity Assessment', time: 'Scale' },
      { speaker: 'patient', text: painText, time: 'Answer' },
    ]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Clinician Handshake Mode Banner */}
        <View
          style={{
            backgroundColor: '#1E3A5F',
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            borderWidth: 2,
            borderColor: '#3B82F6',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 28, marginRight: 10 }}>🩺</Text>
            <View>
              <Text
                style={{
                  color: '#93C5FD',
                  fontSize: 12,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {t('responder.title')} (Clinician Handshake)
              </Text>
              <Text
                style={{
                  color: '#F8FAFC',
                  fontSize: 17,
                  fontWeight: '700',
                }}
              >
                Structured Two-Way Communication Aid
              </Text>
            </View>
          </View>
        </View>

        {/* Live Conversation Transcript */}
        <View
          style={{
            backgroundColor: '#141824',
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#2D3748',
          }}
        >
          <Text
            style={{
              color: '#94A3B8',
              fontSize: 13,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 12,
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
                  maxWidth: '85%',
                }}
              >
                <View
                  style={{
                    backgroundColor: isPatient ? '#252B3B' : '#1E3A5F',
                    borderRadius: 14,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderWidth: 1,
                    borderColor: isPatient ? '#FEF08A' : '#60A5FA',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: isPatient ? '#FEF08A' : '#93C5FD',
                      marginBottom: 2,
                    }}
                  >
                    {isPatient ? '👤 Patient' : '🩺 Clinician / Responder'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#F8FAFC',
                      lineHeight: 22,
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
            backgroundColor: '#1A1F2E',
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#374151',
          }}
        >
          <Text
            accessibilityRole={'header' as AccessibilityRole}
            style={{
              color: '#FEF08A',
              fontSize: 16,
              fontWeight: '800',
              marginBottom: 8,
            }}
          >
            Wong-Baker FACES® Pain Scale (0-10)
          </Text>
          <Text
            style={{
              color: '#94A3B8',
              fontSize: 13,
              marginBottom: 14,
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
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 2,
                    backgroundColor: isSelected ? '#FEF08A' : '#141824',
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: isSelected ? '#CA8A04' : '#2D3748',
                  }}
                >
                  <Text style={{ fontSize: 28, marginBottom: 4 }}>{p.emoji}</Text>
                  <Text
                    style={{
                      color: isSelected ? '#0B0F19' : '#F8FAFC',
                      fontSize: 14,
                      fontWeight: '800',
                    }}
                  >
                    {p.value}
                  </Text>
                  <Text
                    style={{
                      color: isSelected ? '#0B0F19' : '#94A3B8',
                      fontSize: 10,
                      fontWeight: '600',
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
              backgroundColor: '#1A1F2E',
              borderRadius: 16,
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
                  fontSize: 13,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                Question {currentQuestionIndex + 1} of {questions.length}
              </Text>

              {/* Question selector tabs */}
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {questions.map((_, qIdx) => (
                  <TouchableOpacity
                    key={qIdx}
                    onPress={() => loadQuestionOptions(qIdx)}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor:
                        qIdx === currentQuestionIndex ? '#60A5FA' : '#252B3B',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          qIdx === currentQuestionIndex ? '#0B0F19' : '#94A3B8',
                        fontSize: 12,
                        fontWeight: '700',
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
                color: '#FEF08A',
                fontSize: 22,
                fontWeight: '800',
                lineHeight: 28,
                marginVertical: 6,
              }}
            >
              {getQuestionText(currentQuestion, language)}
            </Text>

            <Text
              style={{
                color: '#94A3B8',
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
                      backgroundColor: '#252B3B',
                      borderRadius: 14,
                      borderWidth: 2,
                      borderColor: '#4B5563',
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      minHeight: 56,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: '#F8FAFC',
                        fontSize: 18,
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
              backgroundColor: '#1A1F2E',
              borderRadius: 16,
              marginVertical: 10,
            }}
          >
            <Text style={{ color: '#94A3B8', fontSize: 16 }}>
              {t('responder.noQuestions')}
            </Text>
          </View>
        )}

        {/* Finish / Return to Gateway */}
        <TouchableOpacity
          accessibilityRole={'button' as AccessibilityRole}
          accessibilityLabel="Finish exchange and return to Home Gateway"
          onPress={() => router.replace('/')}
          style={{
            backgroundColor: '#22C55E',
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 10,
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
      </ScrollView>
    </SafeAreaView>
  );
}
