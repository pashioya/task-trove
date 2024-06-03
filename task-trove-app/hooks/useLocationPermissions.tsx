import { useCallback, useState } from 'react';
import { Alert, Linking } from 'react-native';
import * as ExpoLocation from 'expo-location';

const useLocationPermissions = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

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

    if (fgStatus !== 'granted') {
      setPermissionsGranted(false);
      showPermissionAlert();
      return;
    }
    const { status: bgStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();

    if (bgStatus !== 'granted') {
      setPermissionsGranted(false);
      showPermissionAlert();
      return;
    }
    setPermissionsGranted(true);
  }, [showPermissionAlert]);

  const validatePermissions = useCallback(async () => {
    const { status: fgStatus } = await ExpoLocation.getForegroundPermissionsAsync();
    if (fgStatus !== 'granted') {
      setPermissionsGranted(false);
      return false;
    }
    const { status: bgStatus } = await ExpoLocation.getBackgroundPermissionsAsync();
    if (bgStatus !== 'granted') {
      setPermissionsGranted(false);
      return false;
    }
    setPermissionsGranted(true);
    return true;
  }, []);

  return { requestPermissions, validatePermissions, permissionsGranted };
};

export default useLocationPermissions;
