import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import { updateLocation } from './MondayAPI';

const LOCATION_TASK_NAME = 'background-location-task';

export const toggleShareLocation = async (
  isTracking: boolean,
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>,
  setRegion: React.Dispatch<React.SetStateAction<{ lat: number; long: number; speed: number }>>,
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

    TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME).then(tracking => {
      if (tracking) {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }
    });
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
    }
    if (data) {
      // @ts-ignore
      const locations = data.locations;
      const lat = locations[0].coords.latitude;
      const long = locations[0].coords.longitude;
      const speed = locations[0].coords.speed;

      setRegion({ lat, long, speed });
      updateLocation('1478906273', '1478906281', lat, long, 'realtime location').then(() => {
        console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long} - Speed ${speed}`);
      });
    }
  });

  if (isTracking) {
    await stopLocationUpdates();
  } else {
    await startLocationUpdates();
  }
  setIsTracking(previousState => !previousState);
};
