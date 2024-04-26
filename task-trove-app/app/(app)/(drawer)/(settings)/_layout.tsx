import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack initialRouteName="Settings">
      <Stack.Screen name="LocationSettings" options={{ title: 'LocationSettings' }} />
      <Stack.Screen name="NotificationSettings" options={{ title: 'NotificationSettings' }} />
      <Stack.Screen name="Settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
