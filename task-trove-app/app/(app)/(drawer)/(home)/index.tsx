import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Stack, Link, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Text, View } from 'tamagui';

import AuthContext from '~/contexts/AuthenticationContext';
import { useAccessToken } from '~/hooks/useAccessToken';
import { Container } from '~/tamagui.config';
import { getAccessToken } from '~/utils/authApiMethods';
import React, { useEffect, useState } from 'react';
import * as ExpoLocation from 'expo-location';
import { TouchableOpacity, Alert } from 'react-native';
import { toggleShareLocation } from '~/utils/LocationSync';
import { AntDesign } from '@expo/vector-icons';

export default function Home() {
  const url = Linking.useURL();
  const authContext = useContext(AuthContext);
  // const mutation = useAccessToken();

  if (url?.includes('token')) {
    const tempCode = url.split('token=')[1];
    const storageKey = url.split('key=')[1];

    console.log('tempCode:', url.split('token=')[1]);
    console.log('storageKey:', url.split('key=')[1]);
    getAccessToken(storageKey, tempCode).then(res => {
      console.log('res:', res);
      authContext.logIn(res.access_token);
    });
  }

  if (authContext.isPendingAuthentication) {
    return (
      <Container>
        <AntDesign name="loading1" size={24} color="black" />;
      </Container>
    );
  }

  const [isTracking, setIsTracking] = useState(false);
  const [region, setRegion] = useState({ lat: 0, long: 0, speed: 0 });

  const showPermissionAlert = () => {
    return Alert.alert(
      'Location Permission Needed',
      'This app requires location access to function correctly. Please consider granting permission.',
      [{ text: 'Settings', onPress: () => Linking.openSettings() }, { text: 'Cancel' }],
    );
  };

  useEffect(() => {
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
