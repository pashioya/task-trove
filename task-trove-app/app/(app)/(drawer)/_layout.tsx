import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      headerShown: true,
      headerRight: () => (
        <Link href="/Map">
          <MaterialIcons name="my-location" size={24} color="blue" />
        </Link>
      ),
      drawerHideStatusBarOnOpen: true,
      drawerActiveBackgroundColor: colorTokens.light.blue.blue4,
      headerTitleAlign: 'center',
      headerRightContainerStyle: {
        paddingRight: 15,
      },
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
