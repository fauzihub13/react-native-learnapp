import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing } from '../styles';

interface RadioProps {
  selected: boolean;
  onPress: () => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  borderColor?: string;
  labelPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const SIZE_MAP: Record<string, { outer: number; inner: number; fontSize: number }> = {
  sm: { outer: 20, inner: 10, fontSize: 14 },
  md: { outer: 24, inner: 12, fontSize: 16 },
  lg: { outer: 28, inner: 14, fontSize: 18 },
};

const Radio: React.FC<RadioProps> = ({
  selected,
  onPress,
  label,
  description,
  disabled = false,
  size = 'md',
  color = Colors.primary,
  borderColor,
  labelPosition = 'right',
  containerStyle,
  labelStyle,
}) => {
  const sizeStyle = SIZE_MAP[size];

  const resolvedBorder = selected
    ? color
    : borderColor || Colors.gray300;

  const renderRadio = () => (
    <View
      style={[
        styles.outer,
        {
          width: sizeStyle.outer,
          height: sizeStyle.outer,
          borderRadius: sizeStyle.outer / 2,
          borderWidth: 2,
          borderColor: resolvedBorder,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {selected && (
        <View
          style={[
            styles.inner,
            {
              width: sizeStyle.inner,
              height: sizeStyle.inner,
              borderRadius: sizeStyle.inner / 2,
              backgroundColor: color,
            },
          ]}
        />
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
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed && !disabled ? 0.7 : 1 },
        containerStyle,
      ]}
    >
      {labelPosition === 'left' && renderLabel()}
      {renderRadio()}
      {labelPosition === 'right' && renderLabel()}
    </Pressable>
  );
};

interface RadioGroupProps {
  options: { label: string; value: string; description?: string }[];
  selected: string | null;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selected,
  onChange,
  label,
  disabled = false,
  size = 'md',
  color = Colors.primary,
  error,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.groupLabel}>{label}</Text>}
      {options.map((option) => (
        <Radio
          key={option.value}
          selected={selected === option.value}
          onPress={() => onChange(option.value)}
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
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {},
  labelContainer: {
    flex: 1,
    marginHorizontal: Spacing.md,
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

export { RadioGroup };
export default Radio;
