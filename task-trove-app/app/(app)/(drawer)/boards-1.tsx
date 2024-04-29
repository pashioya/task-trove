import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function Boards() {
  return (
    <>
      <Stack.Screen options={{ title: 'Boards' }} />
      <Container>
        <Link href="/">Home</Link>
      </Container>
    </>
  );
}
