import { Link, Stack } from 'expo-router';
import { Button } from 'tamagui';

import { Container } from '~/components/Container';

export default function Boards() {
  return (
    <>
      <Stack.Screen options={{ title: 'Boards' }} />
      <Container>
        <Link href="/" asChild>
          <Button>Home</Button>
        </Link>
      </Container>
    </>
  );
}
