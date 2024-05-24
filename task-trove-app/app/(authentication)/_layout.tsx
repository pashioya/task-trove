import { Stack, Redirect } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { Pressable, Text } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useSettingsStore } from '~/store';

export default function AuthenticationLayout() {
  const { session, isLoading } = useSession();
  const { onboardingCompleted } = useSettingsStore();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    if (!onboardingCompleted) {
      return <Redirect href="/(onboarding)/1" />;
    }
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                console.log('Back');
              }}
            >
              <ArrowLeft />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
