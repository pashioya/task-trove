import { router, Stack } from 'expo-router';

import { useSettingsStore } from '~/store';
import { ScrollView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import LocationItemSelects from '~/components/LocationItemSelects';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import colors from 'tailwindcss/colors';

export default function Two() {
  const { item, setOnboardingCompleted } = useSettingsStore();
  NavigationBar.setBackgroundColorAsync(colors.white);
  NavigationBar.setButtonStyleAsync('dark');

  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two', headerShown: false, headerTitle: '' }} />
      <SafeAreaView className="h-full">
        <ScrollView className="h-full">
          <View className="h-full py-10 flex-1 item-center justify-between">
            <View>
              <Text className="text-2xl font-semibold leading-relaxed text-center">
                Location Board Selection
              </Text>
              <Text className="my-text text-l text-center mb-1">
                Where would you like to save your location?
              </Text>
              <LocationItemSelects />
            </View>
            <Button
              className="rounded-md w-96 mt-4 self-center bg-blue-700"
              onPress={() => {
                setOnboardingCompleted(true);
                router.replace('/');
              }}
              disabled={!item}
            >
              <Text>Finish</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
