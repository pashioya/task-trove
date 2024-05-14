import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui';
import SettingsContextProvider from '~/contexts/SettingsContextProvider';
import config from '../../tamagui.config';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function AppLayout() {
  const [loaded] = useFonts({
    Inter: require('~/assets/fonts/Figtree-Regular.ttf'),
    InterBold: require('~/assets/fonts/Figtree-SemiBold.ttf'),
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
          <SettingsContextProvider>
            <Stack>
              <Stack.Screen name="(authentication)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(drawer)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
            </Stack>
          </SettingsContextProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
