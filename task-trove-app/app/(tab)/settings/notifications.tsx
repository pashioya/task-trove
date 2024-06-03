import { Stack, router } from 'expo-router';
import { ChevronRight, LucideMoveLeft } from 'lucide-react-native';

import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleDialog } from '~/components/SimpleDialog';
import { useColorScheme } from '~/lib/useColorScheme';
import colors from 'tailwindcss/colors';
import TaskColumnSelects from '~/components/TaskColumnSelects';
import { Text } from '~/components/ui/text';

export default function NotificationSettings() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Notification',
          headerShadowVisible: false,
          headerLeft: () => (
            <LucideMoveLeft
              onPress={() => router.back()}
              color={isDarkColorScheme ? colors.gray[200] : colors.gray[800]}
              size={45}
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1">
          <ScrollView>
            <View className="px-6">
              <Text className="py-3 text-xs font-semibold uppercase tracking-wider mb-8">
                Notifications
              </Text>
              <SimpleDialog
                trigger={
                  <View className="flex-row bg-secondary items-center justify-start h-12 rounded-lg mb-3 px-3">
                    <Text className="text-lg font-normal">Change Task Column</Text>
                    <View className="flex-1" />
                    <ChevronRight color="#C6C6C6" size={20} />
                  </View>
                }
                title="Change Task Column"
                content={<TaskColumnSelects />}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
