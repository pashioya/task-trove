import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack initialRouteName="settings">
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="location-settings" options={{ title: 'LocationSettings' }} />
      <Stack.Screen name="notification-settings" options={{ title: 'NotificationSettings' }} />
    </Stack>
  );
}
