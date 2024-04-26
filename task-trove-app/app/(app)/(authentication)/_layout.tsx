import { Stack } from 'expo-router';

export default function AuthenticationLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ title: 'Login' }} />
      <Stack.Screen name="(onboarding)" options={{ title: 'Login Success' }} />
    </Stack>
  );
}
