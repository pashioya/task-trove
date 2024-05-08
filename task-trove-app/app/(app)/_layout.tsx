import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui';
import SettingsContextProvider from '~/contexts/SettingsContextProvider';

import config from '../../tamagui.config';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function AppLayout() {
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
        <QueryClientProvider client={queryClient}>
          <SettingsContextProvider>
            <Stack>
              <Stack.Screen name="(authentication)" options={{ headerShown: true }} />
              <Stack.Screen
                name="(drawer)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </SettingsContextProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
