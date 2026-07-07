import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../styles';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  borderColor?: string;
  borderRadius?: number;
  labelPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  error?: boolean;
}

const SIZE_MAP: Record<string, { box: number; fontSize: number; iconSize: number }> = {
  sm: { box: 20, fontSize: 14, iconSize: 14 },
  md: { box: 24, fontSize: 16, iconSize: 16 },
  lg: { box: 28, fontSize: 18, iconSize: 20 },
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  color = '#007AFF',
  borderColor,
  borderRadius = 6,
  labelPosition = 'right',
  containerStyle,
  labelStyle,
  error = false,
}) => {
  const sizeStyle = SIZE_MAP[size];

  const resolvedBorder = error
    ? '#FF3B30'
    : checked
    ? color
    : borderColor || '#D1D5DB';

  const resolvedBg = checked ? color : 'transparent';

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const renderBox = () => (
    <View
      style={[
        styles.box,
        {
          width: sizeStyle.box,
          height: sizeStyle.box,
          borderRadius,
          borderWidth: 2,
          borderColor: resolvedBorder,
          backgroundColor: resolvedBg,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {checked && (
        <Text style={[styles.checkmark, { fontSize: sizeStyle.iconSize }]}>
          ✓
        </Text>
      )}
    </View>
  );

  const renderLabel = () => {
    if (!label && !description) return null;
    return (
      <View style={styles.labelContainer}>
        {label && (
          <Text
            style={[
              styles.label,
              { fontSize: sizeStyle.fontSize },
              disabled && styles.disabledText,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
        {description && (
          <Text
            style={[
              styles.description,
              disabled && styles.disabledText,
            ]}
          >
            {description}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed && !disabled ? 0.7 : 1 },
        containerStyle,
      ]}
    >
      {labelPosition === 'left' && renderLabel()}
      {renderBox()}
      {labelPosition === 'right' && renderLabel()}
    </Pressable>
  );
};

interface CheckboxGroupProps {
  options: { label: string; value: string; description?: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selected,
  onChange,
  label,
  disabled = false,
  size = 'md',
  color = '#007AFF',
  error,
  containerStyle,
}) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.groupLabel}>{label}</Text>}
      {options.map((option) => (
        <Checkbox
          key={option.value}
          checked={selected.includes(option.value)}
          onChange={() => handleToggle(option.value)}
          label={option.label}
          description={option.description}
          disabled={disabled}
          size={size}
          color={color}
          containerStyle={styles.groupItem}
        />
      ))}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: 20,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  label: {
    color: Colors.gray700,
    fontWeight: Typography.fontWeight.medium,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  disabledText: {
    color: Colors.gray400,
  },
  groupLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.gray700,
    marginBottom: Spacing.md,
  },
  groupItem: {
    marginBottom: Spacing.md,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.danger,
    marginTop: Spacing.xs,
  },
});

export { CheckboxGroup };
export default Checkbox;
