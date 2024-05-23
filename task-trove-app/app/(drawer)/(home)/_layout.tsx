import { Stack } from 'expo-router';

export default function MapLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
