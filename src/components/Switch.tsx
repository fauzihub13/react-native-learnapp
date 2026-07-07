import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing } from '../styles';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  labelPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const SIZE_MAP: Record<string, { width: number; height: number; thumb: number; translate: number }> = {
  sm: { width: 40, height: 24, thumb: 18, translate: 18 },
  md: { width: 50, height: 30, thumb: 24, translate: 22 },
  lg: { width: 60, height: 36, thumb: 30, translate: 26 },
};

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  description,
  disabled = false,
  size = 'md',
  activeColor = Colors.primary,
  inactiveColor = Colors.gray300,
  thumbColor = Colors.white,
  labelPosition = 'right',
  containerStyle,
  labelStyle,
}) => {
  const sizeStyle = SIZE_MAP[size];
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, sizeStyle.translate],
  });

  const bgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const renderTrack = () => (
    <Animated.View
      style={[
        styles.track,
        {
          width: sizeStyle.width,
          height: sizeStyle.height,
          borderRadius: sizeStyle.height / 2,
          backgroundColor: bgColor,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            width: sizeStyle.thumb,
            height: sizeStyle.thumb,
            borderRadius: sizeStyle.thumb / 2,
            backgroundColor: thumbColor,
            transform: [{ translateX }],
          },
        ]}
      />
    </Animated.View>
  );

  const renderLabel = () => {
    if (!label && !description) return null;
    return (
      <View style={styles.labelContainer}>
        {label && (
          <Text
            style={[
              styles.label,
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
      {renderTrack()}
      {labelPosition === 'right' && renderLabel()}
    </Pressable>
  );
};

interface SwitchGroupProps {
  options: { label: string; value: string; description?: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  containerStyle?: ViewStyle;
}

const SwitchGroup: React.FC<SwitchGroupProps> = ({
  options,
  selected,
  onChange,
  label,
  disabled = false,
  size = 'md',
  activeColor = Colors.primary,
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
        <Switch
          key={option.value}
          value={selected.includes(option.value)}
          onValueChange={() => handleToggle(option.value)}
          label={option.label}
          description={option.description}
          disabled={disabled}
          size={size}
          activeColor={activeColor}
          containerStyle={styles.groupItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.base,
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
});

export { SwitchGroup };
export default Switch;
