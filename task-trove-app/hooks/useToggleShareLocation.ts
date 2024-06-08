import { useCallback, useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { useRegionStore, useSettingsStore } from '~/store';
import { showGeneralAlert } from '~/utils/alert';
import { router } from 'expo-router';
import { ToastAndroid } from 'react-native';
import useInternetAccess from './useInternetAccess';

type TaskData = {
  locations?: Location.LocationObject[];
};

const TASK_FETCH_LOCATION = 'background-location-task';

TaskManager.defineTask<TaskData>(TASK_FETCH_LOCATION, ({ data, error }) => {
  if (error) {
    showGeneralAlert('LOCATION_TRACKING task ERROR', error.message);
    return;
  }

  if (data.locations && data.locations.length > 0) {
    const locations = data.locations;
    const latitude = locations[0].coords.latitude;
    const longitude = locations[0].coords.longitude;
    const speed = locations[0].coords.speed;
    useRegionStore.getState().setRegion({ latitude, longitude, speed });
  }
});

const useToggleShareLocation = () => {
  const [region, setRegion] = useRegionStore(state => [state.region, state.setRegion]);
  const { isTracking, setIsTracking, item, startTime, endTime, activeDays } = useSettingsStore();
  const { internetStatus } = useInternetAccess();

  useEffect(() => {
    const checkTime = async () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const dayOfWeek = now.getDay() - 1;

      const totalMinutes = hour * 60 + minute;

      if (totalMinutes >= startTime && totalMinutes <= endTime && activeDays.includes(dayOfWeek)) {
        if (!isTracking && internetStatus) {
          await startLocationUpdates();
          setIsTracking(true);
        }
      } else {
        if (isTracking) {
          await stopLocationUpdates();
          setIsTracking(false);
        }
      }
    };

    const intervalId = setInterval(checkTime, 60000);

    return () => clearInterval(intervalId);
  }, [activeDays, endTime, internetStatus, isTracking, setIsTracking, startTime]);

  const startLocationUpdates = async () => {
    await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
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
    ToastAndroid.show(
      hasStarted ? 'Tracking started' : 'Tracking failed to start',
      ToastAndroid.SHORT,
    );
  };

  const stopLocationUpdates = async () => {
    const tracking = await Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION);

    if (tracking) {
      await Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
      ToastAndroid.show('Tracking stopped', ToastAndroid.SHORT);
    }
  };

  const toggleShareLocation = useCallback(async () => {
    if (!item) {
      showGeneralAlert(
        'Location Column Not Correctly Setup',
        'Please go to settings and set it up',
        [{ text: 'Go to Settings', onPress: () => router.replace('/settings/location') }],
      );
      return;
    }

    if (!internetStatus) {
      showGeneralAlert('No Internet Connection', 'Please check your internet connection');
      return;
    }

    if (isTracking) {
      await stopLocationUpdates();
    } else {
      await startLocationUpdates();
    }
    setIsTracking(!isTracking);
  }, [internetStatus, isTracking, item, setIsTracking]);

  return {
    isTracking,
    region,
    setRegion,
    toggleShareLocation,
  };
};

export default useToggleShareLocation;
