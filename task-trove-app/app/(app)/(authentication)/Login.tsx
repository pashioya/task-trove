import { Link, Stack } from 'expo-router';
import { useContext } from 'react';
import { Button } from 'tamagui';

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
  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <Link href="/">Home</Link>
        <Link href="/1">Onboarding 1</Link>

        <Button onPress={testLogin}>Test Login</Button>
        <Button onPress={testLogout}>Test Logout</Button>

        <Button>Sign In With Monday</Button>
      </Container>
    </>
  );
}
