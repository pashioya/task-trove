import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Stack, Link, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Text } from 'tamagui';

import AuthContext from '~/contexts/AuthenticationContext';
import { useAccessToken } from '~/hooks/useAccessToken';
import { Container } from '~/tamagui.config';

export default function Home() {
  const url = Linking.useURL();
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const mutation = useAccessToken();

  // if url contains 'auth-token', then split the url and get the access token
  if (url && url.includes('auth-token')) {
    const authToken = url.split('auth-token=')[1];
    // mutation.mutate({ temporaryCode: authToken, storage });
  }

  if (!authContext.isAuthenticated && authContext.isPendingAuthentication) {
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
