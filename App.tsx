import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SizeConfigProvider } from './app/utils/SizeConfig';
import SplashScreen from './app/screens/auth/SplashScreen';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SizeConfigProvider>
        <SafeAreaProvider>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <NavigationContainer>
            <SplashScreen />
          </NavigationContainer>
        </SafeAreaProvider>
      </SizeConfigProvider>
    </GestureHandlerRootView>
  );
}

export default App;
