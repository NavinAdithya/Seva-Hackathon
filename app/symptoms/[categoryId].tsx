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
import { THEME } from '../../src/constants/theme';

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
    <View style={{ flex: 1, backgroundColor: THEME.colors.canvas }}>
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
                color: THEME.colors.textPrimary,
                fontSize: 22,
                fontWeight: '800',
              }}
            >
              {getCategoryLabel(category, language)}
            </Text>
            <Text style={{ color: '#E2E8F0', fontSize: 13, fontWeight: '500' }}>
              {t('symptoms.title')} • {phrases.length} phrases available
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
          <ActivityIndicator size="large" color={THEME.colors.accent} />
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
                ? THEME.colors.emergencyCritical
                : phrase.severity === 'high'
                ? THEME.colors.emergencyHigh
                : THEME.colors.emergencyStable;

            const severityBadge =
              phrase.severity === 'critical'
                ? { label: 'CRITICAL', color: THEME.colors.emergencyCritical, bg: THEME.colors.emergencyCriticalBg }
                : phrase.severity === 'high'
                ? { label: 'URGENT', color: THEME.colors.emergencyHigh, bg: THEME.colors.emergencyHighBg }
                : { label: 'STABLE', color: THEME.colors.emergencyStable, bg: THEME.colors.emergencyStableBg };

            return (
              <View
                key={phrase.id}
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderRadius: THEME.borderRadius.card,
                  borderLeftWidth: 6,
                  borderLeftColor: severityColor,
                  borderWidth: 1,
                  borderColor: THEME.colors.hairline,
                  padding: 14,
                  marginVertical: 6,
                  minHeight: 78,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  accessibilityRole={'button' as AccessibilityRole}
                  accessibilityLabel={t('a11y.symptomOption', { name: text })}
                  accessibilityHint="Double tap to open 1.5-meter high-visibility billboard"
                  onPress={() => handlePhraseSelect(phrase)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 32, marginRight: 12 }}>
                    {phrase.icon}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: THEME.colors.textPrimary,
                        fontSize: largeText ? 20 : 16,
                        fontWeight: '700',
                        lineHeight: 22,
                        marginBottom: 4,
                      }}
                    >
                      {text}
                    </Text>
                    {/* WCAG 1.4.1 Compliant Textual Severity Badge */}
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        backgroundColor: severityBadge.bg,
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          color: severityBadge.color,
                          fontSize: 10,
                          fontWeight: '800',
                          letterSpacing: 0.5,
                        }}
                      >
                        {severityBadge.label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Speaker Button */}
                <TouchableOpacity
                  accessibilityRole={'button' as AccessibilityRole}
                  accessibilityLabel={t('a11y.speakButton')}
                  accessibilityHint="Double tap to announce this phrase out loud"
                  onPress={(e) => handleSpeakOnly(phrase, e)}
                  activeOpacity={0.7}
                  style={{
                    padding: 10,
                    backgroundColor: THEME.colors.surfaceElevated,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: THEME.colors.hairlineStrong,
                    minWidth: 44,
                    minHeight: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 20 }}>🔊</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
