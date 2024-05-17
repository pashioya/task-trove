import * as Linking from 'expo-linking';
import { router, Stack } from 'expo-router';
import { Button, View } from 'tamagui';
import { Container, mondayColors } from '~/tamagui.config';
import React, { useContext, useEffect, useRef, useState } from 'react';
import * as ExpoLocation from 'expo-location';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { toggleShareLocation } from '~/utils/LocationSync';
import SettingsContext from '~/contexts/SettingsContext';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import lightStyle from '~/assets/map/lightStyle.json';

export default function Home() {
  const [region, setRegion] = useState({ lat: 51.1475192, long: 4.4338499, speed: 0 });
  const mapRef = useRef<MapView>(null);
  const [foregroundStatus, setForegroundStatus] = useState('');
  const [backgroundStatus, setBackgroundStatus] = useState('');
  const { board, column, item, error, isTracking, setIsTracking, setError } =
    useContext(SettingsContext);

  const showAlert = (error: string, onPress: () => void, buttonText: string) => {
    Alert.alert('Error', error, [
      {
        text: buttonText,
        onPress,
      },
      { text: 'Dismiss' },
    ]);
  };

  const onLocateMe = async () => {
    try {
      if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
        showAlert(error.message, async () => await Linking.openSettings(), 'Open Settings');
        return;
      }
      if (item.id === '') {
        showAlert(
          'Location Column Not Correctly Setup',
          () => {
            router.replace('/(app)/(drawer)/settings/settings');
          },
          'Go to Settings',
        );
        return;
      }
      const location = await ExpoLocation.getCurrentPositionAsync();
      setRegion({
        lat: location.coords.latitude,
        long: location.coords.longitude,
        speed: location.coords.speed ? location.coords.speed : 0,
      });
      mapRef.current?.animateToRegion(
        { latitude: region.lat, longitude: region.long, latitudeDelta: 0.9, longitudeDelta: 0.9 },
        1000,
      );
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  };

  const INITIAL_REGION = {
    latitude: region.lat,
    longitude: region.long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
      setForegroundStatus(foregroundStatus);
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
        setBackgroundStatus(backgroundStatus);
        console.log('backgroundStatus', backgroundStatus);
        if (backgroundStatus !== 'granted') {
          showAlert(
            'Background location permission not granted',
            async () => await Linking.openSettings(),
            'Open Settings',
          );
        }
      } else {
        showAlert(
          'Foreground location permission not granted',
          async () => await Linking.openSettings(),
          'Open Settings',
        );
      }
    };
    requestPermissions();
  }, []);
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Container>
        <View alignItems="center" flex={1} justifyContent="center">
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={isTracking}
            style={styles.map}
            userInterfaceStyle="dark"
            initialRegion={INITIAL_REGION}
            ref={mapRef}
            customMapStyle={lightStyle}
            region={{
              latitude: region.lat,
              longitude: region.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Button onPress={() => router.replace('/(app)/(onboarding)/2')}> onboarding </Button>
          <Button
            marginTop={50}
            onPress={async () => {
              try {
                await toggleShareLocation(
                  isTracking,
                  setIsTracking,
                  setRegion,
                  board.id,
                  column.id,
                  item.id,
                );
              } catch (e) {
                if (e instanceof Error) {
                  setError(e);
                  showAlert(
                    e.message,
                    () => {
                      console.log(e.message);
                    },
                    'Dismiss',
                  );
                }
              }
            }}
          >
            {!isTracking ? 'Start' : 'Stop'}Tracking
          </Button>
          {isTracking && (
            <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
              <Ionicons name="navigate" size={24} color={mondayColors.mondayDark} />
            </TouchableOpacity>
          )}
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  locateBtn: {
    position: 'absolute',
    top: 550,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  map: {
    width: '105%',
    height: '85%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
