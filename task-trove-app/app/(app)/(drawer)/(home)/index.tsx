import * as Linking from 'expo-linking';
import { Link, Stack } from 'expo-router';
import { Text } from 'tamagui';

import { Container } from '~/components/Container';

export default function Home() {
  const url = Linking.useURL();

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
