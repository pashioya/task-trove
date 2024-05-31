import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleCard from '~/components/SimpleCard';
import { Text } from '~/components/ui/text';
import type { Task } from '~/model/types';

export default function Tasks() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tasks' }} />
      <SafeAreaView>
        <View className="px-6 mt-24">
          <View className="border-b-gray-200 border-b">
            <Text className="font-bold text-4xl mb-2">Your Tasks</Text>
            <View className="flex-row items-center justify-between">
              <View className=" grow shrink basis-0 flex-col items-center justify-center p-6">
                <Text className=" text-lg font-medium mb-4 text-center">Number of Tasks</Text>
                <Text className="text-xl font-bold ">5</Text>
              </View>
              <View className=" grow shrink basis-0 flex-col items-center justify-center p-6 border-l border-gray-400">
                <Text className=" text-lg font-medium mb-4 text-center">Closest Task</Text>
                <Text className="text-xl font-bold ">802 Meters</Text>
              </View>
            </View>
          </View>
          <View className="items-center w-full gap-4">
            <FlatList
              className="w-full "
              data={tasks}
              renderItem={({ item }: { item: Task }) => (
                <SimpleCard title={item.name} description={item.id} />
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const tasks: Task[] = [
  {
    id: '1',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '2',
    name: 'Task Two',
    lat: 40.7128,
    long: -74.006,
  },
  {
    id: '3',
    name: 'Task Three',
    lat: 37.7749,
    long: -122.4194,
  },
  {
    id: '4',
    name: 'Task Four',
    lat: 51.5074,
    long: -0.1278,
  },
  {
    id: '5',
    name: 'Task Five',
    lat: 48.8566,
    long: 2.3522,
  },
  {
    id: '6',
    name: 'Task Six',
    lat: 35.6895,
    long: 139.6917,
  },
];
