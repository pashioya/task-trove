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
      <View
        style={{
          paddingHorizontal: 22,
          position: 'absolute',
          top: 550,
          width: '100%',
        }}
      >
        <Text className="font-extrabold text-5xl text-white text-justify">
          Lets Get {'\n'}Started
        </Text>

        <View style={{ marginVertical: 22 }}>
          <Text className="text-2xl text-white">Connect with each other with chatting</Text>
          <Text className="text-white">Calling, Enjoy Safe and private texting</Text>
        </View>

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
