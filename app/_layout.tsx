import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { seedDatabase } from '../src/db/seed';
import { useAppStore } from '../src/store/useAppStore';
import '../src/i18n'; // initialize i18n
import i18n from '../src/i18n';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const setDbReady = useAppStore((s) => s.setDbReady);
  const language = useAppStore((s) => s.language);

  useEffect(() => {
    async function init() {
      try {
        await seedDatabase();
        setDbReady(true);
      } catch (e) {
        console.error('Failed to initialize and seed database:', e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0B0F19',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#FEF08A" />
        <Text
          style={{
            color: '#F8FAFC',
            marginTop: 16,
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          SignSOS Loading...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0B0F19',
          },
          headerTintColor: '#FEF08A',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          contentStyle: {
            backgroundColor: '#0B0F19',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="symptoms/[categoryId]"
          options={{
            title: 'Emergency Phrases',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="billboard"
          options={{
            title: 'Responder Billboard',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="responder"
          options={{
            title: 'Two-Way Communication',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="emergency-card"
          options={{
            title: 'Emergency Medical Card',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings & Accessibility',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
