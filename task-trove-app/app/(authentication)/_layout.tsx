import { Stack, Redirect } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { ActivityIndicator, View } from 'react-native';
import { useSettingsStore } from '~/store';
import React from 'react';

export default function AuthenticationLayout() {
  const { session, isLoading } = useSession();
  const { onboardingCompleted } = useSettingsStore();

  if (isLoading) {
    return (
      <View className="my-container justify-center align-center">
        <ActivityIndicator size={45} />
      </View>
    );
  }

  if (session) {
    if (!onboardingCompleted) {
      return <Redirect href="/(onboarding)/1" />;
    }
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
