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
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import { Play, Navigation, Pause } from 'lucide-react-native';
import colors from 'tailwindcss/colors';
import * as ExpoLocation from 'expo-location';

import { Text } from '~/components/ui/text';
import type { Task } from '~/model/types';
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
      // @ts-expect-error - ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
          renderCluster={cluster => {
            const { id, geometry, onPress, properties } = cluster;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const points = properties.point_count;
            return (
              <Marker
                key={`cluster-${id}`}
                coordinate={{
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  longitude: geometry.coordinates[0],
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  latitude: geometry.coordinates[1],
                }}
                onPress={onPress}
              >
                <View style={styles.marker}>
                  <Text
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontFamily: 'mon-sb',
                    }}
                  >
                    {points}
                  </Text>
                </View>
              </Marker>
            );
          }}
          region={{
            latitude: region?.latitude || INITIAL_REGION.latitude,
            longitude: region?.longitude || INITIAL_REGION.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {tasks.map(task => (
            <Marker
              coordinate={{
                latitude: task.lat,
                longitude: task.long,
              }}
              key={task.id}
              onPress={() => console.log('pressed, ', task)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>{task.name}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
        <View className="absolute bottom-32 right-5 gap-4">
          {isTracking ? (
            <View
              className="bg-blue-50 rounded-full  flex items-center justify-center"
              style={{
                elevation: 5,
                width: 70,
                height: 70,
                shadowColor: 'black',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <Navigation
                onPress={() => onLocateMe()}
                fill="white"
                color="black"
                className="bg-white"
                size={40}
              />
            </View>
          ) : null}

          <View
            className="bg-blue-50 rounded-full p-1 flex items-center justify-center"
            style={{
              elevation: 5,
              width: 70,
              height: 70,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            {isTracking ? (
              <Pause
                onPress={() => toggleShareLocation()}
                fill={colors.blue[500]}
                color="black"
                className="bg-white"
                size={50}
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              />
            ) : (
              <Play
                onPress={() => toggleShareLocation()}
                fill={colors.blue[500]}
                color="black"
                className="bg-white"
                size={50}
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
});

const tasks: Task[] = [
  {
    id: '1',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '132',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '1145',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '15231',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '153125',
    name: 'Task One',
    lat: 34.0522,
    long: -118.2437,
  },
  {
    id: '2',
    name: 'Task Two',
    lat: 40.7128,
    long: -74.006,
  },
  {
    id: '3',
    name: 'Task Three',
    lat: 37.7749,
    long: -122.4194,
  },
  {
    id: '4',
    name: 'Task Four',
    lat: 51.5074,
    long: -0.1278,
  },
  {
    id: '5',
    name: 'Task Five',
    lat: 48.8566,
    long: 2.3522,
  },
  {
    id: '6',
    name: 'Task Six',
    lat: 35.6895,
    long: 139.6917,
  },
];
