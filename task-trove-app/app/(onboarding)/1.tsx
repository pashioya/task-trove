import { router, Stack } from 'expo-router';

import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';

export default function One() {
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding One' }} />
      <View className="my-container justify-center">
        <View className="align-center ">
          <Text className="my-header pt-20">Welcome To TaskTrove</Text>
          <Text className="my-text">Keep Track of your location</Text>
          <Text className="my-text">Keep track of your tasks as well</Text>
          <View>
            <Button onPress={() => router.push('/(onboarding)/2')}>
              <Text>Begin</Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
}
