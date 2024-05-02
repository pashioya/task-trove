import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useContext, useEffect } from 'react';

import AuthContext from '~/contexts/AuthenticationContext';

export default function DrawerLayout() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext.isAuthenticated && !authContext.isPendingAuthentication) {
      console.log('Redirecting to /Login');
      router.replace('/login');
    }
  }, [authContext]);

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerRight: () => <MaterialIcons name="my-location" size={24} color="blue" />,
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
