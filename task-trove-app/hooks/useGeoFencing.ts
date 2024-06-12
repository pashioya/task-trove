import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import useNotifications from './useNotifications';
import { useTasksStore } from '~/store';
import { showGeneralAlert } from '~/utils/alert';
import { useEffect } from 'react';

type TaskData = {
  eventType: Location.GeofencingEventType;
  region: Location.LocationRegion;
};

const TASK_GEOFENCE_LOCATION = 'geofence-location-task';

const useGeoFencing = () => {
  const { scheduleNotification } = useNotifications();
  const { tasks } = useTasksStore();

  const triggerNotification = (title: string, body: string) => {
    scheduleNotification(title, body);
  };

  const defineGeofenceTask = () => {
    TaskManager.defineTask<TaskData>(TASK_GEOFENCE_LOCATION, ({ data, error }) => {
      if (error) {
        showGeneralAlert('An error occurred', error.message);
        return;
      }
      const { eventType, region } = data;
      const task = tasks?.find(task => task.id === region.identifier);

      if (!task) return;

      if (
        eventType === Location.GeofencingEventType.Enter &&
        region.state === Location.GeofencingRegionState.Inside &&
        !task.notified
      ) {
        triggerNotification(`You are near ${task.name || ''}`, task.description || '');
        task.notified = true;
      } else if (
        eventType === Location.GeofencingEventType.Exit &&
        region.state === Location.GeofencingRegionState.Inside
      ) {
        triggerNotification(
          'Reminder:',
          `Don't forget to update the status of ${task.name || ''} in Monday if you have completed it`,
        );
        task.notified = false;
      }
    });
  };

  useEffect(() => {
    defineGeofenceTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setGeofencing = async (regions: Location.LocationRegion[]) => {
    await Location.startGeofencingAsync(TASK_GEOFENCE_LOCATION, regions);
  };

  const removeGeofencing = async () => {
    if (await Location.hasStartedGeofencingAsync(TASK_GEOFENCE_LOCATION)) {
      await Location.stopGeofencingAsync(TASK_GEOFENCE_LOCATION);
    }
  };

  return { setGeofencing, removeGeofencing };
};

export default useGeoFencing;
