import { Stack, router } from 'expo-router';
import { LucideMoveLeft } from 'lucide-react-native';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';

import TaskColumnSelects from '~/components/TaskColumnSelects';
import { Button } from '~/components/ui/button';
import { useColorScheme } from '~/lib/useColorScheme';
export default function TaskSelects() {
  const isPresented = router.canGoBack();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: {
            color: isDarkColorScheme ? colors.gray[200] : colors.gray[800],
          },
          headerLeft: () => (
            <LucideMoveLeft
              onPress={() => router.back()}
              color={isDarkColorScheme ? colors.gray[200] : colors.gray[800]}
              size={45}
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!isPresented && <Button onPress={() => router.replace('/')}>Dismiss</Button>}
        <TaskColumnSelects />
      </View>
    </>
  );
}
