import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Link, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useContext, useEffect } from 'react';

import AuthContext from '~/contexts/AuthenticationContext';

export default function DrawerLayout() {
  const isAuthenticated = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated.isAuthenticated) {
      console.log('Redirecting to /Login');
      router.replace('/login');
    }
  }, [isAuthenticated]);

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <Link href="/map">
            <MaterialIcons name="my-location" size={24} color="blue" />
          </Link>
        ),
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.light.blue.blue4,
        headerTitleAlign: 'center',
        headerRightContainerStyle: {
          paddingRight: 15,
        },
      }}
    >
      <Drawer.Screen
        name="(home)"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="boards"
        options={{
          headerTitle: 'Boards',
          drawerLabel: 'Boards',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(settings)"
        options={{
          headerTitle: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}
