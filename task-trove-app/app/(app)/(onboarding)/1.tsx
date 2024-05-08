import { router, Stack } from 'expo-router';

import { View } from 'react-native';
import { Button, Text, XStack } from 'tamagui';

import { Container } from '~/components/Container';

export default function One() {
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding One' }} />
      <Container>
        <View>
          <Text fontSize={40} color="blue">
            Onboarding One
          </Text>
          <Text>Description</Text>
          <XStack gap="$4" justifyContent="center">
            <Button onPress={() => router.navigate('/(app)/(authentication)/login')}>Login</Button>
            <Button onPress={() => router.push('/2')}>Next</Button>
          </XStack>
        </View>
      </Container>
    </>
  );
}
