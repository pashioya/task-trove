import { Stack } from 'expo-router';

export default function AuthenticationLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ title: 'login' }} />
      <Stack.Screen name="Onboarding1" options={{ title: 'Login Success' }} />
    </Stack>
  );
}
