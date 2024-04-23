import { Stack } from 'expo-router';
import { Button, Text } from 'tamagui';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login Success' }} />
      <Container>
        <Text>Login Success</Text>
        <Button href="/index">Login Success</Button>
      </Container>
    </>
  );
}
