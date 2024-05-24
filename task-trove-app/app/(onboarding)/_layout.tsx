import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import colors from 'tailwindcss/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="1"
        options={{
          title: 'Onboarding One',
          headerBackground: () => (
            <LinearGradient colors={[colors.white, colors.blue[50]]} style={{ flex: 1 }} />
          ),
          headerTintColor: colors.blue[50],
          headerBackVisible: true,
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="2"
        options={{
          title: 'Onboarding Two',
          headerBackground: () => (
            <LinearGradient colors={[colors.blue[950], colors.blue[900]]} style={{ flex: 1 }} />
          ),

          headerTitle: '',
        }}
      />
      <Stack.Screen name="3" options={{ title: 'Onboarding Three' }} />
    </Stack>
  );
}
