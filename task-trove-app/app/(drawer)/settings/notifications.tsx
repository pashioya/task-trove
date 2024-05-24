import { Stack } from 'expo-router';

import { SafeAreaView, Text } from 'react-native';

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
