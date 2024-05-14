import { Stack, Redirect } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { Text } from 'tamagui';
export default function AuthenticationLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="(onboarding)" options={{ title: 'Login Success' }} />
    </Stack>
  );
}
