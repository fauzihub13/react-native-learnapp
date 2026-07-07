import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TabBar, TabContent } from '../components';
import { Colors, Typography, Spacing } from '../styles';

const BASIC_TABS = [
  { key: 'tab1', title: 'Tab 1' },
  { key: 'tab2', title: 'Tab 2' },
  { key: 'tab3', title: 'Tab 3' },
];

const SCROLL_TABS = [
  { key: 'home', title: 'Home' },
  { key: 'explore', title: 'Explore' },
  { key: 'trending', title: 'Trending' },
  { key: 'favorites', title: 'Favorites' },
  { key: 'saved', title: 'Saved' },
  { key: 'history', title: 'History' },
  { key: 'settings', title: 'Settings' },
];

const BADGE_TABS = [
  { key: 'all', title: 'All' },
  { key: 'unread', title: 'Unread', badge: 5 },
  { key: 'archived', title: 'Archived', badge: 128 },
  { key: 'spam', title: 'Spam', badge: '99+' },
];

const ICON_TABS = [
  { key: 'home', title: 'Home', icon: <Text>🏠</Text> },
  { key: 'search', title: 'Search', icon: <Text>🔍</Text> },
  { key: 'profile', title: 'Profile', icon: <Text>👤</Text> },
];

const TabBarDemoScreen: React.FC = () => {
  const [basicTab, setBasicTab] = useState('tab1');
  const [filledTab, setFilledTab] = useState('tab1');
  const [pillsTab, setPillsTab] = useState('tab1');
  const [scrollTab, setScrollTab] = useState('home');
  const [badgeTab, setBadgeTab] = useState('all');
  const [iconTab, setIconTab] = useState('home');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Underline (default)</Text>

      <TabBar
        tabs={BASIC_TABS}
        activeTab={basicTab}
        onTabChange={setBasicTab}
      />

      <View style={styles.tabContent}>
        <TabContent activeTab={basicTab} tabKey="tab1">
          <Text style={styles.contentText}>Konten Tab 1</Text>
        </TabContent>
        <TabContent activeTab={basicTab} tabKey="tab2">
          <Text style={styles.contentText}>Konten Tab 2</Text>
        </TabContent>
        <TabContent activeTab={basicTab} tabKey="tab3">
          <Text style={styles.contentText}>Konten Tab 3</Text>
        </TabContent>
      </View>

      <Text style={[styles.sectionTitle, styles.mtSection]}>Filled</Text>

      <TabBar
        tabs={BASIC_TABS}
        activeTab={filledTab}
        onTabChange={setFilledTab}
        variant="filled"
      />

      <View style={styles.tabContent}>
        <TabContent activeTab={filledTab} tabKey="tab1">
          <Text style={styles.contentText}>Konten Tab 1</Text>
        </TabContent>
        <TabContent activeTab={filledTab} tabKey="tab2">
          <Text style={styles.contentText}>Konten Tab 2</Text>
        </TabContent>
        <TabContent activeTab={filledTab} tabKey="tab3">
          <Text style={styles.contentText}>Konten Tab 3</Text>
        </TabContent>
      </View>

      <Text style={[styles.sectionTitle, styles.mtSection]}>Pills</Text>

      <TabBar
        tabs={BASIC_TABS}
        activeTab={pillsTab}
        onTabChange={setPillsTab}
        variant="pills"
      />

      <View style={styles.tabContent}>
        <TabContent activeTab={pillsTab} tabKey="tab1">
          <Text style={styles.contentText}>Konten Tab 1</Text>
        </TabContent>
        <TabContent activeTab={pillsTab} tabKey="tab2">
          <Text style={styles.contentText}>Konten Tab 2</Text>
        </TabContent>
        <TabContent activeTab={pillsTab} tabKey="tab3">
          <Text style={styles.contentText}>Konten Tab 3</Text>
        </TabContent>
      </View>

      <Text style={[styles.sectionTitle, styles.mtSection]}>Scrollable</Text>

      <TabBar
        tabs={SCROLL_TABS}
        activeTab={scrollTab}
        onTabChange={setScrollTab}
        scrollable
      />

      <View style={styles.tabContent}>
        <Text style={styles.contentText}>Active: {scrollTab}</Text>
      </View>

      <Text style={[styles.sectionTitle, styles.mtSection]}>With Badge</Text>

      <TabBar
        tabs={BADGE_TABS}
        activeTab={badgeTab}
        onTabChange={setBadgeTab}
        scrollable
      />

      <View style={styles.tabContent}>
        <Text style={styles.contentText}>Active: {badgeTab}</Text>
      </View>

      <Text style={[styles.sectionTitle, styles.mtSection]}>With Icon</Text>

      <TabBar
        tabs={ICON_TABS}
        activeTab={iconTab}
        onTabChange={setIconTab}
      />

      <View style={styles.tabContent}>
        <TabContent activeTab={iconTab} tabKey="home">
          <Text style={styles.contentText}>🏠 Home Content</Text>
        </TabContent>
        <TabContent activeTab={iconTab} tabKey="search">
          <Text style={styles.contentText}>🔍 Search Content</Text>
        </TabContent>
        <TabContent activeTab={iconTab} tabKey="profile">
          <Text style={styles.contentText}>👤 Profile Content</Text>
        </TabContent>
      </View>

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Colors</Text>

      <TabBar
        tabs={BASIC_TABS}
        activeTab={basicTab}
        onTabChange={setBasicTab}
        activeColor={Colors.success}
        backgroundColor={Colors.gray50}
      />

      <View style={styles.mt}>
        <TabBar
          tabs={BASIC_TABS}
          activeTab={basicTab}
          onTabChange={setBasicTab}
          variant="pills"
          activeColor={Colors.danger}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: Spacing['3xl'],
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing['2xl'],
  },
  tabContent: {
    padding: Spacing.lg,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  mt: {
    marginTop: Spacing.base,
  },
  mtSection: {
    marginTop: Spacing['2xl'],
  },
});

export default TabBarDemoScreen;
