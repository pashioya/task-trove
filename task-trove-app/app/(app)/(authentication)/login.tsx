import * as Linking from 'expo-linking';
import { Link, Stack } from 'expo-router';
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
  const testLogout = () => {
    console.log('removing testAccessToken from authContext');
    authContext.logOut();
  };

  const printAccessToken = () => {
    console.log('access token:', authContext.getAccessToken());
  };

  const printTempCodes = () => {
    console.log('Temp Code:', authContext.getTempCode());
    console.log('Storage Key:', authContext.getStorageKey());
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
    await Linking.openURL(url);
    authContext.isPendingAuthentication = true;
  };
  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <Logo />

        <Link href="/">Home</Link>
        <Link href="/1">Onboarding1</Link>
        <Button onPress={testLogin}>Test Login</Button>
        <Button onPress={testLogout}>Test Logout</Button>

        <Button onPress={openMonday}>Sign In With Monday</Button>
        <Button onPress={printAccessToken}>Print Access Token</Button>
        <Button onPress={printTempCodes}>Print Temp Codes</Button>

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
