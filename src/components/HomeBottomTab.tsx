import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../styles';

interface TabItem {
  id: string;
  icon: string;
  label: string;
  isActive?: boolean;
}

const TAB_ITEMS: TabItem[] = [
  { id: 'home', icon: '🏠', label: 'Sunify', isActive: true },
  { id: 'location', icon: '📍', label: '' },
  { id: 'history', icon: '🕐', label: '' },
  { id: 'profile', icon: '👤', label: '' },
];

interface HomeBottomTabProps {
  activeTab?: string;
  onTabPress?: (id: string) => void;
}

const HomeBottomTab: React.FC<HomeBottomTabProps> = ({
  activeTab = 'home',
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {TAB_ITEMS.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.tab,
              item.isActive && styles.activeTab,
            ]}
            onPress={() => onTabPress?.(item.id)}
          >
            <Text style={[
              styles.icon,
              item.isActive && styles.activeIcon,
            ]}>
              {item.icon}
            </Text>
            {item.label ? (
              <Text style={[
                styles.label,
                item.isActive && styles.activeLabel,
              ]}>
                {item.label}
              </Text>
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadow.sm,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    height: 60,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  activeTab: {
    flexDirection: 'row',
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  icon: {
    fontSize: 24,
  },
  activeIcon: {
    fontSize: 20,
  },
  label: {
    display: 'none',
  },
  activeLabel: {
    display: 'flex',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
    marginLeft: Spacing.xs,
  },
});

export default HomeBottomTab;
