import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import * as ExpoLocation from 'expo-location';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { useToggleShareLocation, useLocationPermissions } from '~/hooks';
import { useMondayMutation } from '~/lib/monday/api';
import { changeMultipleColumnValuesMutation } from '~/lib/monday/queries';
import { useSettingsStore } from '~/store';
import { INITIAL_REGION } from '~/config/map-config';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import lightStyle from '~/assets/map/lightStyle.json';
import darkStyle from '~/assets/map/darkStyle.json';
import { useColorScheme } from '~/lib/useColorScheme';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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
            router.replace('/settings/location');
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
      <SafeAreaView className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={isTracking}
          showsMyLocationButton={false}
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
        <View className="absolute bottom-10 left-0 right-0 items-center">
          <Button
            className="w-[50%] "
            style={{ zIndex: 50 }}
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
        </View>
      </SafeAreaView>
    </>
  );
}
