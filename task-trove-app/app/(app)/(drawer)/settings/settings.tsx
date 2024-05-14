import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';

export default function Settings() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Container>
        <Link href="/location-settings">Location Settings</Link>
        <Link href="/notification-settings">Notification Settings</Link>
      </Container>
    </>
  );
}
