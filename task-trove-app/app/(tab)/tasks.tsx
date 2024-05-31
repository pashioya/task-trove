import { Stack } from 'expo-router';

import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleDialog } from '~/components/SimpleDialog';
import SimpleSkeleton from '~/components/SimpleSkeleton';
import TaskCard from '~/components/TaskCard';
import TaskListCard from '~/components/TaskListCard';

import { Text } from '~/components/ui/text';
import type { Task } from '~/model/types';

export default function Tasks() {
  const taskIsLoading = false;

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
                <Text className="text-xl font-bold ">{tasks.length}</Text>
              </View>
              <View className=" grow shrink basis-0 flex-col items-center justify-center p-6 border-l border-gray-400">
                <Text className=" text-lg font-medium mb-4 text-center">Closest Task</Text>
                <Text className="text-xl font-bold ">&quot;Placeholder&quot;</Text>
              </View>
            </View>
          </View>
          <View className="items-center ml-5 w-full h-full gap-4 justify-center">
            {tasks.length > 1 ? (
              <FlatList
                className="w-full"
                data={tasks}
                renderItem={({ item }: { item: Task }) => (
                  <SimpleDialog
                    trigger={<TaskListCard title={item.name} description={item.id} />}
                    title=""
                    content={
                      <TaskCard
                        item={{
                          id: item.id,
                          name: item.name,
                          lat: item.lat,
                          long: item.long,
                        }}
                      />
                    }
                  />
                )}
                contentContainerStyle={{ paddingBottom: 600 }}
                ItemSeparatorComponent={() => <View className="h-2" />}
              />
            ) : // ! For UI building purposes only - remove when implementing the above
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            taskIsLoading ? (
              <>
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
              </>
            ) : (
              <Text>No Tasks Found</Text>
            )}
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
    id: '132',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '1145',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '15231',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '153125',
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

// const tasks: Task[] = [];
