import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function Settings() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Container>
        <Link href="/LocationSettings">Location Settings</Link>
        <Link href="/NotificationSettings">Notification Settings</Link>
      </Container>
    </>
  );
}
