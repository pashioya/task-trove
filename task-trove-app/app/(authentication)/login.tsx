import { Stack } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { View, Image } from 'react-native';
import { Button } from '~/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { Separator } from '~/components/primitives/select';
import * as NavigationBar from 'expo-navigation-bar';

import LottieView from 'lottie-react-native';

export default function Login() {
  const { signIn } = useSession();

  NavigationBar.setPositionAsync('absolute');
  NavigationBar.setBackgroundColorAsync('#ffffff01');

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />

      <SafeAreaView className="bg-background" style={{ flex: 1 }}>
        <LottieView
          source={require('~/assets/lottie/login.json')}
          style={{ width: '105%', height: '112%', position: 'absolute', top: 0, left: 0 }}
          autoPlay
          loop
        />
        <View className="absolute top-20 left-0 right-0 items-center shadow-2xl">
          <Image
            alt=""
            source={require('~/assets/images/tryve/tryve-white-logo-square.png')}
            className="w-72 h-72 rounded-full flex-shrink"
          />
        </View>
        <View className="absolute bottom-20 left-0 right-0 items-center gap-11">
          <Text className="text-2xl font-semibold ">Sign in with</Text>
          <Separator className="my-1 bg-black h-1 w-64" />
          <Button size="lg" className="rounded-md flex-row" onPress={signIn}>
            <Image
              source={require('~/assets/images/monday/monday-white.png')}
              className="w-60 h-60"
              resizeMode="contain"
            />
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}
