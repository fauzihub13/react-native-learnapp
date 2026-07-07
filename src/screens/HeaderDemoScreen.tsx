import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header, Button, useToast } from '../components';
import { Colors, Typography, Spacing } from '../styles';

const HeaderDemoScreen: React.FC = () => {
  const toast = useToast();
  const [variant, setVariant] = useState<'default' | 'transparent' | 'custom'>('default');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Basic</Text>

        <View style={styles.preview}>
          <Header title="Title Only" />
        </View>

        <View style={styles.preview}>
          <Header title="With Subtitle" subtitle="Subtitle text" />
        </View>

        <View style={styles.preview}>
          <Header title="With Back" showBack />
        </View>

        <Text style={[styles.sectionTitle, styles.mtSection]}>Actions</Text>

        <View style={styles.preview}>
          <Header
            title="Left Action"
            leftAction={{
              label: 'Cancel',
              onPress: () => toast.info('Cancel pressed'),
            }}
          />
        </View>

        <View style={styles.preview}>
          <Header
            title="Right Action"
            rightAction={{
              label: 'Save',
              onPress: () => toast.success('Saved!'),
            }}
          />
        </View>

        <View style={styles.preview}>
          <Header
            title="Multiple Actions"
            showBack
            rightActions={[
              {
                label: 'Edit',
                onPress: () => toast.info('Edit pressed'),
              },
              {
                label: 'Delete',
                onPress: () => toast.error('Delete pressed'),
                color: Colors.danger,
              },
            ]}
          />
        </View>

        <Text style={[styles.sectionTitle, styles.mtSection]}>Variants</Text>

        <View style={styles.preview}>
          <Header
            title="Center Title (default)"
            subtitle="Centered"
            showBack
            rightAction={{
              label: 'Save',
              onPress: () => {},
            }}
          />
        </View>

        <View style={styles.preview}>
          <Header
            title="Left Title"
            subtitle="Not centered"
            showBack
            centerTitle={false}
            rightAction={{
              label: 'Done',
              onPress: () => {},
            }}
          />
        </View>

        <View style={[styles.preview, styles.darkPreview]}>
          <Header
            title="Transparent"
            subtitle="Dark background"
            showBack
            transparent
            titleStyle={{ color: Colors.white }}
            subtitleStyle={{ color: 'rgba(255,255,255,0.7)' }}
          />  
        </View>

        <View style={styles.preview}>
          <Header
            title="No Border"
            showBack
            bordered={false}
          />
        </View>

        <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Colors</Text>

        <View style={styles.preview}>
          <Header
            title="Custom BG"
            showBack
            backgroundColor="#EEF2FF"
          />
        </View>

        <View style={styles.preview}>
          <Header
            title="Custom Actions"
            showBack
            rightActions={[
              {
                icon: <Text style={styles.icon}>🔔</Text>,
                onPress: () => toast.info('Notification'),
              },
              {
                icon: <Text style={styles.icon}>⚙️</Text>,
                onPress: () => toast.info('Settings'),
              },
            ]}
          />
        </View>

        <Text style={[styles.sectionTitle, styles.mtSection]}>
          Dengan Content
        </Text>

        <View style={styles.screenDemo}>
          <Header
            title="Profile"
            subtitle="@username"
            showBack
            rightAction={{
              label: 'Edit',
              onPress: () => toast.info('Edit profile'),
            }}
          />
          <View style={styles.screenContent}>
            <Text style={styles.placeholder}>Screen content here...</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
    marginTop: Spacing.lg,
  },
  preview: {
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
  },
  darkPreview: {
    backgroundColor: Colors.gray800,
  },
  mtSection: {
    marginTop: Spacing['2xl'],
  },
  icon: {
    fontSize: 20,
  },
  screenDemo: {
    flex: 1,
    backgroundColor: Colors.white,
    minHeight: 300,
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  placeholder: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
});

export default HeaderDemoScreen;
