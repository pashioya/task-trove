import * as Linking from 'expo-linking';
import { router, Stack } from 'expo-router';
import { useContext } from 'react';
import { Image, Button, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import AuthContext from '~/contexts/AuthenticationContext';

export default function Login() {
  const authContext = useContext(AuthContext);
  const testLogin = () => {
    console.log('inserting testAccessToken into authContext');
    authContext.logIn('testAccessToken');
  };
  const testLogout = () => {
    console.log('removing testAccessToken from authContext');
    authContext.logOut();
  };

  const openMonday = async () => {
    const url =
      'https://auth.monday.com/oauth2/authorize?client_id=55b279c1eb45e23ce60d4cc032d63ab6&redirect_uri=http://localhost:8080/auth-token&scope=me:read&app_version_id=10233356';
    await Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <YStack marginTop="$15">
          <Image
            source={{
              uri: require('~/assets/tryve-logo.png'),
              height: 130,
            }}
            width="100%"
          />
        </YStack>

        <YStack
          marginBottom="$15"
          alignSelf="center"
          gap="$4"
          position="absolute"
          bottom={0}
          justifyContent="center"
          alignContent="center"
        >
          <Button onPress={() => router.replace('/1')}>Onboarding 1</Button>
          <Button onPress={testLogin}>Test Login</Button>
          <Button onPress={testLogout}>Test Logout</Button>
          <Button theme="blue" onPress={openMonday}>
            Sign In With Monday
          </Button>
        </YStack>
      </Container>
    </>
  );
}
