import { Stack, router } from 'expo-router';
import { ChevronRight, LucideMoveLeft } from 'lucide-react-native';

import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '~/lib/useColorScheme';
import colors from 'tailwindcss/colors';
import TaskColumnSelects from '~/components/TaskColumnSelects';
import DescriptionColumnSelect from '~/components/DescriptionColumnSelect';

import { Text } from '~/components/ui/text';
import { MapRangePicker } from '~/components/MapRangePicker';
import { useSettingsStore } from '~/store';
import { Switch } from '~/components/ui/switch';

export default function NotificationSettings() {
  const { isDarkColorScheme } = useColorScheme();
  const { notificationRadius, setNotificationRadius, allowNotifications, setAllowNotifications } =
    useSettingsStore();

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
              <Pressable onPress={() => router.push('/(tab)/settings/(modals)/select-location')}>
                <View className="flex-row bg-secondary items-center justify-start h-12 rounded-lg mb-3 px-3">
                  <Text className="text-lg font-normal">Change Task Column</Text>
                  <View className="flex-1" />
                  <ChevronRight color="#C6C6C6" size={20} />
                </View>
              </Pressable>
              <View className="flex-row bg-secondary items-center justify-start h-12 rounded-lg mb-3 px-3">
                <Text className="text-lg font-normal">Allow Notifications</Text>
                <View className="flex-1" />
                <Switch
                  style={{
                    backgroundColor: allowNotifications ? colors.blue[500] : colors.gray[300],
                  }}
                  checked={allowNotifications}
                  onCheckedChange={() => setAllowNotifications(!allowNotifications)}
                />
              </View>
              <SimpleDialog
                trigger={
                  <View className="flex-row bg-secondary items-center justify-start h-12 rounded-lg mb-3 px-3">
                    <Text className="text-lg font-normal">Change Task Column</Text>
                    <View className="flex-1" />
                    <ChevronRight color="#C6C6C6" size={20} />
                  </View>
                }
                classNames="p-2"
                content={<TaskColumnSelects />}
              />
              <SimpleDialog
                trigger={
                  <View className="flex-row bg-secondary items-center justify-start h-12 rounded-lg mb-3 px-3">
                    <Text className="text-lg font-normal">Task Description Column</Text>
                    <View className="flex-1" />
                    <ChevronRight color="#C6C6C6" size={20} />
                  </View>
                }
                classNames="p-2"
                content={<DescriptionColumnSelect />}
              />
              <SimpleDialog
                trigger={
                  <View className="flex-row bg-secondary items-center justify-start h-12 rounded-lg mb-3 px-3">
                    <Text className="text-lg font-normal">Notification Range</Text>
                    <View className="flex-1" />
                    <ChevronRight color="#C6C6C6" size={20} />
                  </View>
                }
                title="Notification Range"
                withHeader
                content={
                  <MapRangePicker
                    currentRange={notificationRadius}
                    setCurrentRange={range => {
                      setNotificationRadius(range);
                    }}
                  />
                }
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
