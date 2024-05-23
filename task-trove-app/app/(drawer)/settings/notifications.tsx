import { Stack } from 'expo-router';
import { View } from 'lucide-react-native';
import { useState } from 'react';

import { Text } from 'react-native';

export default function NotificationSettings() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Stack.Screen options={{ title: 'NotificationSettings' }} />
      <View>
        <Text>NotificationSettings</Text>
      </View>
      {/* <Container>
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
          <TouchableOpacity onPress={() => setOpenModal(true)}>
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
          <SimpleSheet
            open={openModal}
            modal
            snapPointsMode="fit"
            position={0}
            content={<NotificationRangeSelector />}
          />
        </YStack>
      </Container> */}
    </>
  );
}
