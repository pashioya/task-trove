import { Link, Stack } from 'expo-router';
import { Button, Image, Text } from 'tamagui';

import { Container } from '~/components/Container';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <Link href="/" asChild>
          <Button>Home</Button>
        </Link>
        <Link href="/One" asChild>
          <Button>Onboarding 1</Button>
        </Link>

        <Text>Sign In To Your Account</Text>

        <Button>Sign In With Monday</Button>

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
