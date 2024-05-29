import { Stack, router } from 'expo-router';
import { View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '~/contexts/session-provider';
import { Text } from '~/components/ui/text';
import { ChevronRight, LocateFixedIcon, LucideMoveLeft, Moon } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { Switch } from '~/components/ui/switch';
import colors from 'tailwindcss/colors';
import { Button } from '~/components/ui/button';
import SimpleAlertDialog from '~/components/SimpleAlertDialog';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings() {
  const { session, signOut } = useSession();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const newTheme = isDarkColorScheme ? 'light' : 'dark';

  const rowColor = isDarkColorScheme ? colors.gray[800] : colors.white;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={[colors.white, colors.blue[100]]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-1">
            <Button
              onPress={() => router.navigate('/')}
              variant="outline"
              className="absolute top-16 left-6 z-10"
            >
              <LucideMoveLeft color="black" size={45} />
            </Button>
            <View className="mt-12 p-6 items-center justify-center">
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
                <Text className="text-lg font-semibold text-center">{session?.user?.name}</Text>
                <Text className="mt-1 text-base text-center">{session?.user?.email}</Text>
              </View>
            </View>
            <ScrollView>
              <View className="px-6 flex-1 justify-between">
                <View>
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
                      disabled
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
                    <View className="w-8 h-8 rounded-full mr-3 flex items-center justify-center bg-blue-500">
                      <LocateFixedIcon color="#fff" size={20} />
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
                    <View className="w-8 h-8 rounded-full mr-3 flex items-center justify-center bg-blue-500">
                      <Ionicons name="notifications-outline" size={20} color="#fff" />
                    </View>
                    <Text className="text-lg font-normal ">Notifications</Text>
                    <View className="flex-grow" />

                    <ChevronRight color="#C6C6C6" size={20} />
                  </TouchableOpacity>
                </View>

                <SimpleAlertDialog
                  trigger={
                    <Button variant="destructive" className=" border-red-600">
                      <Text>Logout</Text>
                    </Button>
                  }
                  actionIfConfirmed={signOut}
                  title="Are you sure you want to logout?"
                  description="Do you want to logout from your account? You can always login back."
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
