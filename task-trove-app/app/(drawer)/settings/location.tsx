import { Link, Stack } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
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
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import { useColorScheme } from '~/lib/useColorScheme';
import colors from 'tailwindcss/colors';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function LocationSettings() {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const newTheme = isDarkColorScheme ? 'light' : 'dark';

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
                <Switch />
              </View>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={{ backgroundColor: rowColor }}
                className="flex-row items-center justify-start h-12 rounded-lg mb-3 px-3"
              >
                <Text className="text-lg font-normal ">Change Location Save Location</Text>

                <View className="flex-1" />
                <ChevronRight color="#C6C6C6" size={20} />
              </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexBasis: 0,
    flexGrow: 1,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
