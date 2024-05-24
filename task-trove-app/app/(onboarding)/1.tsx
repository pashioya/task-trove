import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import { Button } from '~/components/ui/button';

export default function One() {
  return (
    <SafeAreaView className="flex-1 pt-20">
      <View className="bg-blue-500 m-6 rounded-2xl p-4">
        <Image
          source={require('~/assets/images/tryve/general.jpg')}
          style={{ width: '100%', height: 600, borderRadius: 20 }}
        />
      </View>
      <View className="flex-1 justify-between py-8 px-9">
        <View>
          <Text className="text-2xl font-medium text-purple-900 text-center mb-3 leading-10">
            Track your location{'\n'}with{' '}
            <View className="bg-blue-200" style={{ transform: [{ rotate: '-5deg' }] }}>
              <Text className="text-3xl font-semibold">TaskTrove</Text>
            </View>
          </Text>
          <Text className="text-m text-center text-slate-600">
            Boost Teamwork and Visibility with Real-Time Location Sharing
          </Text>
        </View>
        <Button onPress={() => router.push('/(onboarding)/2')} className="bg-blue-700">
          <Text className="font-semibold text-white">Lets go</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
