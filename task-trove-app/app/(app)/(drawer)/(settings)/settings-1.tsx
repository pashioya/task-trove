import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function Settings() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Container>
        <Link href="/locationSettings">Location Settings</Link>
        <Link href="/notificationSettings">Notification Settings</Link>
      </Container>
    </>
  );
}
