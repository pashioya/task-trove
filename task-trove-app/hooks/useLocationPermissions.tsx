import { useState, useEffect, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import * as ExpoLocation from 'expo-location';

const useLocationPermissions = () => {
  const [foregroundStatus, setForegroundStatus] = useState<ExpoLocation.PermissionStatus | null>(
    null,
  );
  const [backgroundStatus, setBackgroundStatus] = useState<ExpoLocation.PermissionStatus | null>(
    null,
  );

  const showPermissionAlert = useCallback(() => {
    Alert.alert(
      'Location Permission Needed',
      'This app requires location access to function correctly. Please consider granting permission.',
      [
        {
          text: 'Settings',
          onPress: async () => await Linking.openSettings(),
        },
        { text: 'Cancel' },
      ],
    );
  }, []);

  const requestPermissions = useCallback(async () => {
    const { status: fgStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
    setForegroundStatus(fgStatus);
    if (fgStatus === 'granted') {
      const { status: bgStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
      setBackgroundStatus(bgStatus);
      console.log('backgroundStatus', bgStatus);
      if (bgStatus !== 'granted') {
        console.log('Background location permission not granted');
        showPermissionAlert();
      }
    } else {
      console.log('Foreground location permission not granted');
      showPermissionAlert();
    }
  }, [showPermissionAlert]);

  useEffect(() => {
    requestPermissions();
  }, [requestPermissions]);

  return { foregroundStatus, backgroundStatus };
};

export default useLocationPermissions;
