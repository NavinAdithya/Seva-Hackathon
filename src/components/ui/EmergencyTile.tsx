import React from 'react';
import { TouchableOpacity, Text, View, AccessibilityRole } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { triggerSelection } from '../../utils/haptics';
import { THEME } from '../../constants/theme';

interface EmergencyTileProps {
  icon: string;
  label: string;
  color: string;
  bgColor: string;
  onPress: () => void;
  accessibilityLabel: string;
  testID?: string;
}

export function EmergencyTile({
  icon,
  label,
  color,
  bgColor,
  onPress,
  accessibilityLabel,
  testID,
}: EmergencyTileProps) {
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const largeText = useAppStore((s) => s.largeTextEnabled);

  const handlePress = async () => {
    if (hapticsEnabled) await triggerSelection();
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityRole={'button' as AccessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Double tap to open emergency phrases for this situation"
      testID={testID}
      activeOpacity={0.75}
      style={{
        backgroundColor: bgColor,
        borderRadius: THEME.borderRadius.tile,
        borderWidth: 2,
        borderColor: color,
        padding: 16,
        minHeight: 140,
        minWidth: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 6,
      }}
    >
      <Text style={{ fontSize: 44, marginBottom: 8 }}>{icon}</Text>
      <Text
        style={{
          color: THEME.colors.textPrimary,
          fontSize: largeText ? 20 : 16,
          fontWeight: '800',
          textAlign: 'center',
          lineHeight: 22,
        }}
        numberOfLines={2}
      >
        {label}
      </Text>
      {/* Visual accessibility pill */}
      <View
        style={{
          marginTop: 8,
          width: 24,
          height: 3,
          borderRadius: 2,
          backgroundColor: color,
        }}
      />
    </TouchableOpacity>
  );
}
