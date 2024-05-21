import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import { Button, View } from 'tamagui';
import { Container, mondayColors } from '~/tamagui.config';
import React, { useContext, useEffect, useRef } from 'react';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsContext from '~/contexts/SettingsContext';
import { useToggleShareLocation, useLocationPermissions } from '~/hooks';
import { useMondayMutation } from '~/lib/monday/api';
import { changeMultipleColumnValuesMutation } from '~/lib/monday/queries';
import * as ExpoLocation from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import lightStyle from '~/assets/map/lightStyle.json';

const showAlert = (error: string, onPress: () => void, buttonText: string) => {
  Alert.alert('Error', error, [
    {
      text: buttonText,
      onPress,
    },
    { text: 'Dismiss' },
  ]);
};

const INITIAL_REGION = {
  latitude: 51.1475192,
  longitude: 4.4338499,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Home() {
  const { toggleShareLocation, isTracking, region, setRegion } = useToggleShareLocation();
  const { foregroundStatus, backgroundStatus } = useLocationPermissions();
  const { board, column, item, error, setError } = useContext(SettingsContext);
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const { mutate: updateLocation, error: updateLocationError } = useMondayMutation({
    mutation: changeMultipleColumnValuesMutation,
  });

  useEffect(() => {
    if (isTracking && region && board && column && item) {
      updateLocation({
        boardId: board.id,
        itemId: item.id,
        columnValues: JSON.stringify({
          [column.id]: {
            lat: region.latitude,
            lng: region.longitude,
            address: 'realtime location',
          },
        }),
      });
    }
  }, [region, isTracking, board, column, item, updateLocation]);

  useEffect(() => {
    if (updateLocationError) {
      if (updateLocationError.errors) {
        /* Handle specific errors here */
        console.log(updateLocationError.errors.map(e => e.message));
      }

      Alert.alert('An unexpected error occurred', updateLocationError.message, [
        { text: 'Dismiss' },
      ]);
    }
  }, [updateLocationError]);

  const onLocateMe = async () => {
    try {
      if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
        showAlert(
          error ? error.message : 'Location permissions not granted',
          async () => await Linking.openSettings(),
          'Open Settings',
        );
        return;
      }
      if (!item) {
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
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speed: location.coords.speed ? location.coords.speed : 0,
      });
      mapRef.current?.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
        },
        1000,
      );
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  };

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
              latitude: region?.latitude || INITIAL_REGION.latitude,
              longitude: region?.longitude || INITIAL_REGION.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Button onPress={() => router.replace('/(app)/(onboarding)/2')}> onboarding </Button>
          <Button
            marginTop={50}
            onPress={async () => {
              try {
                await toggleShareLocation();
              } catch (e) {
                if (e instanceof Error) {
                  setError(e);
                  showAlert(
                    e.message,
                    () => {
                      console.log(e);
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
