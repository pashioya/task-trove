import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="One" options={{ title: 'Onboarding One' }} />
      <Stack.Screen name="Two" options={{ title: 'Onboarding Two' }} />
    </Stack>
  );
}
