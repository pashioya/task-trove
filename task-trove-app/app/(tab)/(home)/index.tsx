import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { useToggleShareLocation, useLocationPermissions } from '~/hooks';
import { useMondayMutation } from '~/lib/monday/api';
import { changeMultipleColumnValuesMutation } from '~/lib/monday/queries';
import { useSettingsStore } from '~/store';
import { INITIAL_REGION } from '~/config/map-config';
import lightStyle from '~/assets/map/lightStyle.json';
import darkStyle from '~/assets/map/darkStyle.json';
import { useColorScheme } from '~/lib/useColorScheme';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { Play, Navigation, Pause } from 'lucide-react-native';
import * as ExpoLocation from 'expo-location';
import * as NavigationBar from 'expo-navigation-bar';
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
  NavigationBar.setPositionAsync('absolute');
  NavigationBar.setBackgroundColorAsync('#ffffff01');

  const { isTracking, region, setRegion, toggleShareLocation } = useToggleShareLocation();
  const { requestPermissions } = useLocationPermissions();
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();

  const mapRef = useRef<MapView>(null);
  const { board, column, item } = useSettingsStore();

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

      toggleShareLocation();
    }
  }, [toggleShareLocation, updateLocationError]);

  useEffect(() => {
    const checkPermissions = async () => {
      await requestPermissions();
    };
    checkPermissions();
    if (!item) {
      showAlert(
        'Location Column Not Correctly Setup',
        () => {
          router.replace('/settings/location');
        },
        'Go to Settings',
      );
    }
  }, [item, requestPermissions, router]);

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
          latitudeDelta: 0.5,
          longitudeDelta: 0.6,
        },
        3000,
      );
    } catch (e) {
      if (e instanceof Error) {
        showAlert(
          e.message,
          () => {
            onLocateMe();
          },
          'Retry',
        );
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
          showsMyLocationButton={false}
          showsCompass={false}
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          region={{
            latitude: region?.latitude || INITIAL_REGION.latitude,
            longitude: region?.longitude || INITIAL_REGION.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View className="absolute bottom-44 right-5 gap-4">
          {isTracking ? (
            <View
              className="bg-secondary rounded-full flex items-center justify-center shadow-2xl"
              style={{
                width: 70,
                height: 70,
              }}
            >
              <Navigation
                onPress={() => onLocateMe()}
                color={isDarkColorScheme ? colors.neutral[100] : colors.blue[500]}
                fill={isDarkColorScheme ? colors.gray[100] : colors.blue[500]}
                className="bg-white"
                size={30}
              />
            </View>
          ) : null}

          <View
            className="bg-primary shadow-2xl rounded-full p-1 flex items-center justify-center"
            style={{
              elevation: 5,
              width: 70,
              height: 70,
            }}
          >
            {isTracking ? (
              <Pause
                onPress={() => toggleShareLocation()}
                color={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                fill={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                className="bg-primary shadow-2xl"
                size={30}
              />
            ) : (
              <Play
                onPress={() => toggleShareLocation()}
                color={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                fill={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                className="bg-primary shadow-2xl"
                size={30}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
