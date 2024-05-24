import { View, Image, SafeAreaView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '~/components/ui/button';
import colors from 'tailwindcss/colors';
import { Text } from '~/components/ui/text';
import { router } from 'expo-router';

export default function Three() {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[colors.blue[900], colors.blue[600]]}
    >
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <View>
            <Image
              source={require('~/assets/images/monday/monday-white.png')}
              style={{
                objectFit: 'contain',
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                transform: [{ translateX: 20 }, { translateY: 50 }, { rotate: '-15deg' }],
              }}
            />

            <Image
              source={require('~/assets/images/monday/monday-black.png')}
              style={{
                objectFit: 'contain',
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                top: -30,
                left: 100,
                transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: '-5deg' }],
              }}
            />

            <Image
              source={require('~/assets/images/monday/monday-white.png')}
              style={{
                objectFit: 'contain',
                width: 100,
                height: 100,
                borderRadius: 20,
                position: 'absolute',
                top: 130,
                left: -50,
                transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: '15deg' }],
              }}
            />

            <Image
              source={require('~/assets/images/tryve/tryve-logo-darkblue.png')}
              style={{
                objectFit: 'contain',
                height: 200,
                width: 200,
                borderRadius: 20,
                position: 'absolute',
                top: 110,
                left: 100,
                transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: '-15deg' }],
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 22,
              position: 'absolute',
              top: 500,
              width: '100%',
            }}
          >
            <Text className="font-extrabold text-5xl text-white text-justify">
              Lets Get {'\n'}Started
            </Text>

            <View style={{ marginVertical: 9 }}>
              <Text className="text-2xl font-semibold text-white ">Know where your team is:</Text>
              <Text className="text-white">See your co-workers locations on monday.com</Text>
            </View>
            <View style={{ marginVertical: 9 }}>
              <Text className="text-2xl font-semibold text-white">Focus on the right tasks: </Text>
              <Text className="text-white">
                Get a clear view of your assigned tasks based on your location, ensuring you
                prioritize effectively.
              </Text>
            </View>

            <Button
              onPress={() => router.push('/(onboarding)/3')}
              style={{
                marginTop: 10,
                width: '100%',
              }}
            >
              <Text>Get Started</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
