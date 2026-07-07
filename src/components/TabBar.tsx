import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ScrollView,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing } from '../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TabItem {
  key: string;
  title: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  variant?: 'underline' | 'filled' | 'pills';
  scrollable?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  labelStyle?: TextStyle;
  activeLabelStyle?: TextStyle;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'underline',
  scrollable = false,
  activeColor = Colors.primary,
  inactiveColor = Colors.textSecondary,
  backgroundColor = Colors.white,
  containerStyle,
  tabStyle,
  labelStyle,
  activeLabelStyle,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const tabWidths = useRef<{ [key: string]: number }>({});
  const tabPositions = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const index = tabs.findIndex((t) => t.key === activeTab);
    if (index !== -1) {
      Animated.spring(animatedValue, {
        toValue: index,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }).start();
    }
  }, [activeTab]);

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: Colors.gray100,
          borderRadius: 12,
          padding: 4,
        };
      case 'pills':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        };
    }
  };

  const getTabStyle = (isActive: boolean): ViewStyle => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: isActive ? backgroundColor : 'transparent',
          borderRadius: 10,
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.base,
        };
      case 'pills':
        return {
          backgroundColor: isActive ? activeColor : 'transparent',
          borderRadius: 20,
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.base,
          borderWidth: isActive ? 0 : 1,
          borderColor: isActive ? 'transparent' : Colors.gray300,
        };
      default:
        return {
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.base,
        };
    }
  };

  const getLabelStyle = (isActive: boolean): TextStyle => ({
    fontSize: Typography.fontSize.base,
    fontWeight: isActive ? Typography.fontWeight.semibold : Typography.fontWeight.regular,
    color: variant === 'pills' && isActive ? Colors.white : isActive ? activeColor : inactiveColor,
  });

  const renderTab = (tab: TabItem, index: number) => {
    const isActive = tab.key === activeTab;
    return (
      <Pressable
        key={tab.key}
        onPress={() => onTabChange(tab.key)}
        style={[
          styles.tab,
          getTabStyle(isActive),
          tabStyle,
        ]}
      >
        {tab.icon && <View style={styles.iconContainer}>{tab.icon}</View>}
        <Text style={[getLabelStyle(isActive), labelStyle, isActive && activeLabelStyle]}>
          {tab.title}
        </Text>
        {tab.badge !== undefined && (
          <View style={[styles.badge, { backgroundColor: Colors.danger }]}>
            <Text style={styles.badgeText}>
              {typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : tab.badge}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  const renderUnderlineIndicator = () => {
    if (variant !== 'underline') return null;
    const activeIndex = tabs.findIndex((t) => t.key === activeTab);
    const tabWidth = tabWidths.current[activeTab] || 0;

    return (
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: activeColor,
            width: tabWidth,
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: tabs.map((_, i) => i),
                  outputRange: tabs.map((t) => tabPositions.current[t.key] || 0),
                }),
              },
            ],
          },
        ]}
      />
    );
  };

  const content = (
    <>
      {tabs.map((tab, index) => renderTab(tab, index))}
      {renderUnderlineIndicator()}
    </>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, getContainerStyle(), containerStyle]}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, getContainerStyle(), containerStyle]}>
      {tabs.map((tab, index) => renderTab(tab, index))}
      {renderUnderlineIndicator()}
    </View>
  );
};

interface TabContentProps {
  activeTab: string;
  tabKey: string;
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tabKey, children }) => {
  if (activeTab !== tabKey) return null;
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  scrollContent: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    marginRight: Spacing.xs,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderRadius: 2,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
});

export { TabContent };
export default TabBar;
