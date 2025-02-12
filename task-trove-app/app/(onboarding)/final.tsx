import { router, Stack } from 'expo-router';

import { useSettingsStore } from '~/store';
import { ScrollView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import LocationItemSelects from '~/components/LocationItemSelects';
import colors from 'tailwindcss/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function Final() {
  const { item, setOnboardingCompleted } = useSettingsStore();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Onboarding Two',
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <View className="h-full">
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={[colors.white, colors.blue[100]]}
        >
          <ScrollView>
            <View className="py-4 flex-1 item-center ">
              <View className="px-6">
                <Text className="mt-52 text-2xl font-semibold leading-relaxed text-center">
                  Location Board Selection
                </Text>
                <Text className="my-text text-l text-center mb-1">
                  Where would you like to save your location?
                </Text>
                <LocationItemSelects />
              </View>
            </View>
          </ScrollView>
          <Button
            className="absolute bottom-10  rounded-md w-96 self-center"
            onPress={() => {
              setOnboardingCompleted(true);
              router.replace('/');
            }}
            disabled={!item}
          >
            <Text>Finish</Text>
          </Button>
        </LinearGradient>
      </View>
    </>
  );
}
