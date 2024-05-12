import { router, Stack } from 'expo-router';

import { View } from 'react-native';
import { Button, Text, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import { Title } from '~/tamagui.config';

export default function One() {
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding One' }} />
      <Container>
        <View>
          <YStack gap="$4">
            <Title textAlign="center" fontSize={40}>
              {' '}
              Onboarding One
            </Title>
            <Text color="black">Welcome to the onboarding process! This is the first screen.</Text>
            <XStack gap="$4" justifyContent="center">
              <Button onPress={() => router.navigate('/(app)/(authentication)/login')}>
                Login
              </Button>
              <Button onPress={() => router.push('/2')}>Next</Button>
            </XStack>
          </YStack>
        </View>
      </Container>
    </>
  );
}
