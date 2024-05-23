import { Stack, router } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { View, Image, SafeAreaView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';

export default function Login() {
  const { signIn } = useSession();

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <View className="my-container justify-between">
        <View>
          <Text className="header pt-20">Task-Trove</Text>
        </View>
        <View className="gap-5">
          <Button onPress={signIn}>
            <Text className="">Sign in with Monday</Text>
          </Button>
          <Button className="my-pill-button" onPress={() => router.push('/test')}>
            <Text>Test Page</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
