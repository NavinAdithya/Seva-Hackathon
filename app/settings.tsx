import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  AccessibilityRole,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../src/store/useAppStore';
import { Language, AssistanceMode } from '../src/types';
import { triggerSelection } from '../src/utils/haptics';
import { THEME } from '../src/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const assistanceModes = useAppStore((s) => s.assistanceModes);
  const toggleAssistanceMode = useAppStore((s) => s.toggleAssistanceMode);

  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const setHapticsEnabled = useAppStore((s) => s.setHapticsEnabled);

  const autoSpeak = useAppStore((s) => s.autoSpeakEnabled);
  const setAutoSpeak = useAppStore((s) => s.setAutoSpeakEnabled);

  const largeText = useAppStore((s) => s.largeTextEnabled);
  const setLargeText = useAppStore((s) => s.setLargeTextEnabled);

  const highContrast = useAppStore((s) => s.highContrastEnabled);
  const setHighContrast = useAppStore((s) => s.setHighContrastEnabled);

  const handleLanguageChange = async (lang: Language) => {
    if (hapticsEnabled) await triggerSelection();
    setLanguage(lang);
  };

  const isModeActive = (m: AssistanceMode) => assistanceModes.includes(m);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.canvas }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Language */}
        <View style={{ marginBottom: 20 }}>
          <Text
            accessibilityRole={'header' as AccessibilityRole}
            style={{
              color: THEME.colors.accent,
              fontSize: 17,
              fontWeight: '800',
              marginBottom: 10,
            }}
          >
            🌐 {t('settings.language')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: THEME.colors.surface,
              borderRadius: 14,
              padding: 4,
              borderWidth: 1,
              borderColor: THEME.colors.hairline,
            }}
          >
            {(
              [
                { code: 'en', label: 'English' },
                { code: 'ta', label: 'தமிழ் (Tamil)' },
                { code: 'hi', label: 'हिंदी (Hindi)' },
              ] as const
            ).map((item) => (
              <TouchableOpacity
                key={item.code}
                accessibilityRole={'button' as AccessibilityRole}
                accessibilityLabel={`Language ${item.label}`}
                accessibilityState={{ selected: language === item.code }}
                onPress={() => handleLanguageChange(item.code)}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor:
                    language === item.code
                      ? THEME.colors.accent
                      : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 13,
                    color:
                      language === item.code
                        ? THEME.colors.accentOnHighVis
                        : THEME.colors.textSecondary,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: Assistance Modes */}
        <View style={{ marginBottom: 20 }}>
          <Text
            accessibilityRole={'header' as AccessibilityRole}
            style={{
              color: THEME.colors.accent,
              fontSize: 17,
              fontWeight: '800',
              marginBottom: 10,
            }}
          >
            ♿ {t('settings.assistanceMode')}
          </Text>

          <View style={{ gap: 8 }}>
            {[
              {
                mode: 'vision' as AssistanceMode,
                icon: '👁️',
                title: t('assistance.vision'),
                desc: 'High-contrast colors, spoken announcements, TalkBack support',
              },
              {
                mode: 'hearing' as AssistanceMode,
                icon: '🦻',
                title: t('assistance.hearing'),
                desc: 'High-visibility billboard, pictograms, structured Q&A',
              },
              {
                mode: 'speech' as AssistanceMode,
                icon: '🗣️',
                title: t('assistance.speech'),
                desc: 'One-tap AAC phrases, text-to-speech speaker, responder mode',
              },
            ].map((item) => {
              const active = isModeActive(item.mode);
              return (
                <TouchableOpacity
                  key={item.mode}
                  accessibilityRole={'button' as AccessibilityRole}
                  accessibilityLabel={`Toggle ${item.title}`}
                  accessibilityState={{ selected: active }}
                  onPress={async () => {
                    if (hapticsEnabled) await triggerSelection();
                    toggleAssistanceMode(item.mode);
                  }}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: active
                      ? THEME.colors.surfaceElevated
                      : THEME.colors.surface,
                    borderRadius: THEME.borderRadius.card,
                    borderWidth: 1.5,
                    borderColor: active
                      ? THEME.colors.accent
                      : THEME.colors.hairline,
                    padding: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 }}>
                    <Text style={{ fontSize: 28, marginRight: 12 }}>{item.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: active ? THEME.colors.accent : THEME.colors.textPrimary,
                          fontSize: 16,
                          fontWeight: '800',
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text style={{ color: THEME.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: active ? THEME.colors.accent : THEME.colors.hairlineStrong,
                      backgroundColor: active ? THEME.colors.accent : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {active && (
                      <Text style={{ color: THEME.colors.accentOnHighVis, fontSize: 14, fontWeight: '900' }}>
                        ✓
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section: Display & Feedback */}
        <View style={{ marginBottom: 20 }}>
          <Text
            accessibilityRole={'header' as AccessibilityRole}
            style={{
              color: THEME.colors.accent,
              fontSize: 17,
              fontWeight: '800',
              marginBottom: 10,
            }}
          >
            ⚙️ Display & Feedback
          </Text>

          <View
            style={{
              backgroundColor: THEME.colors.surface,
              borderRadius: THEME.borderRadius.card,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: THEME.colors.hairline,
            }}
          >
            {/* Haptics */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: THEME.colors.hairline,
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '700' }}>
                  {t('settings.haptics')}
                </Text>
                <Text style={{ color: THEME.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                  Vibrational confirmation on button selections
                </Text>
              </View>
              <Switch
                value={hapticsEnabled}
                onValueChange={setHapticsEnabled}
                trackColor={{ false: '#374151', true: THEME.colors.accent }}
                thumbColor={hapticsEnabled ? THEME.colors.accentOnHighVis : '#94A3B8'}
              />
            </View>

            {/* Auto-Speak */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: THEME.colors.hairline,
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '700' }}>
                  {t('settings.autoSpeak')}
                </Text>
                <Text style={{ color: THEME.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                  Immediately speak phrase upon selection
                </Text>
              </View>
              <Switch
                value={autoSpeak}
                onValueChange={setAutoSpeak}
                trackColor={{ false: '#374151', true: THEME.colors.accent }}
                thumbColor={autoSpeak ? THEME.colors.accentOnHighVis : '#94A3B8'}
              />
            </View>

            {/* Large Text */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: THEME.colors.hairline,
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '700' }}>
                  {t('settings.largeText')}
                </Text>
                <Text style={{ color: THEME.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                  Increase UI typography scale across all screens
                </Text>
              </View>
              <Switch
                value={largeText}
                onValueChange={setLargeText}
                trackColor={{ false: '#374151', true: THEME.colors.accent }}
                thumbColor={largeText ? THEME.colors.accentOnHighVis : '#94A3B8'}
              />
            </View>

            {/* High Contrast */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 14,
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '700' }}>
                  {t('settings.highContrast')}
                </Text>
                <Text style={{ color: THEME.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                  WCAG 2.1 AAA high-contrast palette (#0B0F19 / #FEF08A)
                </Text>
              </View>
              <Switch
                value={highContrast}
                onValueChange={setHighContrast}
                trackColor={{ false: '#374151', true: THEME.colors.accent }}
                thumbColor={highContrast ? THEME.colors.accentOnHighVis : '#94A3B8'}
              />
            </View>
          </View>
        </View>

        {/* Section: Project Information & Disclosures */}
        <View
          style={{
            backgroundColor: THEME.colors.surface,
            borderRadius: THEME.borderRadius.card,
            padding: 16,
            borderWidth: 1,
            borderColor: THEME.colors.medical,
          }}
        >
          <Text
            style={{
              color: THEME.colors.medical,
              fontSize: 13,
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 4,
            }}
          >
            SEVA First Innovation Challenge 2026
          </Text>
          <Text
            style={{
              color: THEME.colors.textPrimary,
              fontSize: 15,
              fontWeight: '800',
              marginBottom: 8,
            }}
          >
            Theme: Swasth & Samavesh Bharat | Track A: Product / Technology
          </Text>
          <Text
            style={{
              color: THEME.colors.textSecondary,
              fontSize: 13,
              lineHeight: 18,
              marginBottom: 10,
            }}
          >
            SignSOS is an Augmentative and Alternative Communication (AAC) tool.
            It provides structured communication aids to bridge communication gaps
            between individuals with disabilities and first responders. It does
            not make clinical diagnostic or triage decisions.
          </Text>
          <Text style={{ color: THEME.colors.success, fontSize: 12, fontWeight: '800' }}>
            ✓ 100% Offline-First (No internet required, Airplane Mode verified)
          </Text>
          <Text style={{ color: THEME.colors.success, fontSize: 12, fontWeight: '800' }}>
            ✓ Zero Cloud Transmission (DPDP Act Private)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
