import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../styles';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  color: string;
  onPress?: () => void;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', icon: '📋', label: 'SunList', color: '#EEF2FF' },
  { id: '2', icon: '📰', label: 'SunNews', color: '#EEF2FF' },
  { id: '3', icon: '💰', label: 'SunCost', color: '#EEF2FF' },
  { id: '4', icon: '👥', label: 'SunTalk', color: '#EEF2FF' },
  { id: '5', icon: '💬', label: 'Chat', color: '#EEF2FF' },
];

interface QuickMenuProps {
  onItemPress?: (id: string) => void;
}

const QuickMenu: React.FC<QuickMenuProps> = ({ onItemPress }) => {
  return (
    <View style={styles.container}>
      {MENU_ITEMS.map((item) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => [
            styles.menuItem,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => onItemPress?.(item.id)}
        >
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  menuItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray600,
    marginTop: Spacing.xs,
  },
});

export default QuickMenu;
