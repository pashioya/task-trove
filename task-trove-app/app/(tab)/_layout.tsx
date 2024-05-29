import { Redirect, router, Tabs } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { ActivityIndicator, Pressable, View } from 'react-native';
import {
  CirclePauseIcon,
  CirclePlayIcon,
  ClipboardListIcon,
  Home,
  LocateFixedIcon,
} from 'lucide-react-native';

import { Text } from '~/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useSettingsStore } from '~/store';
import colors from 'tailwindcss/colors';
import { useToggleShareLocation } from '~/hooks';

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const { isTracking } = useSettingsStore();
  const { toggleShareLocation } = useToggleShareLocation();

  if (isLoading) {
    return (
      <View className="my-container justify-center align-center">
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
          backgroundColor: colors.blue[50],
          padding: 7,
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
          <View
            className="bg-blue-50 rounded-full p-1"
            style={{
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <LocateFixedIcon
              size={50}
              fill={isTracking ? colors.blue[300] : colors.black}
              color={isTracking ? colors.blue[500] : colors.gray[300]}
            />
          </View>
        ),
        headerRight: () => (
          <Pressable onPress={() => router.navigate('/(tab)/settings/main')}>
            <Avatar
              alt="profile-pic"
              className="w-[60] h-[60] mr-5"
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
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
          bottom: 25,
          left: 20,
          right: 20,
          height: 70,
          elevation: 5,
          borderRadius: 20,
          backgroundColor: colors.blue[50],
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
          tabBarIcon: ({ focused }) => <Home color={focused ? 'blue' : 'black'} size={30} />,
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 15,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
        }}
        options={{
          lazy: true,

          tabBarStyle: {
            display: 'none',
          },
          headerShown: false,
          tabBarIcon: () =>
            isTracking ? (
              <CirclePauseIcon
                onPress={() => toggleShareLocation()}
                fill="white"
                color="black"
                className="bg-white"
                size={75}
              />
            ) : (
              <CirclePlayIcon
                onPress={() => toggleShareLocation()}
                fill="white"
                color="black"
                className="bg-white"
                size={75}
              />
            ),
          tabBarIconStyle: {
            marginTop: -40,
          },
          tabBarShowLabel: false,
          tabBarLabel: '',
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          headerTitle: 'Tasks',
          tabBarIcon: ({ focused }) => (
            <ClipboardListIcon color={focused ? 'blue' : 'black'} size={30} />
          ),
          title: 'Tasks',
          tabBarBadge: 3,
          tabBarLabel: 'Tasks',
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 15,
            fontWeight: 'bold',
          },
        }}
      />
    </Tabs>
  );
}
