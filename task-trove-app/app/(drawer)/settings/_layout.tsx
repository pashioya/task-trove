import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack initialRouteName="main">
      <Stack.Screen name="main" options={{ title: 'Settings', headerShown: false }} />
      <Stack.Screen
        name="location"
        options={{
          title: 'Location Settings',
          headerTitle: '',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{ title: 'NotificationSettings', headerTitle: '', headerBackVisible: true }}
      />
    </Stack>
  );
}