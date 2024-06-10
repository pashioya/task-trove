import { useCallback } from 'react';
import * as Notifications from 'expo-notifications';

const useNotificationPermissions = () => {
  const requestPermissions = useCallback(async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log(status);
    }
  }, []);

  const validatePermissions = useCallback(async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }
    return true;
  }, []);

  return { requestPermissions, validatePermissions };
};

export default useNotificationPermissions;
