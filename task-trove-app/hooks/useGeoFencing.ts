import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import useNotifications from './useNotifications';
import { useTasksStore } from '~/store';
import { showGeneralAlert } from '~/utils/alert';

type TaskData = {
  eventType: Location.GeofencingEventType;
  region: Location.LocationRegion;
};

const TASK_GEOFENCE_LOCATION = 'geofence-location-task';

// Create a context to hold the triggerNotification function
let triggerNotification: (title: string, body: string) => void;

TaskManager.defineTask<TaskData>(
  TASK_GEOFENCE_LOCATION,
  ({ data: { eventType, region }, error }) => {
    const { tasks } = useTasksStore();

    if (error) {
      console.error('An error occurred -', error);
      return;
    }

    if (
      eventType === Location.GeofencingEventType.Enter &&
      region.state === Location.LocationGeofencingRegionState.Outside
    ) {
      if (region.identifier && tasks) {
        const task = tasks.find(task => task.id === region.identifier);
        triggerNotification(`You are near ${task?.name || ''}`, task?.description || '');
      }
    } else if (
      eventType === Location.GeofencingEventType.Exit &&
      region.state === Location.LocationGeofencingRegionState.Inside
    ) {
      if (region.identifier && tasks) {
        const task = tasks.find(task => task.id === region.identifier);
        triggerNotification(
          `Don't forget to update the status of ${task?.name || ''} in monday if you have completed it`,
          task?.description || '',
        );
      }
    }
  },
);

const useGeoFencing = () => {
  const { scheduleNotification } = useNotifications();

  triggerNotification = (title: string, body: string) => {
    scheduleNotification(title, body);
  };

  const setGeofencing = async (regions: Location.LocationRegion[]) => {
    console.log('Setting geofencing');
    await Location.startGeofencingAsync(TASK_GEOFENCE_LOCATION, regions);
  };

  const removeGeofencing = async () => {
    if (await Location.hasStartedGeofencingAsync(TASK_GEOFENCE_LOCATION))
      await Location.stopGeofencingAsync(TASK_GEOFENCE_LOCATION);
  };

  return { setGeofencing, removeGeofencing };
};

export default useGeoFencing;
