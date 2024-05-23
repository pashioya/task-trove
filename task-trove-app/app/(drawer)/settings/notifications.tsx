import { Stack } from 'expo-router';
import { View } from 'lucide-react-native';

import { Text } from 'react-native';

export default function NotificationSettings() {
  return (
    <>
      <Stack.Screen options={{ title: 'NotificationSettings' }} />
      <View>
        <Text>NotificationSettings</Text>
      </View>
    </>
  );
}
