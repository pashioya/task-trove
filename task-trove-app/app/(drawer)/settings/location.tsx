import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "~/components/primitives/slot";
import { Text } from "react-native";

export default function LocationSettings() {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Stack.Screen options={{ title: "Location Settings" }} />
      <View>
        <Text>Location Settings</Text>
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
              Location Tracking
            </Label>
            <Switch backgroundColor="blue" onCheckedChange={checked => console.log(checked)}>
              <Switch.Thumb backgroundColor="white" animation="lazy" />
            </Switch>
          </XStack>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(true);
            }}
          >
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
                  Location Save Item
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
            content={<LocationItemSelects />}
          />
          <TouchableOpacity onPress={() => setShowTimePicker(!showTimePicker)}>
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
              margin={10}
              alignItems="center"
              padding={20}
              backgroundColor="white"
              justifyContent="space-between"
            >
              <XStack width="100%" gap={15}>
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
          <Accordion overflow="hidden" type="single" collapsable>
            <Accordion.Item value="work-days">
              <Accordion.Trigger
                width="100%"
                borderRadius={10}
                backgroundColor="white"
                flexDirection="row"
                justifyContent="space-between"
              >
                {({ open }: { open: boolean }) => (
                  <>
                    <XStack gap={15}>
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
      </Container> */}
    </>
  );
}
