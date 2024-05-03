import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as ExpoLocation from 'expo-location';
import { Stack, Link, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Text, View } from 'tamagui';

import AuthContext from '~/contexts/AuthenticationContext';
import { Container } from '~/tamagui.config';
import { toggleShareLocation } from '~/utils/LocationSync';
import { getAccessToken } from '~/utils/authApiMethods';

export default function Home() {
  const [isTracking, setIsTracking] = useState(false);
  const [region, setRegion] = useState({ lat: 0, long: 0, speed: 0 });
  const url = Linking.useURL();
  const router = useRouter();

  // Handle location permissions on mount
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();

      if (foregroundStatus !== 'granted') {
        console.log('Foreground location permission not granted');
        return;
      }

      const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();

      if (backgroundStatus !== 'granted') {
        console.log('Background location permission not granted');
        Alert.alert(
          'Location Permission Needed',
          'This app requires location access to function. Please consider granting permission.',
          [{ text: 'Settings', onPress: Linking.openSettings }, { text: 'Cancel' }],
        );
      }
    };

    requestPermissions();
  }, []);

  if (url?.includes('token')) {
    const tempCode = url.split('token=')[1].split('&key=')[0];
    const storageKey = url.split('key=')[1];
    router.push({ pathname: '/login-buffer', params: { tempCode, storageKey } });
  }

  // Handle location sharing toggle
  const handleToggleShareLocation = async () => {
    try {
      await toggleShareLocation(isTracking, setIsTracking, setRegion);
    } catch (error) {
      console.error('Error toggling location sharing:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Link href="/login">Login</Link>
        <Text>URL: {url}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={handleToggleShareLocation}>
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
