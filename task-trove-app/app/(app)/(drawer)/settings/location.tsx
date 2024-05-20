import { Stack } from 'expo-router';
import {
  XStack,
  YStack,
  Text,
  Accordion,
  Square,
  Circle,
  ScrollView,
  Switch,
  Label,
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

import { Container } from '~/components/Container';
import { ChevronDown, ChevronRight } from '@tamagui/lucide-icons';

import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function LocationSettings() {
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <>
      <Stack.Screen options={{ title: 'Location Settings' }} />
      <Container>
        <YStack alignItems="center">
          <XStack
            width="100%"
            gap={15}
            backgroundColor="white"
            borderRadius={10}
            borderWidth={1}
            alignItems="center"
            justifyContent="space-between"
            padding={20}
          >
            <Label fontSize={24} color="black">
              Location Tracking
            </Label>
            <Switch backgroundColor="blue" onCheckedChange={checked => console.log(checked)}>
              <Switch.Thumb backgroundColor="white" animation="lazy" />
            </Switch>
          </XStack>
          <XStack
            borderRadius={10}
            borderWidth={1}
            width="100%"
            margin={10}
            alignItems="center"
            padding={20}
            backgroundColor="white"
            justifyContent="space-between"
          >
            <XStack gap={15}>
              <Ionicons marginTop={2} name="notifications-outline" size={24} />
              <Text fontSize={24} color="black">
                Location Save Item
              </Text>
            </XStack>
            <ChevronRight marginTop={2} color="black" size={24} />
          </XStack>
          <TouchableOpacity onPress={() => setShowTimePicker(!showTimePicker)}>
            <XStack
              borderRadius={10}
              borderWidth={1}
              margin={10}
              alignItems="center"
              width="100%"
              padding={20}
              backgroundColor="white"
              justifyContent="space-between"
            >
              <XStack gap={15}>
                <Ionicons marginTop={2} name="notifications-outline" size={24} />
                <Text fontSize={24} color="black">
                  Start Time
                </Text>
              </XStack>
              <ChevronRight marginTop={2} color="black" size={24} />
            </XStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowTimePicker(!showTimePicker)}>
            <XStack
              borderRadius={10}
              borderWidth={1}
              width="100%"
              margin={10}
              alignItems="center"
              padding={20}
              backgroundColor="white"
              justifyContent="space-between"
            >
              <XStack gap={15}>
                <Ionicons marginTop={2} name="notifications-outline" size={24} />
                <Text fontSize={24} color="black">
                  End Time
                </Text>
              </XStack>
              <ChevronRight marginTop={2} color="black" size={24} />
            </XStack>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePickerAndroid
              accentColor="blue"
              textColor="blue"
              value={new Date()}
              mode="time"
              is24Hour
              onChange={startTime => console.log(startTime.nativeEvent.timestamp)}
            />
          )}

          <Accordion overflow="hidden" width="100%" type="single" collapsable>
            <Accordion.Item value="work-days">
              <Accordion.Trigger
                borderRadius={10}
                backgroundColor="white"
                flexDirection="row"
                justifyContent="space-between"
              >
                {({ open }: { open: boolean }) => (
                  <>
                    <XStack gap={15}>
                      <Ionicons marginTop={2} name="notifications-outline" size={24} />
                      <Text fontSize={24} color="black">
                        Work Days
                      </Text>
                    </XStack>
                    <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                      <ChevronDown color="black" size="$1" />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.HeightAnimator animation="lazy">
                <Accordion.Content
                  backgroundColor="white"
                  width="100%"
                  borderWidth={1}
                  borderRadius={10}
                  animation="lazy"
                  exitStyle={{ opacity: 0 }}
                >
                  <ScrollView
                    horizontal
                    backgroundColor="white"
                    showsHorizontalScrollIndicator={false}
                  >
                    <XStack gap={15}>
                      <TouchableOpacity>
                        <Circle size={50} backgroundColor="blue" elevation="$4" />
                        <Text position="absolute" top={16} right={19}>
                          M
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Circle size={50} backgroundColor="blue" elevation="$4" />
                        <Text position="absolute" top={16} right={20}>
                          T
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Circle size={50} backgroundColor="blue" elevation="$4" />
                        <Text position="absolute" top={16} right={20}>
                          W
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Circle size={50} backgroundColor="blue" elevation="$4" />
                        <Text position="absolute" top={16} right={20}>
                          T
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Circle size={50} backgroundColor="blue" elevation="$4" />
                        <Text position="absolute" top={16} right={20}>
                          F
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Circle size={50} backgroundColor="blue" elevation="$4" />
                        <Text position="absolute" top={16} right={20}>
                          Sa
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Circle size={50} backgroundColor="blue" elevation="$4" />
                        <Text position="absolute" top={16} right={20}>
                          Su
                        </Text>
                      </TouchableOpacity>
                    </XStack>
                  </ScrollView>
                </Accordion.Content>
              </Accordion.HeightAnimator>
            </Accordion.Item>
          </Accordion>
        </YStack>
      </Container>
    </>
  );
}
