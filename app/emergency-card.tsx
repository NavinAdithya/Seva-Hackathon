import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  Share,
  SafeAreaView,
  AccessibilityRole,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../src/store/useAppStore';
import { getEmergencyCard, saveEmergencyCard } from '../src/db/queries';
import { EmergencyCard, EmergencyContact, Language, AssistanceMode } from '../src/types';
import { triggerSuccess, triggerSelection, triggerHeavy } from '../src/utils/haptics';
import { THEME } from '../src/constants/theme';

export default function EmergencyCardScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const assistanceModes = useAppStore((s) => s.assistanceModes);
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const largeText = useAppStore((s) => s.largeTextEnabled);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [conditions, setConditions] = useState('');
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Primary Contact (Family)', phone: '112', relationship: 'Family / Emergency' },
  ]);

  useEffect(() => {
    async function loadCard() {
      try {
        const card = await getEmergencyCard();
        if (card) {
          setName(card.name || '');
          setAge(card.age ? card.age.toString() : '');
          setBloodGroup(card.bloodGroup || '');
          setAllergies(card.allergies || '');
          setMedications(card.medications || '');
          setConditions(card.conditions || '');
          if (card.emergencyContacts && card.emergencyContacts.length > 0) {
            setContacts(card.emergencyContacts);
          }
        } else {
          // Default prefill for demo
          setName('Priya Sharma / பிரியா');
          setAge('26');
          setBloodGroup('O+ Positive');
          setAllergies('Penicillin, Dust');
          setMedications('Asthma Inhaler (Salbutamol)');
          setConditions('Non-speaking, Asthma');
        }
      } catch (e) {
        console.error('Failed to load emergency card:', e);
      }
    }
    loadCard();
  }, []);

  const handleSave = async () => {
    try {
      const card: EmergencyCard = {
        name,
        age: age ? parseInt(age, 10) : undefined,
        bloodGroup,
        allergies,
        medications,
        conditions,
        emergencyContacts: contacts,
        language,
        communicationPreference: assistanceModes,
      };
      await saveEmergencyCard(card);
      if (hapticsEnabled) await triggerSuccess();
      setIsEditing(false);
      Alert.alert('Saved', t('card.saved'));
    } catch (e) {
      console.error('Failed to save card:', e);
      Alert.alert('Error', 'Failed to save emergency card');
    }
  };

  const handleCall = async (phone: string) => {
    if (hapticsEnabled) await triggerHeavy();
    Linking.openURL(`tel:${phone}`);
  };

  const handleShareCard = async () => {
    if (hapticsEnabled) await triggerSelection();
    const payload = `🪪 EMERGENCY MEDICAL PROFILE (SignSOS - DPDP Act Private)\nName: ${name || 'N/A'}\nBlood Group: ${bloodGroup || 'N/A'}\nAge: ${age || 'N/A'}\nAllergies: ${allergies || 'None reported'}\nMedications: ${medications || 'None reported'}\nConditions: ${conditions || 'None reported'}\nPrimary Contact: ${contacts[0]?.phone || '112'}`;
    Share.share({
      title: 'SignSOS Emergency Medical Profile',
      message: payload,
    });
  };

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
                fontSize: 22,
                fontWeight: '900',
                color: THEME.colors.accent,
              }}
            >
              {t('card.title')}
            </Text>
            <Text style={{ fontSize: 12, color: THEME.colors.textSecondary, fontWeight: '500' }}>
              Offline Medical Profile (DPDP Act Private)
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            {/* Share Profile Button */}
            {!isEditing && (
              <TouchableOpacity
                accessibilityRole={'button' as AccessibilityRole}
                accessibilityLabel="Share Emergency Medical Card via SMS or Text"
                onPress={handleShareCard}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: THEME.colors.surface,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: THEME.colors.medical,
                }}
              >
                <Text style={{ color: THEME.colors.medical, fontWeight: '800', fontSize: 13 }}>
                  📤 Share
                </Text>
              </TouchableOpacity>
            )}

            {/* Edit / Cancel Toggle */}
            <TouchableOpacity
              accessibilityRole={'button' as AccessibilityRole}
              accessibilityLabel={isEditing ? 'Cancel Editing' : 'Edit Emergency Card'}
              onPress={async () => {
                if (hapticsEnabled) await triggerSelection();
                setIsEditing(!isEditing);
              }}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                backgroundColor: isEditing ? THEME.colors.accent : THEME.colors.surface,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: THEME.colors.accent,
              }}
            >
              <Text
                style={{
                  color: isEditing ? THEME.colors.accentOnHighVis : THEME.colors.accent,
                  fontWeight: '800',
                  fontSize: 13,
                }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency First Responder High-Vis Summary Banner */}
        <View
          style={{
            backgroundColor: THEME.colors.surface,
            borderRadius: THEME.borderRadius.card,
            padding: 18,
            borderWidth: 1.5,
            borderColor: THEME.colors.medical,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: THEME.colors.textMuted, fontSize: 12, fontWeight: '700' }}>
            PATIENT / IDENTIFIER
          </Text>
          <Text
            style={{
              color: THEME.colors.accent,
              fontSize: 26,
              fontWeight: '900',
              marginVertical: 4,
            }}
          >
            {name || 'Not specified'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              gap: 16,
              borderTopWidth: 1,
              borderTopColor: THEME.colors.hairline,
              paddingTop: 12,
            }}
          >
            <View>
              <Text style={{ color: THEME.colors.textSecondary, fontSize: 11, fontWeight: '600' }}>
                BLOOD GROUP
              </Text>
              <Text
                style={{
                  color: THEME.colors.emergencyCritical,
                  fontSize: 18,
                  fontWeight: '900',
                }}
              >
                {bloodGroup || 'Unknown'}
              </Text>
            </View>
            <View>
              <Text style={{ color: THEME.colors.textSecondary, fontSize: 11, fontWeight: '600' }}>
                AGE
              </Text>
              <Text
                style={{
                  color: THEME.colors.textPrimary,
                  fontSize: 18,
                  fontWeight: '900',
                }}
              >
                {age ? `${age} yrs` : 'Unknown'}
              </Text>
            </View>
            <View>
              <Text style={{ color: THEME.colors.textSecondary, fontSize: 11, fontWeight: '600' }}>
                PRIMARY LANG
              </Text>
              <Text
                style={{
                  color: THEME.colors.medical,
                  fontSize: 18,
                  fontWeight: '900',
                  textTransform: 'uppercase',
                }}
              >
                {language}
              </Text>
            </View>
          </View>
        </View>

        {/* View Mode: Structured Medical Fields */}
        {!isEditing ? (
          <View style={{ gap: 12 }}>
            {/* Allergies */}
            <View
              style={{
                backgroundColor: THEME.colors.surface,
                borderRadius: THEME.borderRadius.card,
                padding: 16,
                borderLeftWidth: 5,
                borderLeftColor: THEME.colors.emergencyCritical,
                borderWidth: 1,
                borderColor: THEME.colors.hairline,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 18, marginRight: 8 }}>⚠️</Text>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '800' }}>
                  {t('card.allergies')}
                </Text>
              </View>
              <Text style={{ color: THEME.colors.emergencyCritical, fontSize: 16, fontWeight: '700' }}>
                {allergies || 'No known allergies reported'}
              </Text>
            </View>

            {/* Medications */}
            <View
              style={{
                backgroundColor: THEME.colors.surface,
                borderRadius: THEME.borderRadius.card,
                padding: 16,
                borderLeftWidth: 5,
                borderLeftColor: THEME.colors.medical,
                borderWidth: 1,
                borderColor: THEME.colors.hairline,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 18, marginRight: 8 }}>💊</Text>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '800' }}>
                  {t('card.medications')}
                </Text>
              </View>
              <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '600' }}>
                {medications || 'No current medications reported'}
              </Text>
            </View>

            {/* Medical Conditions */}
            <View
              style={{
                backgroundColor: THEME.colors.surface,
                borderRadius: THEME.borderRadius.card,
                padding: 16,
                borderLeftWidth: 5,
                borderLeftColor: THEME.colors.warning,
                borderWidth: 1,
                borderColor: THEME.colors.hairline,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 18, marginRight: 8 }}>📋</Text>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '800' }}>
                  {t('card.conditions')}
                </Text>
              </View>
              <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '600' }}>
                {conditions || 'No chronic conditions reported'}
              </Text>
            </View>

            {/* Emergency Contacts with 1-Tap Dial */}
            <View
              style={{
                backgroundColor: THEME.colors.surface,
                borderRadius: THEME.borderRadius.card,
                padding: 16,
                borderWidth: 1,
                borderColor: THEME.colors.hairline,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 18, marginRight: 8 }}>📞</Text>
                <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '800' }}>
                  {t('card.contacts')}
                </Text>
              </View>

              {contacts.map((contact) => (
                <View
                  key={contact.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderTopColor: THEME.colors.hairline,
                  }}
                >
                  <View>
                    <Text style={{ color: THEME.colors.textPrimary, fontSize: 15, fontWeight: '700' }}>
                      {contact.name}
                    </Text>
                    <Text style={{ color: THEME.colors.textSecondary, fontSize: 13 }}>
                      {contact.phone} • {contact.relationship}
                    </Text>
                  </View>

                  <TouchableOpacity
                    accessibilityRole={'button' as AccessibilityRole}
                    accessibilityLabel={`Call emergency contact ${contact.name}`}
                    onPress={() => handleCall(contact.phone)}
                    style={{
                      backgroundColor: THEME.colors.emergencyCritical,
                      paddingVertical: 8,
                      paddingHorizontal: 14,
                      borderRadius: THEME.borderRadius.chip,
                    }}
                  >
                    <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 13 }}>
                      📞 Call
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ) : (
          /* Edit Mode: Input Fields */
          <View style={{ gap: 12 }}>
            <View>
              <Text style={{ color: THEME.colors.textSecondary, marginBottom: 4, fontWeight: '600' }}>
                Full Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  color: THEME.colors.textPrimary,
                  borderWidth: 1,
                  borderColor: THEME.colors.hairlineStrong,
                  fontSize: 16,
                }}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: THEME.colors.textSecondary, marginBottom: 4, fontWeight: '600' }}>
                  Age
                </Text>
                <TextInput
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderRadius: 12,
                    padding: 12,
                    color: THEME.colors.textPrimary,
                    borderWidth: 1,
                    borderColor: THEME.colors.hairlineStrong,
                    fontSize: 16,
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: THEME.colors.textSecondary, marginBottom: 4, fontWeight: '600' }}>
                  Blood Group
                </Text>
                <TextInput
                  value={bloodGroup}
                  onChangeText={setBloodGroup}
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderRadius: 12,
                    padding: 12,
                    color: THEME.colors.textPrimary,
                    borderWidth: 1,
                    borderColor: THEME.colors.hairlineStrong,
                    fontSize: 16,
                  }}
                />
              </View>
            </View>

            <View>
              <Text style={{ color: THEME.colors.textSecondary, marginBottom: 4, fontWeight: '600' }}>
                Allergies
              </Text>
              <TextInput
                value={allergies}
                onChangeText={setAllergies}
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  color: THEME.colors.textPrimary,
                  borderWidth: 1,
                  borderColor: THEME.colors.hairlineStrong,
                  fontSize: 16,
                }}
              />
            </View>

            <View>
              <Text style={{ color: THEME.colors.textSecondary, marginBottom: 4, fontWeight: '600' }}>
                Current Medications
              </Text>
              <TextInput
                value={medications}
                onChangeText={setMedications}
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  color: THEME.colors.textPrimary,
                  borderWidth: 1,
                  borderColor: THEME.colors.hairlineStrong,
                  fontSize: 16,
                }}
              />
            </View>

            <View>
              <Text style={{ color: THEME.colors.textSecondary, marginBottom: 4, fontWeight: '600' }}>
                Chronic Conditions
              </Text>
              <TextInput
                value={conditions}
                onChangeText={setConditions}
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  color: THEME.colors.textPrimary,
                  borderWidth: 1,
                  borderColor: THEME.colors.hairlineStrong,
                  fontSize: 16,
                }}
              />
            </View>

            <TouchableOpacity
              accessibilityRole={'button' as AccessibilityRole}
              accessibilityLabel="Save Emergency Card Details"
              onPress={handleSave}
              style={{
                backgroundColor: THEME.colors.accent,
                borderRadius: 14,
                paddingVertical: 16,
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Text style={{ color: THEME.colors.accentOnHighVis, fontSize: 18, fontWeight: '900' }}>
                💾 Save Card
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
