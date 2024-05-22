import { ChevronRight } from '@tamagui/lucide-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { Label, Switch, Text, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import { DialogInstance } from '~/components/Dialog';
import { NotificationRangeSelector } from '~/components/NotificationRangeSelector';

export default function NotificationSettings() {
  return (
    <>
      <Stack.Screen options={{ title: 'NotificationSettings' }} />
      <Container>
        <YStack alignItems="center">
          <XStack
            disabled
            width="100%"
            gap={15}
            backgroundColor="white"
            borderRadius={10}
            borderWidth={1}
            alignItems="center"
            justifyContent="space-between"
            padding={20}
          >
            <Label disabled fontSize={24} color="black">
              Push Notifications
            </Label>
            <Switch backgroundColor="blue" onCheckedChange={checked => console.log(checked)}>
              <Switch.Thumb backgroundColor="white" animation="lazy" />
            </Switch>
          </XStack>
          <DialogInstance
            title="Notification Range Selector"
            trigger={
              <TouchableOpacity>
                <XStack
                  borderRadius={10}
                  borderWidth={1}
                  margin={10}
                  alignItems="center"
                  padding={20}
                  backgroundColor="white"
                  justifyContent="space-between"
                >
                  <XStack width="100%" gap={15}>
                    <Text fontSize={24} color="black">
                      Notification Range Selector
                    </Text>
                  </XStack>
                  <ChevronRight marginTop={2} color="black" size={24} />
                </XStack>
              </TouchableOpacity>
            }
            description="Select the range before you receive a notification."
            content={<NotificationRangeSelector />}
          />
        </YStack>
      </Container>
    </>
  );
}
