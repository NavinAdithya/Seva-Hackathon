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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Language */}
        <View style={{ marginBottom: 24 }}>
          <Text
            accessibilityRole={'header' as AccessibilityRole}
            style={{
              color: '#FEF08A',
              fontSize: 18,
              fontWeight: '800',
              marginBottom: 12,
            }}
          >
            🌐 {t('settings.language')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#1A1F2E',
              borderRadius: 14,
              padding: 4,
              borderWidth: 1,
              borderColor: '#374151',
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
                    language === item.code ? '#FEF08A' : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    color: language === item.code ? '#0B0F19' : '#94A3B8',
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: Assistance Modes */}
        <View style={{ marginBottom: 24 }}>
          <Text
            accessibilityRole={'header' as AccessibilityRole}
            style={{
              color: '#FEF08A',
              fontSize: 18,
              fontWeight: '800',
              marginBottom: 12,
            }}
          >
            ♿ {t('settings.assistanceMode')}
          </Text>

          <View style={{ gap: 10 }}>
            {(
              [
                {
                  mode: 'vision' as AssistanceMode,
                  title: t('settings.vision'),
                  desc: 'High-contrast colors, spoken announcements, TalkBack support',
                  icon: '👁️',
                },
                {
                  mode: 'hearing' as AssistanceMode,
                  title: t('settings.hearing'),
                  desc: 'High-visibility billboard, pictograms, structured Q&A',
                  icon: '🦻',
                },
                {
                  mode: 'speech' as AssistanceMode,
                  title: t('settings.speech'),
                  desc: 'One-tap AAC phrases, text-to-speech speaker, responder mode',
                  icon: '🗣️',
                },
              ] as const
            ).map((item) => {
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
                  style={{
                    backgroundColor: active ? '#252B3B' : '#1A1F2E',
                    borderRadius: 14,
                    padding: 16,
                    borderWidth: 2,
                    borderColor: active ? '#FEF08A' : '#374151',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 32, marginRight: 12 }}>
                      {item.icon}
                    </Text>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                      <Text
                        style={{
                          color: '#F8FAFC',
                          fontSize: 16,
                          fontWeight: '700',
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text style={{ color: '#94A3B8', fontSize: 13, marginTop: 2 }}>
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      color: active ? '#FEF08A' : '#4B5563',
                      fontWeight: '800',
                    }}
                  >
                    {active ? '✓' : '○'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section: Interaction & Display Preferences */}
        <View style={{ marginBottom: 24 }}>
          <Text
            accessibilityRole={'header' as AccessibilityRole}
            style={{
              color: '#FEF08A',
              fontSize: 18,
              fontWeight: '800',
              marginBottom: 12,
            }}
          >
            ⚙️ Display & Feedback
          </Text>

          <View
            style={{
              backgroundColor: '#1A1F2E',
              borderRadius: 14,
              borderWidth: 1,
              borderColor: '#374151',
              paddingHorizontal: 16,
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
                borderBottomColor: '#2D3748',
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: '#F8FAFC', fontSize: 16, fontWeight: '600' }}>
                  {t('settings.haptics')}
                </Text>
                <Text style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>
                  Vibrational confirmation on button selections
                </Text>
              </View>
              <Switch
                value={hapticsEnabled}
                onValueChange={setHapticsEnabled}
                trackColor={{ false: '#374151', true: '#FEF08A' }}
                thumbColor={hapticsEnabled ? '#0B0F19' : '#94A3B8'}
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
                borderBottomColor: '#2D3748',
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: '#F8FAFC', fontSize: 16, fontWeight: '600' }}>
                  {t('settings.autoSpeak')}
                </Text>
                <Text style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>
                  Immediately speak phrase upon selection
                </Text>
              </View>
              <Switch
                value={autoSpeak}
                onValueChange={setAutoSpeak}
                trackColor={{ false: '#374151', true: '#FEF08A' }}
                thumbColor={autoSpeak ? '#0B0F19' : '#94A3B8'}
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
                borderBottomColor: '#2D3748',
              }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: '#F8FAFC', fontSize: 16, fontWeight: '600' }}>
                  {t('settings.largeText')}
                </Text>
                <Text style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>
                  Increase UI typography scale across all screens
                </Text>
              </View>
              <Switch
                value={largeText}
                onValueChange={setLargeText}
                trackColor={{ false: '#374151', true: '#FEF08A' }}
                thumbColor={largeText ? '#0B0F19' : '#94A3B8'}
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
                <Text style={{ color: '#F8FAFC', fontSize: 16, fontWeight: '600' }}>
                  {t('settings.highContrast')}
                </Text>
                <Text style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>
                  WCAG 2.1 AAA high-contrast palette (#0B0F19 / #FEF08A)
                </Text>
              </View>
              <Switch
                value={highContrast}
                onValueChange={setHighContrast}
                trackColor={{ false: '#374151', true: '#FEF08A' }}
                thumbColor={highContrast ? '#0B0F19' : '#94A3B8'}
              />
            </View>
          </View>
        </View>

        {/* Section: Project Information & Disclosures */}
        <View
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 16,
            padding: 18,
            borderWidth: 1,
            borderColor: '#38BDF8',
          }}
        >
          <Text
            style={{
              color: '#38BDF8',
              fontSize: 14,
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
              color: '#F8FAFC',
              fontSize: 15,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            Theme: Swasth & Samavesh Bharat | Track A: Product / Technology
          </Text>
          <Text
            style={{
              color: '#94A3B8',
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
          <Text style={{ color: '#22C55E', fontSize: 12, fontWeight: '700' }}>
            ✓ 100% Offline-First (No internet required, Airplane Mode verified)
          </Text>
          <Text style={{ color: '#22C55E', fontSize: 12, fontWeight: '700' }}>
            ✓ Zero Cloud Transmission (DPDP Act Private)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
