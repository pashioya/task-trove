import { Stack, router } from 'expo-router';
import { View } from 'lucide-react-native';
import { Touchable, TouchableOpacity } from 'react-native';
import { useSession } from '~/contexts/session-provider';
import {Text} from '~/components/ui/text';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const { signOut } = useSession();
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <View className='my-container'>
        <TouchableOpacity onPress={() => router.push('/(drawer)/settings/location')}>
          <View className='rounded m-10 p-10 w-100'>
            <View className='flex-row '>
              <Ionicons name="compass-outline" size={24} />
              <Text >Location</Text>
            </View>
            <View className='m-2'><View className='chevron-right'></View></View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(drawer)/settings/notifications')}>
          <View className='rounded m-10 p-10 justify-between items-center'>
            <View className='flex-row w-100'>
              <Ionicons name="notifications-outline" size={24} />
              <Text>Notifications</Text>
            </View>
            </View>
            </TouchableOpacity>
      </View>
      {/* <Container>
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

        <Button
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          backgroundColor="red"
          onPress={() => signOut}
        >
          Logout
        </Button>
      </Container> */}
    </>
  );
}
