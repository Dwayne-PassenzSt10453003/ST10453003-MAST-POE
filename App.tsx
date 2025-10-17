import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screens/components/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from './src/screens/components/MenuContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}