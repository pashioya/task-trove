import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Link, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useSession } from '~/contexts/session-provider';
import { Text } from 'tamagui';

export default function DrawerLayout() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <Link href="/(app)/(drawer)/(settings)/location-settings">
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
