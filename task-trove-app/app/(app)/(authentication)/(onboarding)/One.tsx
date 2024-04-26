import { Link, Stack } from 'expo-router';
import { Text } from 'tamagui';

import { Container } from '~/components/Container';

export default function One() {
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding One' }} />
      <Container>
        <Text>Onboarding One</Text>
        <Link href="/Two">Next</Link>
      </Container>
    </>
  );
}
