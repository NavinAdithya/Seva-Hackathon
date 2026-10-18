import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  SafeAreaView,
  AccessibilityRole,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../src/store/useAppStore';
import { getEmergencyCard, saveEmergencyCard } from '../src/db/queries';
import { EmergencyCard, EmergencyContact, Language, AssistanceMode } from '../src/types';
import { triggerSuccess, triggerSelection } from '../src/utils/haptics';

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
          // Default prefill for testing/demo
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
    if (hapticsEnabled) await triggerSelection();
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Badge */}
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
              style={{
                color: '#38BDF8',
                fontSize: 13,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Offline Medical Profile (DPDP Act Private)
            </Text>
            <Text
              accessibilityRole={'header' as AccessibilityRole}
              style={{
                color: '#F8FAFC',
                fontSize: 24,
                fontWeight: '900',
              }}
            >
              🪪 {t('card.title')}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            style={{
              backgroundColor: isEditing ? '#22C55E' : '#252B3B',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: isEditing ? '#22C55E' : '#4B5563',
            }}
          >
            <Text
              style={{
                color: isEditing ? '#0B0F19' : '#FEF08A',
                fontWeight: '700',
                fontSize: 14,
              }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emergency First Responder High-Vis Summary Banner */}
        <View
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 16,
            padding: 20,
            borderWidth: 2,
            borderColor: '#38BDF8',
            marginBottom: 20,
          }}
        >
          <Text style={{ color: '#94A3B8', fontSize: 13, fontWeight: '600' }}>
            PATIENT / IDENTIFIER
          </Text>
          <Text
            style={{
              color: '#FEF08A',
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
              borderTopColor: '#334155',
              paddingTop: 12,
            }}
          >
            <View>
              <Text style={{ color: '#94A3B8', fontSize: 12 }}>BLOOD GROUP</Text>
              <Text
                style={{
                  color: '#EF4444',
                  fontSize: 18,
                  fontWeight: '800',
                }}
              >
                {bloodGroup || 'Unknown'}
              </Text>
            </View>
            <View>
              <Text style={{ color: '#94A3B8', fontSize: 12 }}>AGE</Text>
              <Text
                style={{
                  color: '#F8FAFC',
                  fontSize: 18,
                  fontWeight: '800',
                }}
              >
                {age ? `${age} yrs` : 'Unknown'}
              </Text>
            </View>
            <View>
              <Text style={{ color: '#94A3B8', fontSize: 12 }}>LANGUAGE</Text>
              <Text
                style={{
                  color: '#38BDF8',
                  fontSize: 18,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                }}
              >
                {language}
              </Text>
            </View>
          </View>
        </View>

        {/* Medical Critical Information Cards */}
        <View style={{ gap: 14 }}>
          {/* Allergies */}
          <View
            style={{
              backgroundColor: '#1A1F2E',
              borderRadius: 14,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#EF4444',
            }}
          >
            <Text
              style={{
                color: '#FCA5A5',
                fontSize: 13,
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              ⚠️ {t('card.allergies')}
            </Text>
            {isEditing ? (
              <TextInput
                value={allergies}
                onChangeText={setAllergies}
                placeholder="e.g. Penicillin, Peanuts"
                placeholderTextColor="#64748B"
                style={{
                  color: '#F8FAFC',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#64748B',
                  paddingVertical: 6,
                  marginTop: 6,
                }}
              />
            ) : (
              <Text
                style={{
                  color: '#F8FAFC',
                  fontSize: 17,
                  fontWeight: '600',
                  marginTop: 4,
                }}
              >
                {allergies || 'None declared'}
              </Text>
            )}
          </View>

          {/* Current Medications */}
          <View
            style={{
              backgroundColor: '#1A1F2E',
              borderRadius: 14,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#3B82F6',
            }}
          >
            <Text
              style={{
                color: '#93C5FD',
                fontSize: 13,
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              💊 {t('card.medications')}
            </Text>
            {isEditing ? (
              <TextInput
                value={medications}
                onChangeText={setMedications}
                placeholder="e.g. Asthma Inhaler"
                placeholderTextColor="#64748B"
                style={{
                  color: '#F8FAFC',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#64748B',
                  paddingVertical: 6,
                  marginTop: 6,
                }}
              />
            ) : (
              <Text
                style={{
                  color: '#F8FAFC',
                  fontSize: 17,
                  fontWeight: '600',
                  marginTop: 4,
                }}
              >
                {medications || 'None declared'}
              </Text>
            )}
          </View>

          {/* Chronic Conditions */}
          <View
            style={{
              backgroundColor: '#1A1F2E',
              borderRadius: 14,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#F59E0B',
            }}
          >
            <Text
              style={{
                color: '#FCD34D',
                fontSize: 13,
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              📋 {t('card.conditions')}
            </Text>
            {isEditing ? (
              <TextInput
                value={conditions}
                onChangeText={setConditions}
                placeholder="e.g. Non-speaking, Asthma, Diabetes"
                placeholderTextColor="#64748B"
                style={{
                  color: '#F8FAFC',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#64748B',
                  paddingVertical: 6,
                  marginTop: 6,
                }}
              />
            ) : (
              <Text
                style={{
                  color: '#F8FAFC',
                  fontSize: 17,
                  fontWeight: '600',
                  marginTop: 4,
                }}
              >
                {conditions || 'None declared'}
              </Text>
            )}
          </View>

          {/* Edit Mode Inputs for Name & Blood Group */}
          {isEditing && (
            <View
              style={{
                backgroundColor: '#1A1F2E',
                borderRadius: 14,
                padding: 16,
                gap: 12,
              }}
            >
              <View>
                <Text style={{ color: '#94A3B8', fontSize: 13 }}>Full Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={{
                    color: '#F8FAFC',
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#64748B',
                    paddingVertical: 4,
                  }}
                />
              </View>
              <View>
                <Text style={{ color: '#94A3B8', fontSize: 13 }}>Age</Text>
                <TextInput
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  style={{
                    color: '#F8FAFC',
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#64748B',
                    paddingVertical: 4,
                  }}
                />
              </View>
              <View>
                <Text style={{ color: '#94A3B8', fontSize: 13 }}>
                  Blood Group (e.g. O+, A+, B+, AB-)
                </Text>
                <TextInput
                  value={bloodGroup}
                  onChangeText={setBloodGroup}
                  style={{
                    color: '#F8FAFC',
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#64748B',
                    paddingVertical: 4,
                  }}
                />
              </View>
            </View>
          )}

          {/* Emergency Contacts Section */}
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: '#FEF08A',
                fontSize: 16,
                fontWeight: '800',
                marginBottom: 10,
              }}
            >
              📞 {t('card.contacts')}
            </Text>

            {contacts.map((contact) => (
              <View
                key={contact.id}
                style={{
                  backgroundColor: '#1A1F2E',
                  borderRadius: 14,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: '#374151',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: '#F8FAFC',
                      fontSize: 17,
                      fontWeight: '700',
                    }}
                  >
                    {contact.name}
                  </Text>
                  <Text style={{ color: '#94A3B8', fontSize: 14, marginTop: 2 }}>
                    {contact.phone} • {contact.relationship}
                  </Text>
                </View>

                <TouchableOpacity
                  accessibilityRole={'button' as AccessibilityRole}
                  accessibilityLabel={`Call ${contact.name} at ${contact.phone}`}
                  onPress={() => handleCall(contact.phone)}
                  style={{
                    backgroundColor: '#22C55E',
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#0B0F19',
                      fontWeight: '800',
                      fontSize: 15,
                    }}
                  >
                    📞 Call
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Save Button */}
        {isEditing && (
          <TouchableOpacity
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel={t('card.save')}
            onPress={handleSave}
            style={{
              backgroundColor: '#FEF08A',
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: '#0B0F19',
                fontSize: 18,
                fontWeight: '900',
              }}
            >
              💾 {t('card.save')}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
