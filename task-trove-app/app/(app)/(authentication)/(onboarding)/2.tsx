import { Stack } from 'expo-router';
import { Text } from 'tamagui';

import { Container } from '~/components/Container';

export default function Two() {
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two' }} />
      <Container>
        <Text>Hello!</Text>
      </Container>
    </>
  );
}
