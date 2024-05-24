import { View, ImageBackground } from 'react-native';
import React from 'react';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { router } from 'expo-router';

export default function Two() {
  return (
    <ImageBackground
      className="justify-center flex-1 "
      resizeMode="cover"
      source={require('~/assets/images/tryve/head-shot.png')}
    >
      <View className="absolute" style={{ top: 398, left: 60 }}>
        <Text className="font-bold text-5xl text-white text-right rounded-2xl bg-black p-3 w-70">
          Know where your team is:
        </Text>
        <View>
          <Text className="text-xl text-white text-right">
            See coworker locations on monday.com, fostering transparency and collaboration.
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 22,
          position: 'absolute',
          top: 750,
          width: '100%',
        }}
      >
        <Button
          onPress={() => router.push('/(onboarding)/3')}
          style={{
            marginTop: 22,
            width: '100%',
          }}
        >
          <Text>Next</Text>
        </Button>
      </View>
    </ImageBackground>
  );
}
