import { router, Stack } from 'expo-router';

import { useSettingsStore } from '~/store';
import { SafeAreaView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import LocationItemSelects from '~/components/LocationItemSelects';

export default function Four() {
  const { item, setOnboardingCompleted } = useSettingsStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Four', headerShown: true, headerTitle: '' }} />
      <SafeAreaView className="my-container justify-between">
        <View className="align-center">
          <Text className="my-header leading-relaxed pt-20">Location Board Selection</Text>
          <Text className="my-text text-xl pt-10">Where would you like to save your location?</Text>
        </View>
        <View>
          <LocationItemSelects />
        </View>

        <View>
          <Button
            className="bg-black"
            onPress={() => {
              setOnboardingCompleted(true);
              router.replace('/');
            }}
            disabled={!item}
          >
            <Text>Finish</Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}
