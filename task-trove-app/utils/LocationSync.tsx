import * as ExpoLocation from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React from 'react';

const LOCATION_TASK_NAME = 'background-location-task';

export const toggleShareLocation = async (
  isTracking: boolean,
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>,
  setRegion: React.Dispatch<React.SetStateAction<{ lat: number; long: number; speed: number }>>,
) => {
  const startLocationUpdates = async () => {
    await ExpoLocation.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: ExpoLocation.Accuracy.Balanced,
      timeInterval: 1000,
      distanceInterval: 1,
      // foregroundService is how you get the task to be updated as often as would be if the app was open
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });

    const hasStarted = await ExpoLocation.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log('Tracking started', hasStarted);
  };

  const stopLocationUpdates = async () => {
    console.log('Tracking stopped');

    TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME).then(tracking => {
      if (tracking) {
        ExpoLocation.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }
    });
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
    }
    if (data) {
      const locations = data.locations;
      const lat = locations[0].coords.latitude;
      const long = locations[0].coords.longitude;
      const speed = locations[0].coords.speed;

      setRegion({ lat, long, speed });

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
