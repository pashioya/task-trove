import { Stack } from 'expo-router';

import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleDialog } from '~/components/SimpleDialog';
import SimpleSkeleton from '~/components/SimpleSkeleton';
import TaskCard from '~/components/TaskCard';
import TaskListCard from '~/components/TaskListCard';

import { Text } from '~/components/ui/text';
import { useTasks } from '~/hooks';
import type { Task } from '~/model/types';

export default function Tasks() {
  const { tableTasks, itemsAreLoading } = useTasks();

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
                <Text className="text-xl font-bold ">{tableTasks.length}</Text>
              </View>
              <View className=" grow shrink basis-0 flex-col items-center justify-center p-6 border-l border-gray-400">
                <Text className=" text-lg font-medium mb-4 text-center">Closest Task</Text>
                <Text className="text-xl font-bold ">&quot;Placeholder&quot;</Text>
              </View>
            </View>
          </View>
          <View className="items-center w-full h-full gap-4 justify-center">
            {tableTasks.length > 1 ? (
              <FlatList
                className="w-full"
                data={tableTasks}
                renderItem={({ item }: { item: Task }) => (
                  <SimpleDialog
                    trigger={<TaskListCard task={item} />}
                    title=""
                    clasNames="p-0 rounded-2xl border-spacing-0"
                    withHeader={false}
                    withClose={false}
                    content={
                      <TaskCard
                        task={{
                          id: item.id,
                          name: item.name,
                          address: item.address,
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
            ) : itemsAreLoading ? (
              <>
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
                <SimpleSkeleton />
              </>
            ) : (
              <>
                <Text className="text-lg font-medium text-center pb-52 mb-96">
                  You have no tasks assigned to you.
                </Text>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
