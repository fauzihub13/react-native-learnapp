import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Shadow } from '../styles';

interface HeaderAction {
  icon?: React.ReactNode;
  label?: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  leftAction?: HeaderAction;
  rightAction?: HeaderAction;
  rightActions?: HeaderAction[];
  backgroundColor?: string;
  transparent?: boolean;
  bordered?: boolean;
  centerTitle?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  leftAction,
  rightAction,
  rightActions,
  backgroundColor = Colors.white,
  transparent = false,
  bordered = true,
  centerTitle = true,
  containerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const renderLeft = () => {
    if (leftAction) {
      return (
        <Pressable
          onPress={leftAction.onPress}
          disabled={leftAction.disabled}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          {leftAction.icon || (
            <Text style={[styles.actionLabel, { color: leftAction.color || Colors.textPrimary }]}>
              {leftAction.label}
            </Text>
          )}
        </Pressable>
      );
    }

    if (showBack) {
      return (
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      );
    }

    return <View style={styles.actionPlaceholder} />;
  };

  const renderCenter = () => {
    if (!title && !subtitle) return <View style={styles.centerPlaceholder} />;

    return (
      <View style={[styles.centerContainer, !centerTitle && styles.centerLeft]}>
        {title && (
          <Text
            style={[styles.title, titleStyle]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            style={[styles.subtitle, subtitleStyle]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  const renderRight = () => {
    const actions = rightActions || (rightAction ? [rightAction] : []);

    if (actions.length === 0) {
      return <View style={styles.actionPlaceholder} />;
    }

    return (
      <View style={styles.rightContainer}>
        {actions.map((action, index) => (
          <Pressable
            key={index}
            onPress={action.onPress}
            disabled={action.disabled}
            style={({ pressed }) => [
              styles.actionButton,
              index > 0 && styles.actionSpacing,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            {action.icon || (
              <Text style={[styles.actionLabel, { color: action.color || Colors.primary }]}>
                {action.label}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: transparent ? 'transparent' : backgroundColor,
        },
        bordered && !transparent && styles.bordered,
        containerStyle,
      ]}
    >
      <View style={styles.content}>
        {renderLeft()}
        {renderCenter()}
        {renderRight()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadow.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: Spacing.md,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Spacing.md,
  },
  centerLeft: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionButton: {
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
  },
  actionLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  actionSpacing: {
    marginLeft: Spacing.xs,
  },
  backIcon: {
    fontSize: 32,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.regular,
    marginTop: -4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionPlaceholder: {
    minWidth: 40,
  },
  centerPlaceholder: {
    flex: 1,
  },
});

export default Header;
