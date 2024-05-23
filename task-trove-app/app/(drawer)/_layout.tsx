import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Redirect, useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useSession } from '~/contexts/session-provider';
import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';
import { Text } from 'react-native';
import colors from 'tailwindcss/colors';
import { Menu } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { DrawerActions } from '@react-navigation/native';

export default function DrawerLayout() {
  const { isError } = useSettingsStore();
  const { isTracking } = useToggleShareLocation();
  const { session, isLoading } = useSession();
  const { isDarkColorScheme } = useColorScheme();
  const navigation = useNavigation();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }
  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <MaterialIcons
            name="my-location"
            size={30}
            color={isError ? 'red' : isTracking ? 'blue' : 'gray'}
          />
        ),
        headerLeft: () => (
          <Menu
            size={27}
            onPress={toggleDrawer}
            style={{ marginLeft: 15 }}
            color={isDarkColorScheme ? colors.blue[600] : colors.black}
          />
        ),
        drawerType: 'slide',
        drawerActiveBackgroundColor: colors.blue[300],
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
        name="settings"
        options={{
          headerTitle: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}
