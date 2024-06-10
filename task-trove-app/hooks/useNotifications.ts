import * as Notifications from 'expo-notifications';

const useNotifications = () => {
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
    shouldPlaySound: true,
    shouldSetBadge: true,
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
  setupNotificationChannel();

  Notifications.setNotificationHandler({
    handleNotification,
  });

  return { scheduleNotification };
};

export default useNotifications;
