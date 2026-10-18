import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, AccessibilityRole } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { triggerSelection } from '../../utils/haptics';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'emergency' | 'outline';
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  fullWidth?: boolean;
}

const VARIANT_STYLES = {
  primary: {
    bg: '#FEF08A',
    text: '#0B0F19',
    border: '#FEF08A',
  },
  secondary: {
    bg: '#252B3B',
    text: '#F8FAFC',
    border: '#374151',
  },
  emergency: {
    bg: '#EF4444',
    text: '#FFFFFF',
    border: '#EF4444',
  },
  outline: {
    bg: 'transparent',
    text: '#FEF08A',
    border: '#FEF08A',
  },
};

export function ActionButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  accessibilityLabel,
  testID,
  fullWidth = false,
}: ActionButtonProps) {
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);
  const largeText = useAppStore((s) => s.largeTextEnabled);
  const style = VARIANT_STYLES[variant];

  const handlePress = async () => {
    if (disabled || loading) return;
    if (hapticsEnabled) await triggerSelection();
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole={'button' as AccessibilityRole}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
      activeOpacity={0.7}
      style={{
        backgroundColor: style.bg,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: style.border,
        paddingVertical: 16,
        paddingHorizontal: 24,
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
        alignSelf: fullWidth ? 'stretch' : 'auto',
      }}
    >
      {loading ? (
        <ActivityIndicator color={style.text} />
      ) : (
        <>
          {icon && (
            <Text style={{ fontSize: 24, marginRight: 8 }}>{icon}</Text>
          )}
          <Text
            style={{
              color: style.text,
              fontSize: largeText ? 20 : 17,
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
