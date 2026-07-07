import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type MenuItem = {
  id: string;
  title: string;
  subtitle: string;
  screen: keyof RootStackParamList;
  color: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    title: 'Button',
    subtitle: 'Primary, Secondary, Outline, Ghost variants',
    screen: 'ButtonDemo',
    color: '#007AFF',
  },
  {
    id: '2',
    title: 'TextInput',
    subtitle: 'Form input dengan validasi & variants',
    screen: 'TextInputDemo',
    color: '#34C759',
  },
  {
    id: '3',
    title: 'Card',
    subtitle: 'Elevated, Outlined, Filled, clickable',
    screen: 'CardDemo',
    color: '#FF9500',
  },
  {
    id: '4',
    title: 'Dropdown',
    subtitle: 'Select input dengan modal options',
    screen: 'DropdownDemo',
    color: '#AF52DE',
  },
  {
    id: '5',
    title: 'Checkbox',
    subtitle: 'Single checkbox & checkbox group',
    screen: 'CheckboxDemo',
    color: '#FF2D55',
  },
  {
    id: '6',
    title: 'Modal',
    subtitle: 'Center modal & bottom sheet popup',
    screen: 'ModalDemo',
    color: '#5856D6',
  },
  {
    id: '7',
    title: 'Switch',
    subtitle: 'Toggle on/off dengan animasi',
    screen: 'SwitchDemo',
    color: '#30D158',
  },
  {
    id: '8',
    title: 'Radio',
    subtitle: 'Single selection dengan group',
    screen: 'RadioDemo',
    color: '#FF6482',
  },
  {
    id: '9',
    title: 'Tab Bar',
    subtitle: 'Underline, Filled, Pills, scrollable',
    screen: 'TabBarDemo',
    color: '#64D2FF',
  },
  {
    id: '10',
    title: 'Toast',
    subtitle: 'Notifikasi singkat dengan action',
    screen: 'ToastDemo',
    color: '#FF9F0A',
  },
  {
    id: '11',
    title: 'Header',
    subtitle: 'Navbar dengan back, actions, title',
    screen: 'HeaderDemo',
    color: '#BF5AF2',
  },
];

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: { item: MenuItem }) => (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={[styles.badge, { backgroundColor: item.color }]} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reusable Components</Text>
      <Text style={styles.subheading}>
        Pilih komponen untuk melihat demo
      </Text>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subheading: {
    fontSize: 15,
    color: '#6B7280',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  arrow: {
    fontSize: 28,
    color: '#C7C7CC',
    fontWeight: '300',
  },
});

export default HomeScreen;
