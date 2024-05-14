import { Stack } from 'expo-router';

export default function AuthenticationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login' }} />
    </Stack>
  );
}
