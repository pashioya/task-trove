import { Link, Stack, router } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '~/contexts/session-provider';
import { Text } from '~/components/ui/text';
import { ChevronRight, Edit3, Mail, Moon, Navigation } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { Switch } from '~/components/ui/switch';
import colors from 'tailwindcss/colors';

export default function Settings() {
  const { session } = useSession();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const newTheme = isDarkColorScheme ? 'light' : 'dark';

  const rowColor = isDarkColorScheme ? colors.gray[900] : colors.gray[100];

  return (
    <>
      <Stack.Screen options={{ title: 'Boards' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1">
          <View className="p-6 items-center justify-center">
            <View className="relative">
              <Image
                alt=""
                source={{
                  uri: session?.user?.thumbnail,
                }}
                style={{ width: 72, height: 72, borderRadius: 9999 }}
              />
            </View>

            <View>
              <Text className="mt-5 text-lg font-semibold text-center">{session?.user?.name}</Text>
              <Text className="mt-1 text-base text-center">{session?.user?.email}</Text>
            </View>
          </View>
          <ScrollView>
            <View className="px-6">
              <Text className="py-3 text-xs font-semibold tracking-wider">PREFERENCES</Text>
              <View
                style={{ backgroundColor: rowColor }}
                className="flex-row items-center justify-start h-12 bg-gray-100 rounded-lg mb-3 px-3"
              >
                <View
                  className="w-8 h-8 rounded-full mr-3 flex items-center justify-center bg-blue-500"
                  style={[{ backgroundColor: '#007afe' }]}
                >
                  <Moon color="#fff" size={20} />
                </View>
                <Text className="text-lg font-normal ">Dark Mode</Text>
                <View className="flex-grow" />
                <Switch
                  checked={isDarkColorScheme}
                  onCheckedChange={() => setColorScheme(newTheme)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  router.push('/settings/location');
                }}
                style={{ backgroundColor: rowColor }}
                className="flex-row items-center justify-start h-12  rounded-lg mb-3 px-3"
              >
                <View className="w-8 h-8 rounded-full mr-3 flex items-center justify-center bg-green-500">
                  <Navigation color="#fff" size={20} />
                </View>
                <Text className="text-lg font-normal ">Location</Text>
                <View className="flex-grow" />
                <ChevronRight color="#C6C6C6" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push('/settings/notifications');
                }}
                style={{ backgroundColor: rowColor }}
                className="flex-row items-center justify-start h-12  rounded-lg mb-3 px-3"
              >
                <View
                  className="w-8 h-8 rounded-full mr-3 flex items-center justify-center bg-green-500"
                  style={[{ backgroundColor: '#32c759' }]}
                >
                  <Navigation color="#fff" size={20} />
                </View>
                <Text className="text-lg font-normal ">Notifications</Text>
                <View className="flex-grow" />

                <ChevronRight color="#C6C6C6" size={20} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
