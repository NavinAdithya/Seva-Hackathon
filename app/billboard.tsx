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

export default function BillboardScreen() {
  const router = useRouter();
  const { phraseId } = useLocalSearchParams<{ phraseId: string }>();
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const selectedPhraseId = useAppStore((s) => s.selectedPhraseId);
  const autoSpeak = useAppStore((s) => s.autoSpeakEnabled);
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);

  const [phrase, setPhrase] = useState<EmergencyPhrase | null>(null);

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

  if (!phrase) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0B0F19',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#F8FAFC', fontSize: 18 }}>
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        {/* Helper Top Instruction */}
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <Text
            style={{
              color: '#94A3B8',
              fontSize: 14,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              textAlign: 'center',
            }}
          >
            {t('billboard.title')}
          </Text>
        </View>

        {/* 1.5-Meter Billboard Box (WCAG AAA High Contrast) */}
        <TouchableOpacity
          onPress={handleSpeak}
          activeOpacity={0.85}
          accessibilityRole={'text' as AccessibilityRole}
          accessibilityLabel={t('a11y.billboardMessage', { message: primaryText })}
          style={{
            backgroundColor: '#111827',
            borderRadius: 24,
            borderWidth: 3.5,
            borderColor: '#FEF08A',
            padding: 28,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 260,
            shadowColor: '#FEF08A',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 72, marginBottom: 16 }}>{phrase.icon}</Text>
          
          {/* Primary Language Text (Extra Large 34-40pt) */}
          <Text
            style={{
              color: '#FEF08A',
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
              borderTopColor: '#374151',
              paddingTop: 12,
              gap: 4,
            }}
          >
            {language !== 'en' && (
              <Text
                style={{
                  color: '#CBD5E1',
                  fontSize: 18,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                EN: {phrase.text_en}
              </Text>
            )}
            {language !== 'ta' && (
              <Text
                style={{
                  color: '#94A3B8',
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                தமிழ்: {phrase.text_ta}
              </Text>
            )}
            {language !== 'hi' && (
              <Text
                style={{
                  color: '#94A3B8',
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                हिंदी: {phrase.text_hi}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Action Controls */}
        <View style={{ marginTop: 24, gap: 12 }}>
          {/* Speak Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel={t('billboard.tapToSpeak')}
            onPress={handleSpeak}
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#64748B',
              paddingVertical: 16,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 24, marginRight: 10 }}>🔊</Text>
            <Text
              style={{
                color: '#F8FAFC',
                fontSize: 18,
                fontWeight: '700',
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
            style={{
              backgroundColor: '#FEF08A',
              borderRadius: 16,
              paddingVertical: 18,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FEF08A',
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 26, marginRight: 10 }}>🤝</Text>
            <Text
              style={{
                color: '#0B0F19',
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
            style={{
              backgroundColor: '#1A1F2E',
              borderRadius: 14,
              borderWidth: 1,
              borderColor: '#38BDF8',
              paddingVertical: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#38BDF8', fontSize: 16, fontWeight: '700' }}>
              🪪 {t('card.show')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
