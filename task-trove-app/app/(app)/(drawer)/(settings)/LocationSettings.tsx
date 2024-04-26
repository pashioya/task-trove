import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function LocationSettings() {
  return (
    <>
      <Stack.Screen options={{ title: 'LocationSettings' }} />
      <Container>
        <Link href="/">Home</Link>
      </Container>
    </>
  );
}
