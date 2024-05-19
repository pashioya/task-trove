import { Ionicons } from '@expo/vector-icons';
import { ChevronRight } from '@tamagui/lucide-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { Text, Button, YStack, XStack } from 'tamagui';

import { Container } from '~/components/Container';
import { useSession } from '~/contexts/session-provider';

export default function Settings() {
  const { signOut } = useSession();
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />

      <Container>
        <YStack height="95%">
          <TouchableOpacity onPress={() => router.push('/(app)/(drawer)/settings/location')}>
            <XStack
              borderRadius={10}
              margin={10}
              alignItems="center"
              padding={10}
              backgroundColor="white"
              justifyContent="space-between"
            >
              <XStack gap={15}>
                <Ionicons marginTop={2} name="compass-outline" size={24} />
                <Text fontSize={24} color="black">
                  Location
                </Text>
              </XStack>
              <ChevronRight marginTop={2} color="black" size={24} />
            </XStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(app)/(drawer)/settings/notifications')}>
            <XStack
              borderRadius={10}
              margin={10}
              alignItems="center"
              padding={10}
              backgroundColor="white"
              justifyContent="space-between"
            >
              <XStack gap={15}>
                <Ionicons marginTop={2} name="notifications-outline" size={24} />
                <Text fontSize={24} color="black">
                  Notifications
                </Text>
              </XStack>
              <ChevronRight marginTop={2} color="black" size={24} />
            </XStack>
          </TouchableOpacity>
        </YStack>

        <Button backgroundColor="red" onPress={() => signOut}>
          Logout
        </Button>
      </Container>
    </>
  );
}
