import { AntDesign } from '@expo/vector-icons';

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Container } from '~/components/Container';
import AuthContext from '~/contexts/AuthenticationContext';

import { useAccessToken } from '~/hooks/useAccessToken';

export default function LoginBuffer() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { tempCode, storageKey } = useLocalSearchParams();
  const { accessToken } = useAccessToken(tempCode.toString(), storageKey.toString());

  // ! should this be in a useEffect?
  if (accessToken) {
    authContext.logIn(accessToken);
    authContext.setIsAuthenticated(true);
    authContext.setIsPendingAuthentication(false);
    console.log('Authenticated!');
    router.replace('/');
  }

  console.log('accessToken:', accessToken);

  return (
    <>
      <Stack.Screen options={{ title: 'Login-Buffer' }} />
      <Container>
        <AntDesign name="loading1" size={24} color="black" />
      </Container>
    </>
  );
}
