import axios from 'axios';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

import AuthenticationContextProvider from '~/contexts/AuthenticationContextProvider';

SplashScreen.preventAutoHideAsync();

axios.defaults.withCredentials = true;

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthenticationContextProvider>
          <Stack>
            <Stack.Screen name="(authentication)" options={{ headerShown: true }} />
            <Stack.Screen
              name="(drawer)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </AuthenticationContextProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
