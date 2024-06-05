import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        animation: 'fade_from_bottom',
        animationDuration: 1000,
      }}
    >
      <Stack.Screen
        name="select-location"
        options={{
          presentation: 'modal',
          animation: 'fade_from_bottom',
          animationDuration: 1000,
        }}
      />
      <Stack.Screen
        name="select-tasks"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 1000,
        }}
      />
    </Stack>
  );
}
