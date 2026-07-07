import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  textColor?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const VARIANT_COLORS: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary: { bg: '#007AFF', text: '#FFFFFF', border: '#007AFF' },
  secondary: { bg: '#F2F2F7', text: '#000000', border: '#F2F2F7' },
  outline: { bg: 'transparent', text: '#007AFF', border: '#007AFF' },
  ghost: { bg: 'transparent', text: '#007AFF', border: 'transparent' },
};

const SIZE_STYLES: Record<ButtonSize, { height: number; fontSize: number; paddingHorizontal: number }> = {
  sm: { height: 36, fontSize: 14, paddingHorizontal: 12 },
  md: { height: 48, fontSize: 16, paddingHorizontal: 20 },
  lg: { height: 56, fontSize: 18, paddingHorizontal: 28 },
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius = 12,
  textColor,
  fontSize,
  fontWeight = '600',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = true,
  ...rest
}) => {
  const variantColors = VARIANT_COLORS[variant];
  const sizeStyle = SIZE_STYLES[size];

  const resolvedBg = backgroundColor ?? variantColors.bg;
  const resolvedBorder = borderColor ?? variantColors.border;
  const resolvedText = textColor ?? variantColors.text;
  const resolvedFontSize = fontSize ?? sizeStyle.fontSize;
  const resolvedBorderWidth = borderWidth ?? (variant === 'outline' ? 1.5 : 0);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: resolvedBg,
          borderColor: resolvedBorder,
          borderWidth: resolvedBorderWidth,
          borderRadius,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          width: fullWidth ? '100%' : undefined,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={resolvedText} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: resolvedText,
              fontSize: resolvedFontSize,
              fontWeight,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
