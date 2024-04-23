import { Stack } from 'expo-router';

export default function AuthenticationLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'login' }} />
      <Stack.Screen name="success" options={{ title: 'Login Success' }} />
    </Stack>
  );
}
