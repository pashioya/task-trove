import { Stack, Redirect } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { Pressable, Text } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

export default function AuthenticationLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    console.log('Session: ', session);
    return <Redirect href="/1" />;
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
