import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function Map() {
  return (
    <>
      <Stack.Screen options={{ title: 'Map' }} />
      <Container>
        <Link href="/">Home</Link>
      </Container>
    </>
  );
}
