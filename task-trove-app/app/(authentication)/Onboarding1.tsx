import { Stack } from 'expo-router';
import { Button, Text } from 'tamagui';

import { Container } from '~/components/Container';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login Success' }} />
      <Container>
        <Text>Login Success Onboarding began</Text>
        <Button href="/">Home</Button>
      </Container>
    </>
  );
}
