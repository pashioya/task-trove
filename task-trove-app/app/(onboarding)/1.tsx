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
        {/* <YStack height="70%" gap="$4" marginTop={160}>
            <Title color={mondayColors.mondayPurple} textAlign="center" fontSize={40}>
              Welcome To TaskTrove
            </Title>
            <Separator width="70%" alignSelf="center" />
            <Text textAlign="center" color="black">
              Keep Track of your location
            </Text>
            <Text textAlign="center" color="black">
              Keep track of your tasks as well
            </Text>
          </YStack>
          <XStack gap="$4" justifyContent="center">
            <Button fontSize={20} onPress={() => router.push('/(app)/(onboarding)/2')}>
              Begin
            </Button>
          </XStack> */}
      </View>
    </>
  );
}
