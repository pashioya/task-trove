import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import * as ExpoLocation from 'expo-location';
import { TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useToggleShareLocation, useLocationPermissions } from '~/hooks';
import { useMondayMutation } from '~/lib/monday/api';
import { changeMultipleColumnValuesMutation } from '~/lib/monday/queries';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSettingsStore } from '~/store';
import { INITIAL_REGION } from '~/config/map-config';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

const showAlert = (error: string, onPress: () => void, buttonText: string) => {
  Alert.alert('Error', error, [
    {
      text: buttonText,
      onPress,
    },
    { text: 'Dismiss' },
  ]);
};

export default function Home() {
  const { toggleShareLocation, isTracking, region, setRegion } = useToggleShareLocation();
  const { foregroundStatus, backgroundStatus } = useLocationPermissions();
  const router = useRouter();

  const mapRef = useRef<MapView>(null);
  const { board, column, item, error, setError } = useSettingsStore();

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
            router.replace('/(drawer)/settings/location');
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
      <SafeAreaView className="my-container">
        <MapView
          className="border-2 border-black rounded-lg"
          provider={PROVIDER_GOOGLE}
          showsUserLocation={isTracking}
          showsMyLocationButton={false}
          style={styles.map}
          userInterfaceStyle="dark"
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          googleMapId="53fd8982b9591e20"
          region={{
            latitude: region?.latitude || INITIAL_REGION.latitude,
            longitude: region?.longitude || INITIAL_REGION.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Button
          className="mt-5 "
          onPress={async () => {
            try {
              await toggleShareLocation();
              onLocateMe();
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
          {isTracking ? <Text>Stop Tracking</Text> : <Text>Start Tracking</Text>}
        </Button>
        {isTracking && (
          <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
            <Ionicons name="navigate" size={24} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  locateBtn: {
    position: 'absolute',
    top: 60,
    right: 50,
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
    width: '100%',
    height: '85%',
  },
});
