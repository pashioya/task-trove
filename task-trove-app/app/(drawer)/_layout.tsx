import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      headerShown: true,
      drawerHideStatusBarOnOpen: true,
      drawerActiveBackgroundColor: colorTokens.light.blue.blue4,
      headerTitleAlign: 'center',
    }}>
    <Drawer.Screen
      name="(home)"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Boards"
      options={{
        headerTitle: 'Boards',
        drawerLabel: 'Boards',
        drawerIcon: ({ size, color }) => <Ionicons name="list-outline" size={size} color={color} />,
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

export default DrawerLayout;
