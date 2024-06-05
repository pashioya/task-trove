import { useCallback } from 'react';
import { Linking } from 'react-native';
import * as ExpoLocation from 'expo-location';
import { showGeneralAlert } from '~/utils/alert';

const useLocationPermissions = () => {
  const showPermissionAlert = useCallback(() => {
    showGeneralAlert(
      'Location Permission Needed',
      'This app requires location access to function correctly. Please consider granting permission.',
      [
        {
          text: 'Settings',
          onPress: async () => await Linking.openSettings(),
        },
      ],
    );
  }, []);

  const requestPermissions = useCallback(async () => {
    const { status: fgStatus } = await ExpoLocation.requestForegroundPermissionsAsync();

    if (fgStatus !== 'granted') {
      showPermissionAlert();
      return;
    }
    const { status: bgStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();

    if (bgStatus !== 'granted') {
      showPermissionAlert();
    }
  }, [showPermissionAlert]);

  const validatePermissions = useCallback(async () => {
    const { status: fgStatus } = await ExpoLocation.getForegroundPermissionsAsync();
    if (fgStatus !== 'granted') {
      return false;
    }
    const { status: bgStatus } = await ExpoLocation.getBackgroundPermissionsAsync();
    if (bgStatus !== 'granted') {
      return false;
    }
    return true;
  }, []);

  return { requestPermissions, validatePermissions };
};

export default useLocationPermissions;
