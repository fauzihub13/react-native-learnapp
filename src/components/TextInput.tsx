import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../styles';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  variant?: 'outline' | 'filled' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  borderColor?: string;
  focusColor?: string;
  errorColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

const SIZE_STYLES: Record<string, { height: number; fontSize: number; paddingHorizontal: number; labelSize: number }> = {
  sm: { height: 40, fontSize: 14, paddingHorizontal: 12, labelSize: 12 },
  md: { height: 48, fontSize: 16, paddingHorizontal: 16, labelSize: 14 },
  lg: { height: 56, fontSize: 18, paddingHorizontal: 20, labelSize: 16 },
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  multiline = false,
  numberOfLines = 1,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  isPassword = false,
  variant = 'outline',
  size = 'md',
  borderColor = Colors.gray300,
  focusColor = Colors.primary,
  errorColor = Colors.danger,
  backgroundColor,
  borderRadius = BorderRadius.lg,
  keyboardType,
  onBlur,
  onFocus,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const sizeStyle = SIZE_STYLES[size];
  const isNumeric = keyboardType === 'numeric' || keyboardType === 'number-pad' || keyboardType === 'decimal-pad';

  const resolvedBorderColor = error
    ? errorColor
    : isFocused
    ? focusColor
    : borderColor;

  const resolvedBg =
    variant === 'filled'
      ? backgroundColor || Colors.secondary
      : backgroundColor || 'transparent';

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    if (isNumeric) {
      const filtered = keyboardType === 'decimal-pad'
        ? text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        : text.replace(/[^0-9]/g, '');
      onChangeText(filtered);
    } else {
      onChangeText(text);
    }
  };

  const getContainerStyle = (): ViewStyle => {
    const minHeight = sizeStyle.height;
    const multilineHeight = minHeight + (numberOfLines - 1) * 24;

    const base: ViewStyle = {
      borderWidth: variant === 'underline' ? 0 : 1.5,
      borderBottomWidth: 1.5,
      borderColor: resolvedBorderColor,
      borderRadius: variant === 'underline' ? 0 : borderRadius,
      backgroundColor: resolvedBg,
      minHeight: multiline ? multilineHeight : minHeight,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      paddingVertical: multiline ? 12 : 0,
      opacity: disabled ? 0.5 : 1,
    };

    if (!multiline) {
      base.height = minHeight;
      base.flexDirection = 'row';
      base.alignItems = 'center';
    }

    return base;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={[styles.label, { fontSize: sizeStyle.labelSize }, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={getContainerStyle()}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        <RNTextInput
          style={[
            styles.input,
            {
              fontSize: sizeStyle.fontSize,
              color: disabled ? Colors.gray400 : Colors.textPrimary,
              textAlignVertical: multiline ? 'top' : 'center',
            },
            inputStyle,
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray400}
          editable={!disabled}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconRight}
          >
            <Text style={styles.passwordToggle}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </Pressable>
        )}

        {rightIcon && !isPassword && (
          <View style={styles.iconRight}>{rightIcon}</View>
        )}
      </View>

      {(error || helperText) && (
        <Text
          style={[
            styles.helper,
            { fontSize: sizeStyle.labelSize - 1 },
            error ? { color: errorColor } : { color: '#6B7280' },
            errorStyle,
          ]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0,
  },
  label: {
    color: Colors.gray700,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 6,
  },
  required: {
    color: Colors.danger,
  },
  input: {
    flex: 1,
    padding: 0,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  helper: {
    marginTop: 4,
  },
  passwordToggle: {
    fontSize: 18,
  },
});

export default TextInput;
