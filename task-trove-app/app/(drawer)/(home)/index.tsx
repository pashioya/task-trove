import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Link href="/Login">Login</Link>
        <Link href="/Map">Map</Link>
      </Container>
    </>
  );
}
