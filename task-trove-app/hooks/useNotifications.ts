/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as Notifications from 'expo-notifications';

const useNotifications = () => {
  const requestPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log(status);
    }
  };

  const setupNotificationChannel = async () => {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const handleNotification = async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  });

  const scheduleNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  };

  // Initial setup
  requestPermissions();
  setupNotificationChannel();

  Notifications.setNotificationHandler({
    handleNotification,
  });

  return { scheduleNotification };
};

export default useNotifications;
