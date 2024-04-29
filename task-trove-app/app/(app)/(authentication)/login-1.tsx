import * as Linking from 'expo-linking';
import { Link, Stack } from 'expo-router';
import { useContext } from 'react';
import { Image, Button, styled } from 'tamagui';

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

  const Logo = styled(Image, {
    name: 'Logo',
    source: require('~/assets/tryve-logo.png'),
    width: '100%',
    height: 130,
  });

  const openMonday = async () => {
    const url =
      'https://auth.monday.com/oauth2/authorize?client_id=55b279c1eb45e23ce60d4cc032d63ab6&redirect_uri=http://localhost:8080/auth-token&scope=me:read&app_version_id=10233356';
    await Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <Logo />

        <Link href="/">
          <Button>Home</Button>
        </Link>
        <Link href="/1">
          <Button>Onboarding 1</Button>
        </Link>

        <Button onPress={testLogin}>Test Login</Button>
        <Button onPress={testLogout}>Test Logout</Button>

        <Button onPress={openMonday}>Sign In With Monday</Button>

        <Image
          source={{
            uri: '/task-trove-app/assets/monday-avatar-2.svg',
            width: 500,
            height: 500,
          }}
        />
      </Container>
    </>
  );
}
