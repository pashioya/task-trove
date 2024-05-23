import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: 'blue' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name="1" options={{ title: 'Onboarding One' }} />
      <Stack.Screen name="2" options={{ title: 'Onboarding Two' }} />
    </Stack>
  );
}
