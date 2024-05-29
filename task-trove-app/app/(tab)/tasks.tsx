import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleTable from '~/components/SimpleTable';

export default function Tasks() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tasks' }} />
      <SafeAreaView>
        <ScrollView>
          <View className="pt-20">
            <SimpleTable />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
