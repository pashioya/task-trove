import { Link, Stack } from 'expo-router';
import { Button } from 'tamagui';

import { Container } from '~/components/Container';

export default function Map() {
  return (
    <>
      <Stack.Screen options={{ title: 'Map' }} />
      <Container>
        <Link href="/" asChild>
          <Button>Home</Button>
        </Link>
      </Container>
    </>
  );
}
