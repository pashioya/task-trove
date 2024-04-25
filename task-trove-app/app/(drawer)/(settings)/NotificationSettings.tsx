import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function NotificationSettings() {
  return (
    <>
      <Stack.Screen options={{ title: 'NotificationSettings' }} />
      <Container>
        <Link href="/">Home</Link>
      </Container>
    </>
  );
}
