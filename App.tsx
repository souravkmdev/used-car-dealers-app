import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SizeConfigProvider } from './app/utils/SizeConfig';
import AppNavigator from './app/navigation/AppNavigator';
import store from './app/store/store';

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SizeConfigProvider>
          <SafeAreaProvider>
            <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </SizeConfigProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
