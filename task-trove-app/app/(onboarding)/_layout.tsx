import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import colors from 'tailwindcss/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'dark',
        statusBarColor: 'transparent',
      }}
    >
      <Stack.Screen name="1" options={{ title: 'Onboarding One' }} />
      <Stack.Screen
        name="2"
        options={{
          title: 'Onboarding Two',
          headerBackground: () => (
            <LinearGradient colors={[colors.blue[950], colors.blue[900]]} style={{ flex: 1 }} />
          ),

          headerTintColor: colors.white,
          headerBackVisible: true,
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="3"
        options={{
          title: 'Onboarding Three',
          headerBackground: () => (
            <LinearGradient colors={[colors.blue[950], colors.blue[900]]} style={{ flex: 1 }} />
          ),

          headerTintColor: colors.white,
          headerBackVisible: true,
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen name="4" options={{ title: 'Onboarding Four' }} />
    </Stack>
  );
}
