import { Stack } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleDialog } from '~/components/SimpleDialog';
import { useColorScheme } from '~/lib/useColorScheme';
import colors from 'tailwindcss/colors';
import TaskColumnSelects from '~/components/TaskColumnSelects';

export default function NotificationSettings() {
  const { isDarkColorScheme } = useColorScheme();
  const rowColor = isDarkColorScheme ? colors.gray[900] : colors.gray[100];

  return (
    <>
      <Stack.Screen options={{ title: 'Notification', headerShadowVisible: false }} />
      <SafeAreaView>
        <Text>Notification Settings</Text>
      <Stack.Screen options={{ title: 'Boards' }} />
      <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
        <View className="flex-1">
          <ScrollView>
            <View className="px-6">
              <Text className="py-3 text-xs font-semibold uppercase tracking-wider mb-8">
                Notifications
              </Text>
              <SimpleDialog
                trigger={
                  <View
                    style={{ backgroundColor: rowColor }}
                    className="flex-row items-center justify-start h-12 rounded-lg mb-3 px-3"
                  >
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
