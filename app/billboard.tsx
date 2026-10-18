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
import { getPhraseById } from '../src/db/queries';
import { EmergencyPhrase } from '../src/types';
import { speakText } from '../src/utils/speech';
import { triggerHeavy, triggerSelection } from '../src/utils/haptics';
import { THEME } from '../src/constants/theme';

export default function BillboardScreen() {
  const router = useRouter();
  const { phraseId } = useLocalSearchParams<{ phraseId: string }>();
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const selectedPhraseId = useAppStore((s) => s.selectedPhraseId);
  const autoSpeak = useAppStore((s) => s.autoSpeakEnabled);
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);

  const [phrase, setPhrase] = useState<EmergencyPhrase | null>(null);
  const [isInverted, setIsInverted] = useState(false);
  const [isBeaconActive, setIsBeaconActive] = useState(false);

  const targetId = phraseId ? parseInt(phraseId, 10) : selectedPhraseId;

  useEffect(() => {
    async function loadPhrase() {
      if (!targetId) return;
      try {
        const item = await getPhraseById(targetId);
        setPhrase(item);
        if (item) {
          const mainText =
            language === 'ta'
              ? item.text_ta
              : language === 'hi'
              ? item.text_hi
              : item.text_en;

          if (autoSpeak) {
            speakText(mainText, language);
          }
          if (hapticsEnabled) {
            triggerHeavy();
          }
        }
      } catch (e) {
        console.error('Failed to load phrase for billboard:', e);
      }
    }
    loadPhrase();
  }, [targetId]);

  const handleSpeak = async () => {
    if (!phrase) return;
    if (hapticsEnabled) await triggerSelection();
    const mainText =
      language === 'ta'
        ? phrase.text_ta
        : language === 'hi'
        ? phrase.text_hi
        : phrase.text_en;
    speakText(mainText, language);
  };

  const handleOpenResponder = async () => {
    if (hapticsEnabled) await triggerSelection();
    router.push({
      pathname: '/responder',
      params: { phraseId: targetId ? targetId.toString() : '1' },
    });
  };

  const toggleInverted = async () => {
    if (hapticsEnabled) await triggerSelection();
    setIsInverted(!isInverted);
  };

  const toggleBeacon = async () => {
    if (hapticsEnabled) await triggerHeavy();
    setIsBeaconActive(!isBeaconActive);
  };

  if (!phrase) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.colors.canvas,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: THEME.colors.textPrimary, fontSize: 18 }}>
          {t('common.loading')}
        </Text>
      </View>
    );
  }

  const primaryText =
    language === 'ta'
      ? phrase.text_ta
      : language === 'hi'
      ? phrase.text_hi
      : phrase.text_en;

  const billboardBg = isInverted ? THEME.colors.accent : '#111827';
  const billboardText = isInverted ? '#0B0F19' : THEME.colors.accent;
  const billboardBorder = isBeaconActive ? '#EF4444' : THEME.colors.accent;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.canvas }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        {/* Top Controls Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: THEME.colors.textSecondary,
              fontSize: 12,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
            }}
          >
            {t('billboard.title')}
          </Text>

          {/* Quick Display Mode Toggles */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {/* Invert Color Toggle */}
            <TouchableOpacity
              onPress={toggleInverted}
              accessibilityRole={'button' as AccessibilityRole}
              accessibilityLabel="Toggle billboard light or dark contrast"
              style={{
                backgroundColor: THEME.colors.surface,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: THEME.colors.hairline,
              }}
            >
              <Text style={{ color: THEME.colors.textPrimary, fontSize: 12, fontWeight: '700' }}>
                {isInverted ? '🌙 Dark' : '☀️ High-Vis'}
              </Text>
            </TouchableOpacity>

            {/* Emergency Beacon Toggle */}
            <TouchableOpacity
              onPress={toggleBeacon}
              accessibilityRole={'button' as AccessibilityRole}
              accessibilityLabel="Toggle visual emergency beacon"
              style={{
                backgroundColor: isBeaconActive
                  ? THEME.colors.emergencyCritical
                  : THEME.colors.surface,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isBeaconActive
                  ? THEME.colors.emergencyCritical
                  : THEME.colors.hairline,
              }}
            >
              <Text
                style={{
                  color: isBeaconActive ? '#FFFFFF' : THEME.colors.textPrimary,
                  fontSize: 12,
                  fontWeight: '700',
                }}
              >
                🚨 {isBeaconActive ? 'Beacon ON' : 'Beacon'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 1.5-Meter Billboard Box (WCAG AAA High Contrast) */}
        <TouchableOpacity
          onPress={handleSpeak}
          activeOpacity={0.85}
          accessibilityRole={'button' as AccessibilityRole}
          accessibilityLabel={t('a11y.billboardMessage', { message: primaryText })}
          accessibilityHint="Tap to speak this emergency message aloud"
          style={{
            backgroundColor: billboardBg,
            borderRadius: 24,
            borderWidth: isBeaconActive ? 5 : 3.5,
            borderColor: billboardBorder,
            padding: 24,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 280,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 72, marginBottom: 14 }}>{phrase.icon}</Text>

          {/* Primary Language Text (Extra Large 34-40pt) */}
          <Text
            style={{
              color: billboardText,
              fontSize: 36,
              fontWeight: '900',
              textAlign: 'center',
              lineHeight: 46,
              marginBottom: 16,
            }}
          >
            {primaryText}
          </Text>

          {/* Secondary Translations for Responder Clarity */}
          <View
            style={{
              width: '100%',
              borderTopWidth: 1,
              borderTopColor: isInverted ? 'rgba(0,0,0,0.2)' : '#374151',
              paddingTop: 12,
              gap: 4,
            }}
          >
            {language !== 'en' && (
              <Text
                style={{
                  color: isInverted ? '#1E293B' : '#CBD5E1',
                  fontSize: 18,
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                EN: {phrase.text_en}
              </Text>
            )}
            {language !== 'ta' && (
              <Text
                style={{
                  color: isInverted ? '#334155' : '#94A3B8',
                  fontSize: 16,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                தமிழ்: {phrase.text_ta}
              </Text>
            )}
            {language !== 'hi' && (
              <Text
                style={{
                  color: isInverted ? '#334155' : '#94A3B8',
                  fontSize: 16,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                हिंदी: {phrase.text_hi}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Action Controls */}
        <View style={{ marginTop: 20, gap: 12 }}>
          {/* Speak Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel={t('billboard.tapToSpeak')}
            onPress={handleSpeak}
            activeOpacity={0.8}
            style={{
              backgroundColor: THEME.colors.surface,
              borderRadius: THEME.borderRadius.card,
              borderWidth: 1.5,
              borderColor: THEME.colors.hairlineStrong,
              paddingVertical: 16,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 56,
            }}
          >
            <Text style={{ fontSize: 24, marginRight: 10 }}>🔊</Text>
            <Text
              style={{
                color: THEME.colors.textPrimary,
                fontSize: 18,
                fontWeight: '800',
              }}
            >
              {t('billboard.tapToSpeak')}
            </Text>
          </TouchableOpacity>

          {/* Clinician Handshake Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Start Two-Way Clinician Handshake with Responder"
            onPress={handleOpenResponder}
            activeOpacity={0.8}
            style={{
              backgroundColor: THEME.colors.accent,
              borderRadius: THEME.borderRadius.card,
              paddingVertical: 18,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 60,
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 26, marginRight: 10 }}>🤝</Text>
            <Text
              style={{
                color: THEME.colors.accentOnHighVis,
                fontSize: 19,
                fontWeight: '900',
              }}
            >
              {t('billboard.respondToThis')}
            </Text>
          </TouchableOpacity>

          {/* Emergency Card Shortcut */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Show Emergency Card to Medical Personnel"
            onPress={() => router.push('/emergency-card')}
            activeOpacity={0.8}
            style={{
              backgroundColor: THEME.colors.surface,
              borderRadius: THEME.borderRadius.card,
              borderWidth: 1.5,
              borderColor: THEME.colors.medical,
              paddingVertical: 14,
              alignItems: 'center',
              minHeight: 50,
            }}
          >
            <Text style={{ color: THEME.colors.medical, fontSize: 16, fontWeight: '800' }}>
              🪪 {t('card.show')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
