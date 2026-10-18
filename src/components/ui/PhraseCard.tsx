import React from 'react';
import { TouchableOpacity, Text, AccessibilityRole } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { triggerSelection } from '../../utils/haptics';

interface PhraseCardProps {
  icon: string;
  text: string;
  severity: string;
  onPress: () => void;
  accessibilityLabel: string;
  testID?: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  low: '#22C55E',
  medium: '#F59E0B',
  high: '#EF4444',
  critical: '#DC2626',
};

export function PhraseCard({
  icon,
  text,
  severity,
  onPress,
  accessibilityLabel,
  testID,
}: PhraseCardProps) {
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const largeText = useAppStore((s) => s.largeTextEnabled);

  const handlePress = async () => {
    if (hapticsEnabled) await triggerSelection();
    onPress();
  };

  const severityColor = SEVERITY_COLORS[severity] || SEVERITY_COLORS.medium;

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityRole={'button' as AccessibilityRole}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      activeOpacity={0.7}
      style={{
        backgroundColor: '#1A1F2E',
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: severityColor,
        padding: 20,
        marginVertical: 6,
        marginHorizontal: 4,
        minHeight: 72,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 32, marginRight: 16 }}>{icon}</Text>
      <Text
        style={{
          color: '#F8FAFC',
          fontSize: largeText ? 22 : 18,
          fontWeight: '600',
          flex: 1,
        }}
        numberOfLines={3}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
