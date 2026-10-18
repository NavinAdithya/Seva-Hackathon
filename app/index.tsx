import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  AccessibilityRole,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../src/store/useAppStore';
import { CATEGORIES } from '../src/constants/categories';
import { EmergencyTile } from '../src/components/ui/EmergencyTile';
import { Language, AssistanceMode } from '../src/types';
import { getCategoryLabel } from '../src/utils/textHelpers';
import { triggerSelection } from '../src/utils/haptics';

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

  const isModeActive = (mode: AssistanceMode) => assistanceModes.includes(mode);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
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
            marginBottom: 16,
          }}
        >
          <View>
            <Text
              accessibilityRole={'header' as AccessibilityRole}
              style={{
                fontSize: 28,
                fontWeight: '900',
                color: '#FEF08A',
                letterSpacing: 0.5,
              }}
            >
              SignSOS 🚨
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#94A3B8',
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
              backgroundColor: '#1A1F2E',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#374151',
            }}
          >
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Trilingual Language Selector Bar */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#1A1F2E',
            borderRadius: 14,
            padding: 4,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#2D3748',
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
                  language === item.code ? '#FEF08A' : 'transparent',
              }}
            >
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 15,
                  color: language === item.code ? '#0B0F19' : '#94A3B8',
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Assistance Modes (Multi-select) */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 13,
              color: '#94A3B8',
              marginBottom: 8,
              fontWeight: '600',
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
                    paddingHorizontal: 8,
                    borderRadius: 12,
                    backgroundColor: active ? '#252B3B' : '#141824',
                    borderWidth: 1.5,
                    borderColor: active ? '#FEF08A' : '#2D3748',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: active ? '700' : '500',
                      color: active ? '#FEF08A' : '#94A3B8',
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section Title */}
        <Text
          accessibilityRole={'header' as AccessibilityRole}
          style={{
            fontSize: largeText ? 24 : 20,
            fontWeight: '800',
            color: '#F8FAFC',
            marginBottom: 12,
            marginTop: 4,
          }}
        >
          {t('home.title')}
        </Text>

        {/* Emergency Category Tiles Grid */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -8,
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
        <View style={{ marginTop: 20, gap: 12 }}>
          {/* Emergency Card Quick Button */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="View or Edit Emergency Medical Card"
            onPress={() => router.push('/emergency-card')}
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 16,
              borderWidth: 1.5,
              borderColor: '#38BDF8',
              paddingVertical: 16,
              paddingHorizontal: 20,
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
                    color: '#F8FAFC',
                    fontSize: 17,
                    fontWeight: '700',
                  }}
                >
                  {t('home.emergencyCard')}
                </Text>
                <Text style={{ color: '#94A3B8', fontSize: 13 }}>
                  Offline Medical Profile & Contacts
                </Text>
              </View>
            </View>
            <Text style={{ color: '#38BDF8', fontSize: 20, fontWeight: 'bold' }}>
              →
            </Text>
          </TouchableOpacity>

          {/* Responder Mode Switcher */}
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Enter Responder Two-Way Clinician Handshake Mode"
            onPress={() => router.push('/responder')}
            style={{
              backgroundColor: '#1E3A5F',
              borderRadius: 16,
              borderWidth: 1.5,
              borderColor: '#60A5FA',
              paddingVertical: 16,
              paddingHorizontal: 20,
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
                    color: '#F8FAFC',
                    fontSize: 17,
                    fontWeight: '700',
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
