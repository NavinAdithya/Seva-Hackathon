import React from 'react';
import { View, Text, AccessibilityRole } from 'react-native';

interface BillboardTextProps {
  message: string;
  icon?: string;
  language?: string;
  accessibilityLabel?: string;
}

export function BillboardText({
  message,
  icon,
  language,
  accessibilityLabel,
}: BillboardTextProps) {
  return (
    <View
      accessibilityRole={'text' as AccessibilityRole}
      accessibilityLabel={accessibilityLabel || message}
      style={{
        backgroundColor: '#0B0F19',
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#FEF08A',
        padding: 32,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
      }}
    >
      {icon && (
        <Text style={{ fontSize: 64, marginBottom: 16 }}>{icon}</Text>
      )}
      <Text
        style={{
          color: '#FEF08A',
          fontSize: 36,
          fontWeight: '800',
          textAlign: 'center',
          lineHeight: 48,
        }}
      >
        {message}
      </Text>
      {language && (
        <Text
          style={{
            color: '#94A3B8',
            fontSize: 14,
            marginTop: 12,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          {language}
        </Text>
      )}
    </View>
  );
}
