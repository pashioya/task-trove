import { router, Stack } from 'expo-router';

import { useSettingsStore } from '~/store';
import { ScrollView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import LocationItemSelects from '~/components/LocationItemSelects';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Two() {
  const { item, setOnboardingCompleted } = useSettingsStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two', headerShown: true, headerTitle: '' }} />
      <SafeAreaView>
        <View>
          <ScrollView className="m-4 ">
            <View>
              <Text className="my-header leading-relaxed text-center">
                Location Board Selection
              </Text>
              <Text className="my-text text-xl text-center mb-1">
                Where would you like to save your location?
              </Text>
            </View>
            <View>
              <LocationItemSelects />
              <Button
                className="rounded-md w-[50%] mt-4 self-center "
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
        </View>
      </SafeAreaView>
    </>
  );
}
