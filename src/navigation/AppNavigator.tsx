import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import ButtonDemoScreen from '../screens/ButtonDemoScreen';
import TextInputDemoScreen from '../screens/TextInputDemoScreen';
import CardDemoScreen from '../screens/CardDemoScreen';
import DropdownDemoScreen from '../screens/DropdownDemoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#F8F9FA' },
          headerTitleStyle: { fontWeight: '600', fontSize: 18 },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Component Library' }}
        />
        <Stack.Screen
          name="ButtonDemo"
          component={ButtonDemoScreen}
          options={{ title: 'Button' }}
        />
        <Stack.Screen
          name="TextInputDemo"
          component={TextInputDemoScreen}
          options={{ title: 'TextInput' }}
        />
        <Stack.Screen
          name="CardDemo"
          component={CardDemoScreen}
          options={{ title: 'Card' }}
        />
        <Stack.Screen
          name="DropdownDemo"
          component={DropdownDemoScreen}
          options={{ title: 'Dropdown' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
