import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Stack, Link, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Text } from 'tamagui';

import AuthContext from '~/contexts/AuthenticationContext';
import { useAccessToken } from '~/hooks/useAccessToken';
import { Container } from '~/tamagui.config';
import { getAccessToken } from '~/utils/authApiMethods';

export default function Home() {
  const url = Linking.useURL();
  const authContext = useContext(AuthContext);
  // const mutation = useAccessToken();

  if (url?.includes('token')) {
    const tempCode = url.split('token=')[1];
    const storageKey = url.split('key=')[1];

    console.log('tempCode:', url.split('token=')[1]);
    console.log('storageKey:', url.split('key=')[1]);
    getAccessToken(storageKey, tempCode).then(res => {
      console.log('res:', res);
      authContext.logIn(res.access_token);
    });
  }

  if (authContext.isPendingAuthentication) {
    return (
      <Container>
        <AntDesign name="loading1" size={24} color="black" />;
      </Container>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Link href="/login">Login</Link>
        <Text>URL: {url}</Text>
      </Container>
    </>
  );
}
