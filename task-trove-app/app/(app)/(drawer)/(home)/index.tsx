import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import { Button, Text, View } from 'tamagui';

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
  const [foregroundStatus, setForegroundStatus] = useState('');
  const [backgroundStatus, setBackgroundStatus] = useState('');
  const [error, setError] = useState<string>('');

  const router = useRouter();
  useEffect(() => {
    const showPermissionAlert = () => {
      Alert.alert(
        'Location Permission Needed',
        'This app requires location access to function correctly. Please consider granting permission.',
        [
          {
            text: 'Settings',
            onPress: async () => await Linking.openSettings(),
          },
          { text: 'Cancel' },
        ],
      );
    };

    const requestPermissions = async () => {
      const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
      setForegroundStatus(foregroundStatus);
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
        setBackgroundStatus(backgroundStatus);
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
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Container>
        <Text>URL: {url}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={async () =>
              await toggleShareLocation(isTracking, setIsTracking, setRegion).catch(
                (error: string) => setError(error),
              )
            }
          >
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
              ? `${region.lat.toFixed(3)}, ${region.long.toFixed(
                  3,
                )}, Speed: ${region.speed.toFixed(3)}`
              : 'You are not currently sharing your location'}
          </Text>
          <Button marginBottom={3} onPress={() => router.replace('/login')}>
            Login Page
          </Button>
          <Button marginBottom={3} onPress={() => router.replace('/1')}>
            View OnBoarding 1
          </Button>
          <Button onPress={() => router.replace('/2')}>View OnBoarding 2</Button>
        </View>
      </Container>
    </>
  );
}
