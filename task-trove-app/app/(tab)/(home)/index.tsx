/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
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

import { Play, Navigation, Pause } from 'lucide-react-native';
import * as ExpoLocation from 'expo-location';
import * as NavigationBar from 'expo-navigation-bar';
import colors from 'tailwindcss/colors';

import { Text } from '~/components/ui/text';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '~/components/ui/button';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
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

  const { isTracking, region, toggleShareLocation } = useToggleShareLocation();
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const { tableTasks } = useTasks();
  const local = useLocalSearchParams();

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
    // @ts-expect-error --ignore
    mapRef.current?.animateToRegion({
      latitude: Number(task?.lat),
      longitude: Number(task?.long),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }

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
  const locateMeBounceValue = useSharedValue(1);
  const playPauseBounceValue = useSharedValue(1);

  const locateMeBounceAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(locateMeBounceValue.value) }],
    };
  });

  const playPauseBounceAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(playPauseBounceValue.value) }],
    };
  });
  const handleLocateMeBounce = () => {
    locateMeBounceValue.value = 0.8;
    setTimeout(() => {
      locateMeBounceValue.value = 1;
    }, 100);
  };

  const handlePlayPauseBounce = () => {
    playPauseBounceValue.value = 0.8;
    setTimeout(() => {
      playPauseBounceValue.value = 1;
    }, 100);
  };

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
          {tableTasks.map(task => (
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
        <View className="absolute bottom-44 right-5 gap-4">
          {isTracking ? (
            <Animated.View
              style={locateMeBounceAnimation}
              className="bg-secondary rounded-full h-[70px] w-[70px] shadow-lg flex items-center justify-center"
            >
              <Navigation
                onPress={() => {
                  handleLocateMeBounce();
                  onLocateMe();
                }}
                color={isDarkColorScheme ? colors.neutral[100] : colors.blue[500]}
                fill={isDarkColorScheme ? colors.gray[100] : colors.blue[500]}
                className="bg-white"
                size={30}
              />
            </Animated.View>
          ) : null}

          <Animated.View
            style={playPauseBounceAnimation}
            className="bg-primary shadow-2xl rounded-full h-[70px] w-[70px] flex items-center justify-center"
          >
            {isTracking ? (
              <Pause
                onPress={() => {
                  handlePlayPauseBounce();
                  toggleShareLocation();
                }}
                color={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                fill={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                className="bg-primary shadow-2xl"
                size={30}
              />
            ) : (
              <Play
                onPress={() => {
                  handlePlayPauseBounce();
                  toggleShareLocation();
                }}
                color={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                fill={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
                className="bg-primary shadow-2xl"
                size={30}
              />
            )}
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
}
