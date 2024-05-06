import * as Linking from 'expo-linking';
import { Stack, Link } from 'expo-router';
import { Text, View } from 'tamagui';

import { Container } from '~/tamagui.config';
import React, { useEffect, useState } from 'react';
import * as ExpoLocation from 'expo-location';
import { TouchableOpacity } from 'react-native';
import { toggleShareLocation } from '~/utils/LocationSync';
import { AntDesign } from '@expo/vector-icons';

export default function Home() {
  const url = Linking.useURL();

  const [isTracking, setIsTracking] = useState(false);
  const [region, setRegion] = useState({ lat: 0, long: 0, speed: 0 });
  const [foregroundStatus, setForegroundStatus] = useState('');
  const [backgroundStatus, setBackgroundStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(process.env);
    const requestPermissions = async () => {
      const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
      setForegroundStatus(foregroundStatus);
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
        setBackgroundStatus(backgroundStatus);
        console.log('backgroundStatus', backgroundStatus);
        if (backgroundStatus !== 'granted') {
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
        <Link href="/login">Login</Link>
        <Text>URL: {url}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              try {
                toggleShareLocation(isTracking, setIsTracking, setRegion);
              } catch (e: any) {
                setError(e);
              }
            }}
          >
            {error && <Text>{error}</Text>}
            {isTracking ? (
              <AntDesign name="pausecircleo" size={24} color="black" />
            ) : (
              <AntDesign name="playcircleo" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text>Foreground permission: {foregroundStatus}</Text>
          <Text>Background permission: {backgroundStatus}</Text>
          <Text>Error: {error}</Text>
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
