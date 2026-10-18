import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  AccessibilityRole,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../src/store/useAppStore';
import { CATEGORIES } from '../src/constants/categories';
import { EmergencyTile } from '../src/components/ui/EmergencyTile';
import { Language, AssistanceMode } from '../src/types';
import { getCategoryLabel } from '../src/utils/textHelpers';
import { triggerSelection, triggerHeavy } from '../src/utils/haptics';
import { THEME } from '../src/constants/theme';

export default function EmergencyGatewayScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const assistanceModes = useAppStore((s) => s.assistanceModes);
  const toggleAssistanceMode = useAppStore((s) => s.toggleAssistanceMode);
  const setSelectedCategory = useAppStore((s) => s.setSelectedCategory);
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const largeText = useAppStore((s) => s.largeTextEnabled);

  const handleLanguageChange = async (lang: Language) => {
    if (hapticsEnabled) await triggerSelection();
    setLanguage(lang);
  };

  const handleCategoryPress = async (categoryId: any) => {
    setSelectedCategory(categoryId);
    router.push({
      pathname: '/symptoms/[categoryId]',
      params: { categoryId },
    });
  };

  const handleCall112 = async () => {
    if (hapticsEnabled) await triggerHeavy();
    Linking.openURL('tel:112');
  };

  const isModeActive = (mode: AssistanceMode) => assistanceModes.includes(mode);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.canvas }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <View>
            <Text
              accessibilityRole={'header' as AccessibilityRole}
              style={{
                fontSize: 28,
                fontWeight: '900',
                color: THEME.colors.accent,
                letterSpacing: 0.5,
              }}
            >
              SignSOS 🚨
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: THEME.colors.textSecondary,
                fontWeight: '500',
              }}
            >
              {t('app.tagline')}
            </Text>
          </View>

          {/* Settings Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Open Settings and Accessibility Options"
            onPress={() => router.push('/settings')}
            style={{
              padding: 10,
              backgroundColor: THEME.colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: THEME.colors.hairline,
            }}
          >
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Offline & Security Status Badge */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: 8,
            paddingVertical: 4,
            paddingHorizontal: 10,
            marginBottom: 14,
            alignSelf: 'flex-start',
            borderWidth: 1,
            borderColor: 'rgba(16, 185, 129, 0.3)',
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: THEME.colors.success,
              marginRight: 6,
            }}
          />
          <Text
            style={{
              color: THEME.colors.success,
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.3,
            }}
          >
            100% OFFLINE-READY • DPDP PRIVATE
          </Text>
        </View>

        {/* Trilingual Language Selector Bar */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: THEME.colors.surface,
            borderRadius: 14,
            padding: 4,
            marginBottom: 14,
            borderWidth: 1,
            borderColor: THEME.colors.hairline,
          }}
        >
          {(
            [
              { code: 'en', label: 'English' },
              { code: 'ta', label: 'தமிழ்' },
              { code: 'hi', label: 'हिंदी' },
            ] as const
          ).map((item) => (
            <TouchableOpacity
              key={item.code}
              accessibilityRole={'button' as AccessibilityRole}
              accessibilityLabel={`Select language ${item.label}`}
              accessibilityState={{ selected: language === item.code }}
              onPress={() => handleLanguageChange(item.code)}
              style={{
                flex: 1,
                paddingVertical: 10,
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
                  fontSize: 15,
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

        {/* Assistance Preferences (Multi-select) */}
        <View style={{ marginBottom: 14 }}>
          <Text
            style={{
              fontSize: 12,
              color: THEME.colors.textMuted,
              marginBottom: 8,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Assistance Preferences
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {(
              [
                { mode: 'vision' as AssistanceMode, label: 'Vision 👁️' },
                { mode: 'hearing' as AssistanceMode, label: 'Hearing 🦻' },
                { mode: 'speech' as AssistanceMode, label: 'Speech 🗣️' },
              ] as const
            ).map((item) => {
              const active = isModeActive(item.mode);
              return (
                <TouchableOpacity
                  key={item.mode}
                  accessibilityRole={'button' as AccessibilityRole}
                  accessibilityLabel={`Toggle ${item.label} mode`}
                  accessibilityState={{ selected: active }}
                  onPress={async () => {
                    if (hapticsEnabled) await triggerSelection();
                    toggleAssistanceMode(item.mode);
                  }}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 6,
                    borderRadius: THEME.borderRadius.chip,
                    backgroundColor: active
                      ? THEME.colors.surfaceElevated
                      : THEME.colors.surface,
                    borderWidth: 1.5,
                    borderColor: active
                      ? THEME.colors.accent
                      : THEME.colors.hairline,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: active ? '800' : '600',
                      color: active
                        ? THEME.colors.accent
                        : THEME.colors.textSecondary,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Urgent 1-Tap SOS Dial 112 Bar */}
        <TouchableOpacity
          accessibilityRole={'button' as AccessibilityRole}
          accessibilityLabel="Emergency SOS: Instant call to National Emergency 112"
          onPress={handleCall112}
          activeOpacity={0.8}
          style={{
            backgroundColor: THEME.colors.emergencyCriticalBg,
            borderWidth: 2,
            borderColor: THEME.colors.emergencyCritical,
            borderRadius: THEME.borderRadius.card,
            paddingVertical: 14,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 26, marginRight: 10 }}>🚨</Text>
            <View>
              <Text
                style={{
                  color: THEME.colors.emergencyCritical,
                  fontSize: 16,
                  fontWeight: '900',
                  letterSpacing: 0.5,
                }}
              >
                CALL 112 NATIONAL SOS
              </Text>
              <Text
                style={{
                  color: THEME.colors.textSecondary,
                  fontSize: 12,
                  fontWeight: '500',
                }}
              >
                1-tap direct emergency phone dialer
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: THEME.colors.emergencyCritical,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: THEME.borderRadius.pill,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: '900',
              }}
            >
              DIAL
            </Text>
          </View>
        </TouchableOpacity>

        {/* Section Title */}
        <Text
          accessibilityRole={'header' as AccessibilityRole}
          style={{
            fontSize: largeText ? 24 : 20,
            fontWeight: '800',
            color: THEME.colors.textPrimary,
            marginBottom: 10,
          }}
        >
          {t('home.title')}
        </Text>

        {/* Emergency Category Tiles Grid */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -6,
          }}
        >
          {CATEGORIES.map((category) => (
            <View key={category.id} style={{ width: '50%' }}>
              <EmergencyTile
                icon={category.icon}
                label={getCategoryLabel(category, language)}
                color={category.color}
                bgColor={category.bgColor}
                onPress={() => handleCategoryPress(category.id)}
                accessibilityLabel={t('a11y.emergencyCategory', {
                  name: getCategoryLabel(category, language),
                })}
              />
            </View>
          ))}
        </View>

        {/* Bottom Fast Action Buttons */}
        <View style={{ marginTop: 18, gap: 12 }}>
          {/* Emergency Card Quick Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="View or Edit Emergency Medical Card"
            onPress={() => router.push('/emergency-card')}
            activeOpacity={0.8}
            style={{
              backgroundColor: THEME.colors.surface,
              borderRadius: THEME.borderRadius.card,
              borderWidth: 1.5,
              borderColor: THEME.colors.medical,
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 28, marginRight: 12 }}>🪪</Text>
              <View>
                <Text
                  style={{
                    color: THEME.colors.textPrimary,
                    fontSize: 17,
                    fontWeight: '800',
                  }}
                >
                  {t('home.emergencyCard')}
                </Text>
                <Text style={{ color: THEME.colors.textSecondary, fontSize: 13 }}>
                  Offline Medical Profile & Contacts
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: THEME.colors.medical,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              →
            </Text>
          </TouchableOpacity>

          {/* Responder Mode Switcher */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Enter Responder Two-Way Clinician Handshake Mode"
            onPress={() => router.push('/responder')}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#16233B',
              borderRadius: THEME.borderRadius.card,
              borderWidth: 1.5,
              borderColor: '#60A5FA',
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 28, marginRight: 12 }}>🤝</Text>
              <View>
                <Text
                  style={{
                    color: THEME.colors.textPrimary,
                    fontSize: 17,
                    fontWeight: '800',
                  }}
                >
                  {t('home.responderMode')}
                </Text>
                <Text style={{ color: '#93C5FD', fontSize: 13 }}>
                  Two-Way Handshake for Paramedics & Nurses
                </Text>
              </View>
            </View>
            <Text style={{ color: '#60A5FA', fontSize: 20, fontWeight: 'bold' }}>
              →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
