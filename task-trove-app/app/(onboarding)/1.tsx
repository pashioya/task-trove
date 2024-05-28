import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import colors from 'tailwindcss/colors';
import { Button } from '~/components/ui/button';
import * as NavigationBar from 'expo-navigation-bar';

export default function One() {
  NavigationBar.setBackgroundColorAsync(colors.blue[200]);
  return (
    <>
      <View className="flex-1 ">
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={[colors.blue[50], colors.blue[200]]}
        >
          <ScrollView>
            <View className="bg-blue-500 m-3 shrink rounded-2xl p-2 ">
              <Image
                source={require('~/assets/images/tryve/general.jpg')}
                className="w-full h-96 rounded-2xl shrink"
                style={{ width: '100%', height: 400, borderRadius: 20 }}
              />
            </View>
            <View className="flex-1 space-x-4 py-25 px-9">
              <View className="py-10 gap-2">
                <Text className="text-2xl font-medium text-purple-900 text-center mb-3 leading-10">
                  Track your location{'\n'}with{' '}
                  <View className="bg-blue-300" style={{ transform: [{ rotate: '-5deg' }] }}>
                    <Text className="text-3xl font-semibold">TaskTrove</Text>
                  </View>
                </Text>
                <Text className="text-m text-center text-slate-600">
                  Boost Teamwork and Visibility with Real-Time Location Sharing
                </Text>
                <Text className="text-m text-center text-slate-600">
                  See your co-workers locations on monday.com
                </Text>
                <Text className="text-m text-center text-slate-600">
                  Get a clear view of your assigned tasks based on your location
                </Text>
              </View>
              <Button onPress={() => router.push('/(onboarding)/2')} className="bg-blue-700">
                <Text className="font-semibold text-white">let&apos;s go</Text>
              </Button>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  );
}
