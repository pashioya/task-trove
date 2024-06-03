import { Redirect, router, Tabs } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { ClipboardListIcon, Home, LocateFixedIcon, SettingsIcon } from 'lucide-react-native';

import { Text } from '~/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useSettingsStore } from '~/store';
import colors from 'tailwindcss/colors';
import { useTasks } from '~/hooks';
import { useColorScheme } from '~/lib/useColorScheme';

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const { isTracking } = useSettingsStore();
  const { tableTasks } = useTasks();
  const { isDarkColorScheme } = useColorScheme();

  if (isLoading) {
    return (
      <View className="flex-1 p-16 justify-center align-center">
        <ActivityIndicator size={45} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      detachInactiveScreens
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerTitleStyle: {
          backgroundColor: isDarkColorScheme ? colors.neutral[700] : colors.blue[50],
          padding: 7,
          marginRight: 14,
          borderRadius: 10,
          elevation: 5,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        headerLeft: () => (
          <View className="rounded-full p-1 shadow-2xl">
            <LocateFixedIcon
              size={50}
              fill={
                isTracking
                  ? colors.blue[300]
                  : isDarkColorScheme
                    ? colors.neutral[600]
                    : colors.gray[100]
              }
              color={isTracking ? colors.blue[500] : colors.gray[500]}
            />
          </View>
        ),
        headerRight: () => (
          <Pressable className="shadow-2xl" onPress={() => router.navigate('/(tab)/settings/main')}>
            <Avatar alt="profile-pic" className="w-[60] h-[60] mr-5 shadow-2xl">
              <AvatarImage source={{ uri: session.user?.thumbnail }} />
              <AvatarFallback>
                <Text>TR</Text>
              </AvatarFallback>
            </Avatar>
          </Pressable>
        ),
        headerRightContainerStyle: {
          marginRight: 20,
        },

        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 60,
          left: 20,
          right: 20,
          height: 70,
          elevation: 5,
          borderRadius: 20,
          backgroundColor: isDarkColorScheme ? colors.neutral[700] : colors.blue[50],
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerTitle: 'Task Trove',
          tabBarIcon: ({ focused }) => (
            <Home
              color={
                isDarkColorScheme
                  ? focused
                    ? colors.blue[200]
                    : colors.neutral[100]
                  : focused
                    ? colors.blue[500]
                    : 'black'
              }
              size={30}
            />
          ),
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIconStyle: {
            position: 'absolute',
            top: 25,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            position: 'absolute',
            top: 40,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          headerTitle: '',
          headerTitleContainerStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <ClipboardListIcon
              color={
                isDarkColorScheme
                  ? focused
                    ? colors.blue[200]
                    : colors.neutral[100]
                  : focused
                    ? colors.blue[500]
                    : 'black'
              }
              size={30}
            />
          ),
          tabBarBadge: tableTasks.length,
          tabBarLabel: 'Tasks',
          tabBarIconStyle: {
            position: 'absolute',
            top: 25,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            position: 'absolute',
            top: 40,
            fontWeight: 'bold',
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: 'Settings',
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SettingsIcon
              color={
                isDarkColorScheme
                  ? focused
                    ? colors.blue[200]
                    : colors.neutral[100]
                  : focused
                    ? colors.blue[500]
                    : 'black'
              }
              size={35}
            />
          ),
          tabBarLabel: 'Settings',
          tabBarIconStyle: {
            position: 'absolute',
            top: 25,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            position: 'absolute',
            top: 40,
          },
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Tabs>
  );
}
