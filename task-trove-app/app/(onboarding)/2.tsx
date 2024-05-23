import { router, Stack } from 'expo-router';

import { useSettingsStore } from '~/store';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import LocationItemSelects from '~/components/LocationItemSelects';

export default function Two() {
  const { item } = useSettingsStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two', headerShown: false }} />

      <View className="my-container justify-between">
        <View className="align-center">
          <Text className="my-header pt-20">Location Board Selection</Text>
          <Text className="my-text">Where would you like to save your location</Text>
        </View>
        <View>
          <LocationItemSelects />
        </View>

        <View>
          <Button onPress={() => router.push('/(onboarding)/1')}>
            <Text>Back</Text>
          </Button>
          <Button className="bg-black" onPress={() => router.replace('/')} disabled={!item}>
            <Text>Finish</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
