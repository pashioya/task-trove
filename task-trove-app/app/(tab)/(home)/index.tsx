import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { useToggleShareLocation } from '~/hooks';
import { Alert, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { useToggleShareLocation, useLocationPermissions, useTasks } from '~/hooks';
import { useMondayMutation } from '~/lib/monday/api';
import { changeMultipleColumnValuesMutation } from '~/lib/monday/queries';
import { useSettingsStore } from '~/store';
import { INITIAL_REGION } from '~/config/map-config';
import lightStyle from '~/assets/map/lightStyle.json';
import darkStyle from '~/assets/map/darkStyle.json';
import { useColorScheme } from '~/lib/useColorScheme';
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import { Play, Navigation, Pause } from 'lucide-react-native';
import * as ExpoLocation from 'expo-location';

import { Text } from '~/components/ui/text';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '~/components/ui/button';
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
  const { isTracking, region, setRegion, toggleShareLocation } = useToggleShareLocation();

  const { isTracking, region, toggleShareLocation } = useToggleShareLocation();
  const { requestPermissions } = useLocationPermissions();
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const { tableTasks } = useTasks();
  const local = useLocalSearchParams();

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
    if (!item) {
      showAlert(
        'Location Column Not Correctly Setup',
        () => {
          router.replace('/settings/location');
        },
        'Go to Settings',
      );
    }
  }, [item, router]);

  const onLocateMe = async () => {
    try {
      const location = await ExpoLocation.getLastKnownPositionAsync({});

      if (location) {
        // @ts-expect-error - ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        mapRef.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        // @ts-expect-error - ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        mapRef.current?.animateToRegion(INITIAL_REGION);
      }
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

  if (local.taskId) {
    const task = tableTasks.find(t => t.id === local.taskId);
    // @ts-expect-error - ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mapRef.current?.animateToRegion({
      latitude: Number(task?.lat),
      longitude: Number(task?.long),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <SafeAreaView className="flex-1">
        <MapView
          followsUserLocation={false}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={isTracking}
          style={StyleSheet.absoluteFillObject}
          customMapStyle={isDarkColorScheme ? darkStyle : lightStyle}
          loadingEnabled
          showsMyLocationButton={false}
          showsCompass={false}
          mapPadding={{ top: 100, right: 0, left: 0, bottom: 0 }}
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          renderCluster={cluster => {
            const { id, geometry, onPress, properties } = cluster;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const points = properties.point_count;
            return (
              <Marker
                key={`cluster-${id}`}
                tracksViewChanges={false}
                coordinate={{
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  longitude: geometry.coordinates[0],
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  latitude: geometry.coordinates[1],
                }}
                onPress={onPress}
              >
                <View className="p-1 items-center justify-center bg-blue-50 shadow-xl rounded-lg">
                  <Text className="text-lg text-center">{points}</Text>
                </View>
              </Marker>
            );
          }}
        >
          {tableTasks.map(task => (
            <Marker
              tracksViewChanges={false}
              coordinate={{
                latitude: Number(task.lat),
                longitude: Number(task.long),
              }}
              key={task.id}
            >
              <MaterialCommunityIcons name="map-marker-check" size={40} color="black" />
              <Callout
                onPress={() => {
                  Linking.openURL(
                    `https://www.google.com/maps/dir/?api=1&destination=${task.lat},${task.long}&travelmode=driving`,
                  );
                }}
              >
                <View className="w-60">
                  <Button className="flex-row">
                    <AntDesign name="google" size={24} color="white" />
                    <Text className="text-white">Get Directions</Text>
                  </Button>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <View className="absolute bottom-32 right-5 gap-4">
          {isTracking ? (
            <View className="bg-blue-50 rounded-full h-[70px] w-[70px] shadow-lg flex items-center justify-center">
              <Navigation
                onPress={() => onLocateMe()}
                fill="white"
                color="black"
                className="bg-white"
                size={40}
              />
            </View>
          ) : null}

          <View className="bg-blue-50 rounded-full h-[70px] w-[70px] shadow-lg flex items-center justify-center">
            {isTracking ? (
              <Pause
                onPress={() => toggleShareLocation()}
                fill="white"
                color="black"
                className="bg-white shadow-lg"
                size={50}
              />
            ) : (
              <Play
                onPress={() => toggleShareLocation()}
                fill="white"
                color="black"
                className="bg-white shadow-lg"
                size={50}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
