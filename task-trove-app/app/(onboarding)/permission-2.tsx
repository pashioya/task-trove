import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import colors from 'tailwindcss/colors';
import { Button } from '~/components/ui/button';

export default function LocationPermission() {
  return (
    <>
      <View className="flex-1 ">
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={[colors.blue[50], colors.blue[100]]}
        >
          <ScrollView>
            <View className="flex-1 space-x-4 py-25 px-9">
              <View className="gap-2">
                <Text className="text-2xl font-medium text-purple-900 text-center mb-3 leading-10">
                  Allow Push Notifications?
                </Text>
                <Text className="text-m text-center text-slate-600">
                  We need your permission to send you push notifications.
                </Text>
                <Text className="text-m text-center text-slate-600">
                  We will send you notifications about your tasks and locations.
                </Text>
                <View className="bg-transparent m-1 items-center h-[50%] justify-center shrink rounded-2xl p-1 ">
                  <MaterialCommunityIcons name="bell-alert-outline" size={100} color="black" />
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="absolute bottom-10 w-full items-center gap-2">
            <Button className="w-96" disabled>
              <Text className="text-white">Ask For Permissions</Text>
            </Button>
            <Button
              className="md w-96"
              onPress={() => {
                router.navigate('/');
              }}
            >
              <Text className="font-semibold text-white">Next</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}
