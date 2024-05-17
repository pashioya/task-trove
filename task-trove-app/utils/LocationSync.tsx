import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import type React from 'react';
import { updateLocation } from './MondayAPI';

const LOCATION_TASK_NAME = 'background-location-task';

export const toggleShareLocation = async (
  isTracking: boolean,
  setIsTracking: (value: boolean) => void,
  setRegion: React.Dispatch<React.SetStateAction<{ lat: number; long: number; speed: number }>>,
  boardId: string,
  columnId: string,
  itemId: string,
) => {
  const startLocationUpdates = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 10000,
      distanceInterval: 10,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log('Tracking started', hasStarted);
  };

  const stopLocationUpdates = async () => {
    console.log('Tracking stopped');

    try {
      const tracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

      if (tracking) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }
    } catch (error) {
      console.error('Error stopping location updates', error);
    }
  };

  TaskManager.defineTask<{
    locations?: { coords: { latitude: number; longitude: number; speed: number } }[];
  }>(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
    }
    if (data.locations && data.locations.length > 0) {
      const locations = data.locations;
      const lat = locations[0].coords.latitude;
      const long = locations[0].coords.longitude;
      const speed = locations[0].coords.speed;

      setRegion({ lat, long, speed });

      try {
        await updateLocation(boardId, columnId, itemId, lat, long, 'realtime location');
        console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long} - Speed ${speed}`);
      } catch (error) {
        console.error('Error updating location', error);
      }
    }
  });

  if (isTracking) {
    await stopLocationUpdates();
  } else {
    await startLocationUpdates();
  }
  setIsTracking(!isTracking);
};
