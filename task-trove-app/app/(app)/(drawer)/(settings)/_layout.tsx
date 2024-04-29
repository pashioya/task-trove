import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack initialRouteName="settings">
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="locationSettings" options={{ title: 'LocationSettings' }} />
      <Stack.Screen name="notificationSettings" options={{ title: 'NotificationSettings' }} />
    </Stack>
  );
}
