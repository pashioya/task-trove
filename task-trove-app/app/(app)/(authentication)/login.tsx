import * as Linking from 'expo-linking';
import { Link, Stack, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Image, Button, styled } from 'tamagui';

import { CLIENT_ID, OAUTH_SERVER_URL } from '~/app/_layout';
import { Container } from '~/components/Container';
import AuthContext from '~/contexts/AuthenticationContext';

export default function Login() {
  const authContext = useContext(AuthContext);
  const testLogin = () => {
    console.log('inserting testAccessToken into authContext');
    authContext.logIn('testAccessToken');
  };

  const printAccessToken = () => {
    console.log('access token:', authContext.getAccessToken());
  };

  const Logo = styled(Image, {
    name: 'Logo',
    source: require('~/assets/tryve-logo.png'),
    width: '100%',
    height: 130,
  });

  const openMonday = async () => {
    const url =
      'https://auth.monday.com/oauth2/authorize?client_id=' +
      CLIENT_ID +
      '&redirect_uri=' +
      OAUTH_SERVER_URL +
      'auth-token';
    console.log('opening url:', url);
    authContext.isPendingAuthentication = true;

    console.log('authContext: ', authContext);
    await Linking.openURL(url);
  };

  const url = Linking.useURL();
  const router = useRouter();

  if (authContext.isAuthenticated) {
    router.push({ pathname: '/' });
  }
  if (url?.includes('token=')) {
    console.log('URL:', url);
    const tempCode = url.split('token=')[1].split('&key=')[0];
    const storageKey = url.split('key=')[1];
    console.log('tempCode:', tempCode);
    console.log('storageKey:', storageKey);
    router.push({ pathname: '/login-buffer', params: { tempCode, storageKey } });
  }

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <Logo />

        <Link href="/">Home</Link>
        <Link href="/1">Onboarding1</Link>
        <Button onPress={testLogin}>Test Login</Button>
        <Button onPress={openMonday}>Sign In With Monday</Button>
        <Button onPress={printAccessToken}>Print Access Token</Button>

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
