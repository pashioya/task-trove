import { Stack } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { View, StyleSheet } from 'react-native';
import { Text } from '~/components/ui/text';
import LottieView from 'lottie-react-native';
import { Button } from '~/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const { signIn } = useSession();

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <SafeAreaView style={styles.container}>
        <LottieView
          resizeMode="cover"
          loop
          autoPlay
          source={require('~/assets/lottie/blue-animation.json')}
          style={styles.video}
        />
        <View className="mt-20 ml-4">
          <Text className="my-header pt-30 text-center leading-relaxed text-white">
            Enhance your Monday Experience
          </Text>
        </View>

        <View className=" flex-row justify-center">
          <Button className="rounded-md pb-20" onPress={signIn}>
            <Text>Sign in with Monday</Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '130%',
    position: 'absolute',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});
