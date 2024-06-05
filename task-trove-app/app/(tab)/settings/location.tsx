import { Stack, router } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { ChevronRight, LucideMoveLeft } from 'lucide-react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import RoundBtn from '~/components/RoundBtn';
import { useState } from 'react';
import { useColorScheme } from '~/lib/useColorScheme';
import colors from 'tailwindcss/colors';
import RNDateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SimpleDialog } from '~/components/SimpleDialog';
import LocationItemSelects from '~/components/LocationItemSelects';
import { useToggleShareLocation } from '~/hooks';
import { Switch } from '~/components/ui/switch';
import { useSettingsStore } from '~/store';
import { showGeneralAlert } from '~/utils/alert';

export default function LocationSettings() {
  const { isTracking, toggleShareLocation } = useToggleShareLocation();
  const { startTime, endTime, activeDays, setStartTime, setEndTime, setActiveDays } =
    useSettingsStore();

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const { isDarkColorScheme } = useColorScheme();

  const handleToggleDay = (day: number) => {
    const newActiveDays = activeDays.includes(day)
      ? activeDays.filter((d: number) => d !== day)
      : [...activeDays, day];

    setActiveDays(newActiveDays);
  };
  const handleTimeChange = (event: DateTimePickerEvent, type?: 'start' | 'end') => {
    const selectedDate = event.nativeEvent.timestamp ? new Date(event.nativeEvent.timestamp) : null;

    if (!selectedDate) {
      showGeneralAlert('Error', 'Trouble setting time');
      return;
    }
    const totalMinutes = selectedDate.getHours() * 60 + selectedDate.getMinutes();

    if (type === 'start') {
      setStartTime(totalMinutes);
    } else if (type === 'end') {
      setEndTime(totalMinutes);
    }

    if (type === 'start') {
      setShowStartTimePicker(false);
    } else if (type === 'end') {
      setShowEndTimePicker(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Location',
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
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1">
          <ScrollView>
            <View className="px-6">
              <Text className="py-3 text-xs font-semibold uppercase tracking-wider mb-8">
                Tracking
              </Text>

              <SimpleDialog
                trigger={
                  <View className="bg-secondary flex-row items-center justify-start h-12 rounded-lg mb-3 px-3">
                    <Text className="text-lg font-normal">Change Location Save Location</Text>
                    <View className="flex-1" />
                    <ChevronRight color="#C6C6C6" size={20} />
                  </View>
                }
                title="Change Location Save Location"
                content={<LocationItemSelects />}
              />

              <View className="flex-row bg-secondary items-center justify-start h-12 rounded-lg mb-3 px-3">
                <Text className="text-lg font-normal">Location Tracking</Text>
                <View className="flex-1" />
                <Switch
                  style={{ backgroundColor: isTracking ? colors.blue[500] : colors.gray[300] }}
                  checked={isTracking}
                  onCheckedChange={() => toggleShareLocation()}
                />
              </View>
            </View>

            <View className="px-6">
              <Text className="py-3 text-xs font-semibold uppercase tracking-wider mb-8">
                Tracking Times
              </Text>
              <TouchableOpacity
                onPress={() => setShowStartTimePicker(true)}
                className=" bg-secondary flex-row items-center justify-start h-12 rounded-lg mb-3 px-3"
              >
                <Text className="text-lg font-normal">Start Time</Text>
                <View className="flex-grow" />
                <ChevronRight color="#C6C6C6" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowEndTimePicker(true)}
                className="bg-secondary flex-row items-center justify-start h-12 rounded-lg mb-3 px-3"
              >
                <Text className="text-lg font-normal">End Time</Text>
                <View className="flex-grow" />
                <ChevronRight color="#C6C6C6" size={20} />
              </TouchableOpacity>
              {showStartTimePicker && (
                <RNDateTimePicker
                  accentColor={colors.blue[500]}
                  value={
                    new Date(`1970-01-01T${Math.floor(startTime / 60) % 24}:${startTime % 60}:00`)
                  }
                  mode="time"
                  is24Hour
                  onChange={event => handleTimeChange(event, 'start')}
                />
              )}
              {showEndTimePicker && (
                <RNDateTimePicker
                  accentColor={colors.blue[500]}
                  value={new Date(`1970-01-01T${Math.floor(endTime / 60) % 24}:${endTime % 60}:00`)}
                  mode="time"
                  is24Hour
                  onChange={event => handleTimeChange(event, 'end')}
                />
              )}

              <Accordion type="single" collapsible className="w-full max-w-sm native:max-w-md">
                <AccordionItem value="day-picker">
                  <AccordionTrigger className="bg-secondary flex-row items-center justify-start h-50 rounded-lg mb-3 px-3">
                    <Text className="text-lg font-normal">Working Days</Text>
                    <View className="flex-grow" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View className="flex-row gap-4">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((letter, index) => (
                          <RoundBtn
                            key={index}
                            letter={letter}
                            textStyles="font-smal muted"
                            letterStyles={
                              activeDays.includes(index) ? 'color-base' : 'color-primary'
                            }
                            text={
                              [
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday',
                                'Sunday',
                              ][index]
                            }
                            color={activeDays.includes(index) ? 'bg-primary' : 'bg-secondary'}
                            onPress={() => handleToggleDay(index)}
                          />
                        ))}
                      </View>
                    </ScrollView>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
