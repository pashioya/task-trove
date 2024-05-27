import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import * as ExpoLocation from 'expo-location';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useToggleShareLocation, useLocationPermissions } from '~/hooks';
import { useMondayMutation } from '~/lib/monday/api';
import { changeMultipleColumnValuesMutation } from '~/lib/monday/queries';
import { useSettingsStore } from '~/store';
import { INITIAL_REGION } from '~/config/map-config';
import lightStyle from '~/assets/map/lightStyle.json';
import darkStyle from '~/assets/map/darkStyle.json';
import { useColorScheme } from '~/lib/useColorScheme';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

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
  const { isTracking, region, setRegion } = useToggleShareLocation();
  const { foregroundStatus, backgroundStatus } = useLocationPermissions();
  const { isDarkColorScheme } = useColorScheme();
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
        console.log(updateLocationError.errors.map(e => e.message));
      }

      Alert.alert('An unexpected error occurred', updateLocationError.message, [
        { text: 'Dismiss' },
      ]);
    }
  }, [updateLocationError]);

  useEffect(() => {
    if (!item) {
      showAlert(
        'Location Column Not Correctly Setup',
        () => {
          router.replace('/settings/location');
        },
        'Go to Settings',
      );
    }
    if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
      showAlert(
        error ? error.message : 'Location permissions not granted',
        () => router.push('/settings/location'),
        'Open Settings',
      );
    }
  }, [foregroundStatus, backgroundStatus, error, item, router]);

  const onLocateMe = async () => {
    try {
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
          latitudeDelta: 0.7,
          longitudeDelta: 0.7,
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
      <SafeAreaView className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={isTracking}
          style={StyleSheet.absoluteFillObject}
          customMapStyle={isDarkColorScheme ? darkStyle : lightStyle}
          loadingEnabled
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          region={{
            latitude: region?.latitude || INITIAL_REGION.latitude,
            longitude: region?.longitude || INITIAL_REGION.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        {isTracking && (
          <View className="absolute left-80 right-0 items-center">
            <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
              <Ionicons name="navigate" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  locateBtn: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    top: 650,
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
});
