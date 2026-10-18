import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AccessibilityRole,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../src/store/useAppStore';
import { getPhrasesByCategory } from '../../src/db/queries';
import { EmergencyPhrase, EmergencyCategory } from '../../src/types';
import { CATEGORIES } from '../../src/constants/categories';
import { getPhraseText, getCategoryLabel } from '../../src/utils/textHelpers';
import { speakText } from '../../src/utils/speech';
import { triggerSelection } from '../../src/utils/haptics';

export default function SymptomsScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const setSelectedPhraseId = useAppStore((s) => s.setSelectedPhraseId);
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const autoSpeak = useAppStore((s) => s.autoSpeakEnabled);
  const largeText = useAppStore((s) => s.largeTextEnabled);

  const [phrases, setPhrases] = useState<EmergencyPhrase[]>([]);
  const [loading, setLoading] = useState(true);

  const category = CATEGORIES.find((c) => c.id === categoryId);

  useEffect(() => {
    async function loadPhrases() {
      if (!categoryId) return;
      try {
        const data = await getPhrasesByCategory(categoryId as EmergencyCategory);
        setPhrases(data);
      } catch (e) {
        console.error('Failed to load phrases for category:', categoryId, e);
      } finally {
        setLoading(false);
      }
    }
    loadPhrases();
  }, [categoryId]);

  const handlePhraseSelect = async (phrase: EmergencyPhrase) => {
    if (hapticsEnabled) await triggerSelection();
    setSelectedPhraseId(phrase.id);

    const phraseText = getPhraseText(phrase, language);
    if (autoSpeak) {
      speakText(phraseText, language);
    }

    router.push({
      pathname: '/billboard',
      params: { phraseId: phrase.id.toString() },
    });
  };

  const handleSpeakOnly = async (phrase: EmergencyPhrase, e: any) => {
    e.stopPropagation();
    if (hapticsEnabled) await triggerSelection();
    const phraseText = getPhraseText(phrase, language);
    speakText(phraseText, language);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      {/* Category Header Banner */}
      {category && (
        <View
          style={{
            backgroundColor: category.bgColor,
            borderBottomWidth: 2,
            borderBottomColor: category.color,
            paddingVertical: 16,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 36, marginRight: 12 }}>{category.icon}</Text>
          <View>
            <Text
              style={{
                color: '#F8FAFC',
                fontSize: 22,
                fontWeight: '800',
              }}
            >
              {getCategoryLabel(category, language)}
            </Text>
            <Text style={{ color: '#E2E8F0', fontSize: 13 }}>
              {t('symptoms.title')}
            </Text>
          </View>
        </View>
      )}

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#FEF08A" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {phrases.map((phrase) => {
            const text = getPhraseText(phrase, language);
            const severityColor =
              phrase.severity === 'critical'
                ? '#EF4444'
                : phrase.severity === 'high'
                ? '#F59E0B'
                : '#22C55E';

            return (
              <TouchableOpacity
                key={phrase.id}
                accessibilityRole={'button' as AccessibilityRole}
                accessibilityLabel={t('a11y.symptomOption', { name: text })}
                onPress={() => handlePhraseSelect(phrase)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: '#1A1F2E',
                  borderRadius: 16,
                  borderLeftWidth: 6,
                  borderLeftColor: severityColor,
                  borderWidth: 1,
                  borderColor: '#2D3748',
                  padding: 16,
                  marginVertical: 6,
                  minHeight: 76,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 32, marginRight: 14 }}>
                    {phrase.icon}
                  </Text>
                  <Text
                    style={{
                      color: '#F8FAFC',
                      fontSize: largeText ? 20 : 17,
                      fontWeight: '600',
                      flex: 1,
                      lineHeight: 24,
                    }}
                  >
                    {text}
                  </Text>
                </View>

                {/* Speaker Button */}
                <TouchableOpacity
                  accessibilityRole={'button' as AccessibilityRole}
                  accessibilityLabel={t('a11y.speakButton')}
                  onPress={(e) => handleSpeakOnly(phrase, e)}
                  style={{
                    padding: 10,
                    backgroundColor: '#252B3B',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#4B5563',
                  }}
                >
                  <Text style={{ fontSize: 22 }}>🔊</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
