import { Redirect, router, Tabs } from 'expo-router';
import { useSession } from '~/contexts/session-provider';
import { ActivityIndicator, Pressable, View } from 'react-native';
import {
  ArrowLeft,
  CirclePauseIcon,
  CirclePlayIcon,
  Home,
  LocateFixedIcon,
} from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '~/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useSettingsStore } from '~/store';
import colors from 'tailwindcss/colors';
import { useToggleShareLocation } from '~/hooks';

export default function DrawerLayout() {
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
          backgroundColor: 'white',
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
          <Pressable
            className="bg-white rounded-full p-1"
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
            onPress={() => {
              router.push('/');
            }}
          >
            <LocateFixedIcon
              size={50}
              fill={isTracking ? colors.blue[300] : colors.black}
              color={isTracking ? colors.blue[500] : colors.gray[300]}
            />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable onPress={() => router.push('/(tab)/settings/main')}>
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
          backgroundColor: 'white',
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
        name="boards"
        options={{
          headerTitle: 'Boards',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="folder-outline" color={focused ? 'blue' : 'black'} size={30} />
          ),
          title: 'Boards',
          tabBarBadge: 3,
          tabBarLabel: 'Boards',
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 15,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: '',
          headerTitleContainerStyle: {
            backgroundColor: 'transparent',
            height: 0,
            width: 0,
          },
          tabBarStyle: {
            display: 'none',
          },
          headerLeft: () => <ArrowLeft color="black" onPress={() => router.back()} size={40} />,
          headerRight: () => null,
          tabBarIcon: ({ focused }) =>
            isTracking ? (
              <CirclePauseIcon
                onPress={() => toggleShareLocation()}
                fill="white"
                color={focused ? 'blue' : 'black'}
                className="bg-white"
                size={75}
              />
            ) : (
              <CirclePlayIcon
                onPress={() => toggleShareLocation()}
                fill="white"
                color={focused ? 'blue' : 'black'}
                className="bg-white"
                size={75}
              />
            ),
          tabBarIconStyle: {
            marginTop: -40,
          },
          tabBarLabel: '',
        }}
      />
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
    </Tabs>
  );
}
