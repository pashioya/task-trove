import { useEffect, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import * as ExpoLocation from 'expo-location';

const useLocationPermissions = () => {
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
    if (fgStatus === 'granted') {
      const { status: bgStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
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

  return { requestPermissions };
};

export default useLocationPermissions;
