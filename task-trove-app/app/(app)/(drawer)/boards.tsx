import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ToastDemo } from '~/components/ToastDemo';

export default function Boards() {
  return (
    <>
      <Stack.Screen options={{ title: 'Boards' }} />
      <Container>
        <Link href="/">Home</Link>
        <ToastDemo />
      </Container>
    </>
  );
}
