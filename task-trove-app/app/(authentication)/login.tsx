import { Stack } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { View, StyleSheet } from 'react-native';
import { Text } from '~/components/ui/text';
import LottieView from 'lottie-react-native';
import { Button } from '~/components/ui/button';

export default function Login() {
  const { signIn } = useSession();

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <View style={styles.container}>
        <LottieView
          resizeMode="cover"
          loop
          autoPlay
          source={require('~/assets/lottie/blue-animation.json')}
          style={styles.video}
        />
        <View className="mt-20">
          <Text className="my-header pt-10 leading-relaxed text-white ">
            Enhance your Monday Experience
          </Text>
        </View>

        <View style={styles.buttons}>
          <Button onPress={signIn}>
            <Text>Sign in with Monday</Text>
          </Button>
        </View>
      </View>
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
    height: '100%',
    position: 'absolute',
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});
