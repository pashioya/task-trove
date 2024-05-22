import { router, Stack } from 'expo-router';
import { Button, Text, View, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import LocationItemSelects from '~/components/LocationItemSelects';
import { useSettingsStore } from '~/store';

import { mondayColors } from '~/tamagui.config';

export default function Two() {
  const { item } = useSettingsStore();
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two', headerShown: false }} />
      <Container>
        <View>
          <YStack gap="$4" alignItems="center" height="40%" marginTop={160}>
            <Text textAlign="center" color={mondayColors.mondayPurple} fontSize={40}>
              Location Board Selection
            </Text>
            <Text color="black">Where would you like to save your location</Text>
          </YStack>
          <LocationItemSelects />
          <XStack marginTop={20} gap="$4" justifyContent="center">
            <Button onPress={() => router.push('/(app)/(onboarding)/1')}>Back</Button>
            <Button
              backgroundColor={!item.id ? 'gray' : 'black'}
              onPress={() => router.replace('/')}
              disabled={!item.id}
            >
              Finish
            </Button>
          </XStack>
        </View>
      </Container>
    </>
  );
}
