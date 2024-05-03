import * as Linking from 'expo-linking';
import { Stack, Link } from 'expo-router';
import { Text, View } from 'tamagui';

import { Container } from '~/tamagui.config';
import React, { useEffect, useState } from 'react';
import * as ExpoLocation from 'expo-location';
import { TouchableOpacity, Alert } from 'react-native';
import { toggleShareLocation } from '~/utils/LocationSync';
import { AntDesign } from '@expo/vector-icons';

export default function Home() {
  const url = Linking.useURL();

  const [isTracking, setIsTracking] = useState(false);
  const [region, setRegion] = useState({ lat: 0, long: 0, speed: 0 });

  useEffect(() => {
    const showPermissionAlert = () => {
      Alert.alert(
        'Location Permission Needed',
        'This app requires location access to function correctly. Please consider granting permission.',
        [
          { text: 'Settings', onPress: async () => await Linking.openSettings() },
          { text: 'Cancel' },
        ],
      );
    };

    const requestPermissions = async () => {
      const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
      console.log('foregroundStatus', foregroundStatus);
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
        console.log('backgroundStatus', backgroundStatus);
        if (backgroundStatus !== 'granted') {
          console.log('Background location permission not granted');
          showPermissionAlert();
        }
      } else {
        console.log('Foreground location permission not granted');
        showPermissionAlert();
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
            onPress={async () => await toggleShareLocation(isTracking, setIsTracking, setRegion)}
          >
            {isTracking ? (
              <AntDesign name="pausecircleo" size={24} color="black" />
            ) : (
              <AntDesign name="playcircleo" size={24} color="black" />
            )}
          </TouchableOpacity>
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
