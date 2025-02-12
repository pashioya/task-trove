/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { useToggleShareLocation, useTasks, useLocationPermissions } from '~/hooks';
import { useMondayMutation } from '~/lib/monday/api';
import { changeMultipleColumnValuesMutation } from '~/lib/monday/queries';
import { useSettingsStore } from '~/store';
import { INITIAL_REGION } from '~/config/map-config';
import lightStyle from '~/assets/map/lightStyle.json';
import darkStyle from '~/assets/map/darkStyle.json';
import { useColorScheme } from '~/lib/useColorScheme';
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import colors from 'tailwindcss/colors';

import { Text } from '~/components/ui/text';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '~/components/ui/button';
import useUserLocation from '~/hooks/useUserLocation';
import { showGeneralAlert } from '~/utils/alert';
import useInternetAccess from '~/hooks/useInternetAccess';
import NavigateButton from '~/components/NavigateButton';
import PausePlayButton from '~/components/PausePlayButton';

type Cluster = {
  id: string;
  geometry: {
    coordinates: [number, number];
  };
  onPress: () => void;
  properties: {
    point_count: number;
  };
};

export default function Home() {
  const { isTracking, region, toggleShareLocation } = useToggleShareLocation();
  const { lastKnownLocation, lastKnownLocationLoading } = useUserLocation();
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const { tasks } = useTasks();
  const params = useLocalSearchParams<{ taskID?: string }>();
  const { internetStatus } = useInternetAccess();

  const mapRef = useRef<MapView>(null);
  const { board, column, item } = useSettingsStore();

  const { mutate: updateLocation, error: updateLocationError } = useMondayMutation({
    mutation: changeMultipleColumnValuesMutation,
  });
  const { validatePermissions } = useLocationPermissions();

  useEffect(() => {
    const checkPermissionsStatus = async () => {
      const permissionsGranted = await validatePermissions();
      if (!permissionsGranted) {
        router.replace('/(onboarding)/permission-1');
      }
    };

    checkPermissionsStatus();
  }, [router, validatePermissions]);

  useEffect(() => {
    if (isTracking && region && board && column && item && internetStatus?.isConnected) {
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
  }, [region, isTracking, board, column, item, updateLocation, internetStatus]);

  useEffect(() => {
    if (updateLocationError) {
      showGeneralAlert('An unexpected Location Update error occurred', updateLocationError.message);
    }
  }, [updateLocationError]);

  useEffect(() => {
    if (!item) {
      showGeneralAlert(
        'Location Column Not Correctly Setup',
        'Please go to settings and set it up',
        [
          {
            text: 'Settings',
            onPress: () => {
              router.replace('/settings/location');
            },
          },
        ],
      );
    }
  }, [item, router]);

  const onLocateMe = () => {
    try {
      const location = lastKnownLocation;

      if (location) {
        // @ts-expect-error --ignore
        mapRef.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        // @ts-expect-error --ignore
        mapRef.current?.animateToRegion(INITIAL_REGION);
      }
    } catch (e) {
      if (e instanceof Error) {
        showGeneralAlert('Error', e.message);
      }
    }
  };

  if (params.taskID) {
    const task = tasks?.find(t => t.id === params.taskID);
    if (task) {
      // @ts-expect-error --ignore
      mapRef.current?.animateToRegion({
        latitude: Number(task.lat),
        longitude: Number(task.long),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    router.setParams({ taskID: '' });
  }

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
          mapPadding={{ top: 100, right: 0, left: 0, bottom: 0 }}
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          toolbarEnabled={false}
          renderCluster={(cluster: Cluster) => {
            const { id, geometry, onPress, properties } = cluster;
            const points = properties.point_count;
            return (
              <Marker
                key={`cluster-${id}`}
                tracksViewChanges={false}
                coordinate={{
                  longitude: geometry.coordinates[0],
                  latitude: geometry.coordinates[1],
                }}
                onPress={onPress}
              >
                <View className="p-1 items-center justify-center shadow-xl bg-primary rounded-lg">
                  <Text className="text-lg text-center text-white">{points}</Text>
                </View>
              </Marker>
            );
          }}
        >
          {tasks?.map(task => (
            <Marker
              tracksViewChanges={false}
              coordinate={{
                latitude: Number(task.lat),
                longitude: Number(task.long),
              }}
              key={task.id}
            >
              <MaterialCommunityIcons name="map-marker-check" size={40} color={colors.blue[500]} />
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
        <View className="absolute bottom-36 right-5 gap-4">
          {isTracking ? (
            <NavigateButton
              lastKnownLocationLoading={lastKnownLocationLoading}
              isDarkColorScheme={isDarkColorScheme}
              onLocateMe={onLocateMe}
            />
          ) : null}
          <PausePlayButton
            isDarkColorScheme={isDarkColorScheme}
            internetConnected={internetStatus?.isConnected || false}
            isTracking={isTracking}
            toggleShareLocation={toggleShareLocation}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
