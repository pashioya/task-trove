import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '~/components/ui/text';

export default function Boards() {
  return (
    <>
      <Stack.Screen options={{ title: 'Boards' }} />
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text className="my-header pt-10">Boards </Text>
            <Link href="/">Home</Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
