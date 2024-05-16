import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import type React from 'react';
import { updateLocation } from './MondayAPI';

const TASK_FETCH_LOCATION = 'background-location-task';

export const toggleShareLocation = async (
  isTracking: boolean,
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>,
  setRegion: React.Dispatch<React.SetStateAction<{ lat: number; long: number; speed: number }>>,
  boardId: string,
  columnId: string,
  itemId: string,
  updateError: (message: string) => void,
) => {
  const startLocationUpdates = async () => {
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 10000,
      distanceInterval: 10,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION);
    console.log('Tracking started', hasStarted);
  };

  const stopLocationUpdates = async () => {
    console.log('Tracking stopped');

    try {
      const tracking = await Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION);

      if (tracking) {
        await Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
      }
    } catch (error) {
      console.error('Error stopping location updates', error);
    }
  };

  TaskManager.defineTask<{
    locations?: { coords: { latitude: number; longitude: number; speed: number } }[];
  }>(TASK_FETCH_LOCATION, async ({ data, error }) => {
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
      } catch (error) {
        if (error instanceof Error) {
          updateError(error.message);
        }
      }
      console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long} - Speed ${speed}`);
    }
  });

  if (isTracking) {
    await stopLocationUpdates();
  } else {
    await startLocationUpdates();
  }
  setIsTracking(previousState => !previousState);
};
