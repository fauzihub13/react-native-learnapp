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
  elevated: { bg: '#FFFFFF', border: 0, borderColor: 'transparent' },
  outlined: { bg: '#FFFFFF', border: 1, borderColor: '#E5E7EB' },
  filled: { bg: '#F9FAFB', border: 0, borderColor: 'transparent' },
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
  borderRadius = 16,
  padding = 16,
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
    ...(shadow && variant === 'elevated'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }
      : {}),
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
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  description: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    padding: 12,
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
