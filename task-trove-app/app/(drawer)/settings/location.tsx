import { Stack } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { ChevronRight } from 'lucide-react-native';
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
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { SimpleDialog } from '~/components/SimpleDialog';
import LocationItemSelects from '~/components/LocationItemSelects';
import { useToggleShareLocation } from '~/hooks';
import { Switch } from '~/components/ui/switch';

export default function LocationSettings() {
  const { isTracking, toggleShareLocation } = useToggleShareLocation();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const { isDarkColorScheme } = useColorScheme();

  const rowColor = isDarkColorScheme ? colors.gray[900] : colors.gray[100];

  return (
    <>
      <Stack.Screen options={{ title: 'Boards' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1">
          <ScrollView>
            <View className="px-6">
              <Text className="py-3 text-xs font-semibold  uppercase tracking-wider">Tracking</Text>
              <View
                style={{ backgroundColor: rowColor }}
                className="flex-row items-center justify-start h-12 rounded-lg mb-3 px-3"
              >
                <Text className="text-lg font-normal ">Location Tracking</Text>

                <View className="flex-1" />
                <Switch checked={isTracking} onCheckedChange={() => toggleShareLocation()} />
              </View>

              <SimpleDialog
                trigger={
                  <View
                    style={{ backgroundColor: rowColor }}
                    className="flex-row items-center justify-start h-12 rounded-lg mb-3 px-3"
                  >
                    <Text className="text-lg font-normal ">Change Location Save Location</Text>

                    <View className="flex-1" />
                    <ChevronRight color="#C6C6C6" size={20} />
                  </View>
                }
                title="Change Location Save Location"
                content={<LocationItemSelects />}
              />
            </View>
            <View className="px-6">
              <Text className="py-3 text-xs font-semibold  uppercase tracking-wider">
                Tracking Times
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowTimePicker(() => !showTimePicker);
                }}
                style={{ backgroundColor: rowColor }}
                className="flex-row items-center justify-start h-12  rounded-lg mb-3 px-3"
              >
                <Text className="text-lg font-normal ">Start Time</Text>
                <View className="flex-grow" />
                <ChevronRight color="#C6C6C6" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowTimePicker(() => !showTimePicker);
                }}
                style={{ backgroundColor: rowColor }}
                className="flex-row items-center justify-start h-12 rounded-lg mb-3 px-3"
              >
                <Text className="text-lg font-normal ">End Time</Text>
                <View className="flex-grow" />
                <ChevronRight color="#C6C6C6" size={20} />
              </TouchableOpacity>
              {showTimePicker && (
                <RNDateTimePicker
                  accentColor="blue"
                  textColor="blue"
                  value={new Date()}
                  mode="time"
                  is24Hour
                  onChange={startTime => console.log(startTime.nativeEvent.timestamp)}
                />
              )}

              <Accordion type="single" collapsible className="w-full max-w-sm native:max-w-md">
                <AccordionItem value="day-picker">
                  <AccordionTrigger
                    style={{ backgroundColor: rowColor }}
                    className=" flex-row items-center justify-start h-50  rounded-lg mb-3 px-3"
                  >
                    <Text className="text-lg font-normal ">Working Days</Text>
                    <View className="flex-grow" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View className="flex-row  gap-4">
                        <RoundBtn letter="M" text="Monday" />
                        <RoundBtn letter="T" text="Tuesday" />
                        <RoundBtn letter="W" text="Wednesday" />
                        <RoundBtn letter="T" text="Thursday" />
                        <RoundBtn letter="F" text="Friday" />
                        <RoundBtn letter="S" text="Saturday" />
                        <RoundBtn letter="S" text="Sunday" />
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
