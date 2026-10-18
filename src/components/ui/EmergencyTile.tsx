import React from 'react';
import { TouchableOpacity, Text, AccessibilityRole } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { triggerSelection } from '../../utils/haptics';

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
      testID={testID}
      activeOpacity={0.7}
      style={{
        backgroundColor: bgColor,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: color,
        padding: 20,
        minHeight: 140,
        minWidth: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 8,
      }}
    >
      <Text style={{ fontSize: 48, marginBottom: 8 }}>{icon}</Text>
      <Text
        style={{
          color: '#F8FAFC',
          fontSize: largeText ? 22 : 17,
          fontWeight: '700',
          textAlign: 'center',
        }}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
