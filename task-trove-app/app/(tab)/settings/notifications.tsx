import { Stack } from 'expo-router';

import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationSettings() {
  return (
    <>
      <Stack.Screen options={{ title: 'NotificationSettings' }} />
      <SafeAreaView>
        <Text>NotificationSettings</Text>
      </SafeAreaView>
    </>
  );
}
