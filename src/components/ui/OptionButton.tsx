import React from 'react';
import { TouchableOpacity, Text, AccessibilityRole } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { triggerSelection } from '../../utils/haptics';

interface OptionButtonProps {
  text: string;
  icon?: string;
  selected?: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
}

export function OptionButton({
  text,
  icon,
  selected = false,
  onPress,
  accessibilityLabel,
  testID,
}: OptionButtonProps) {
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
      accessibilityLabel={accessibilityLabel || text}
      accessibilityState={{ selected }}
      testID={testID}
      activeOpacity={0.7}
      style={{
        backgroundColor: selected ? '#252B3B' : '#1A1F2E',
        borderRadius: 14,
        borderWidth: 2,
        borderColor: selected ? '#FEF08A' : '#374151',
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginVertical: 4,
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {icon && (
        <Text style={{ fontSize: 24, marginRight: 12 }}>{icon}</Text>
      )}
      <Text
        style={{
          color: selected ? '#FEF08A' : '#F8FAFC',
          fontSize: largeText ? 20 : 17,
          fontWeight: selected ? '700' : '500',
          flex: 1,
        }}
      >
        {text}
      </Text>
      {selected && (
        <Text style={{ fontSize: 20, marginLeft: 8, color: '#FEF08A' }}>✓</Text>
      )}
    </TouchableOpacity>
  );
}
