import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      initialRouteName="main"
      screenOptions={{
        headerShown: true,
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: true,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="main" />
      <Stack.Screen name="location" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
