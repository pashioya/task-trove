import { router, Stack } from 'expo-router';

import { View } from 'react-native';
import { Button, Separator, Text, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import { mondayColors, Title } from '~/tamagui.config';

export default function One() {
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding One' }} />
      <Container>
        <View>
          <YStack height="70%" gap="$4" marginTop={160}>
            <Title color={mondayColors.mondayPurple} textAlign="center" fontSize={40}>
              Welcome To TaskTrove
            </Title>
            <Separator width="70%" alignSelf="center" />
            <Text textAlign="center" color="black">
              Keep Track of your location
            </Text>
            <Text textAlign="center" color="black">
              Keep track of your tasks as well
            </Text>
          </YStack>
          <XStack gap="$4" justifyContent="center">
            <Button fontSize={20} onPress={() => router.push('/(app)/(onboarding)/2')}>
              Begin
            </Button>
          </XStack>
        </View>
      </Container>
    </>
  );
}
