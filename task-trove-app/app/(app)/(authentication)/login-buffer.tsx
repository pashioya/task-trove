import { AntDesign } from '@expo/vector-icons';

import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect } from 'react';
import { Container } from '~/components/Container';
import AuthContext, { AuthenticationContext } from '~/contexts/AuthenticationContext';
import { getAccessToken } from '~/utils/authApiMethods';

async function handleLogin(
  tempCode: string,
  storageKey: string,
  authContext: AuthenticationContext,
) {
  try {
    const response = await getAccessToken(tempCode.toString(), storageKey.toString());
    const accessToken = response.data.access_token;
    console.log('accessToken:', accessToken);
    authContext.logIn(accessToken);
  } catch (error) {
    console.error('Error getting access token:', error);
  }
}

export default function LoginBuffer() {
  const authContext = useContext(AuthContext);
  const { tempCode, storageKey } = useLocalSearchParams();

  useEffect(() => {
    console.log('tempCode:', tempCode.toString());
    console.log('storageKey:', storageKey.toString());

    if (tempCode && storageKey) {
      handleLogin(tempCode.toString(), storageKey.toString(), authContext);
    }

    router.push('/');
  }, [tempCode, storageKey]);

  return (
    <>
      <Stack.Screen options={{ title: 'Login-Buffer' }} />
      <Container>
        <AntDesign name="loading1" size={24} color="black" />
      </Container>
    </>
  );
}
