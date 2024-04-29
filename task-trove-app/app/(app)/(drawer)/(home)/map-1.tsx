import { Link, Stack } from 'expo-router';
import * as Linking from 'expo-linking';
import { Container } from '~/components/Container';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'tamagui';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import * as ExpoLocation from 'expo-location';
import { toggleShareLocation } from '~/utils/LocationSync';

export default function Map() {
  const url = Linking.useURL();

  const [isTracking, setIsTracking] = useState(false);
  const [region, setRegion] = useState({ lat: 0, long: 0, speed: 0 });

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
      console.log('foregroundStatus', foregroundStatus);
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
        console.log('backgroundStatus', backgroundStatus);
        if (backgroundStatus === 'granted') {
          return;
        } else {
          console.log('Background location permission not granted');
        }
      }
    };
    requestPermissions();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Link href="/Login">Login</Link>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              toggleShareLocation(isTracking, setIsTracking, setRegion);
            }}
          >
            {isTracking ? (
              <AntDesign name="pausecircleo" size={24} color="black" />
            ) : (
              <AntDesign name="playcircleo" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text>URL: {url}</Text>
          <Text>
            {isTracking
              ? `${region.lat.toFixed(3)}, ${region.long.toFixed(3)}, Speed: ${region.speed.toFixed(3)}`
              : 'You are not currently sharing your location'}
          </Text>
        </View>
      </Container>
    </>
  );
}
