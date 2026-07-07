import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Colors, Typography, BorderRadius, Shadow, Spacing } from '../styles';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageSourcePropType;
  imagePosition?: 'top' | 'left';
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'elevated' | 'outlined' | 'filled';
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  shadow?: boolean;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

const VARIANT_STYLES: Record<string, { bg: string; border: number; borderColor: string }> = {
  elevated: { bg: Colors.white, border: 0, borderColor: 'transparent' },
  outlined: { bg: Colors.white, border: 1, borderColor: Colors.border },
  filled: { bg: Colors.gray50, border: 0, borderColor: 'transparent' },
};

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  description,
  image,
  imagePosition = 'top',
  onPress,
  disabled = false,
  variant = 'elevated',
  backgroundColor,
  borderRadius = BorderRadius.xl,
  padding = Spacing.base,
  shadow = true,
  headerRight,
  footer,
  style,
  titleStyle,
  subtitleStyle,
  descriptionStyle,
}) => {
  const variantStyle = VARIANT_STYLES[variant];
  const isClickable = !!onPress && !disabled;

  const containerStyle: ViewStyle = {
    backgroundColor: backgroundColor || variantStyle.bg,
    borderRadius,
    borderWidth: variantStyle.border,
    borderColor: variantStyle.borderColor,
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    ...(shadow && variant === 'elevated' ? Shadow.md : {}),
  };

  const hasHeader = title || subtitle || headerRight;
  const isHorizontal = image && imagePosition === 'left';

  const renderImage = () => {
    if (!image) return null;
    return (
      <Image
        source={image}
        style={[
          isHorizontal ? styles.imageLeft : styles.imageTop,
        ]}
        resizeMode="cover"
      />
    );
  };

  const renderHeader = () => {
    if (!hasHeader) return null;
    return (
      <View style={styles.header}>
        <View style={styles.headerText}>
          {title && (
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        {headerRight && <View>{headerRight}</View>}
      </View>
    );
  };

  const renderContent = () => (
    <View style={[styles.content, { padding }]}>
      {renderHeader()}
      {description && (
        <Text style={[styles.description, descriptionStyle]} numberOfLines={3}>
          {description}
        </Text>
      )}
      {children}
    </View>
  );

  const renderFooter = () => {
    if (!footer) return null;
    return <View style={styles.footer}>{footer}</View>;
  };

  const renderCard = () => (
    <View style={[containerStyle, style]}>
      {isHorizontal ? (
        <View style={styles.horizontal}>
          {renderImage()}
          <View style={styles.horizontalContent}>
            {renderContent()}
            {renderFooter()}
          </View>
        </View>
      ) : (
        <>
          {renderImage()}
          {renderContent()}
          {renderFooter()}
        </>
      )}
    </View>
  );

  if (isClickable) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {renderCard()}
      </Pressable>
    );
  }

  return renderCard();
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerText: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  description: {
    fontSize: Typography.fontSize.md,
    color: Colors.gray700,
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    padding: Spacing.md,
  },
  imageTop: {
    width: '100%',
    height: 180,
  },
  imageLeft: {
    width: 100,
    height: '100%',
    minHeight: 100,
  },
  horizontal: {
    flexDirection: 'row',
  },
  horizontalContent: {
    flex: 1,
  },
});

export default Card;
