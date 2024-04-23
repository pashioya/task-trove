import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { colorTokens } from '@tamagui/themes';

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      headerShown: true,
      drawerHideStatusBarOnOpen: true,
      drawerActiveBackgroundColor: colorTokens.light.blue.blue4,
      headerTitleAlign: 'center',
    }}>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
  </Drawer>
);

export default DrawerLayout;
