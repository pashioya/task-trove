import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import useNotifications from './useNotifications';

type TaskData = {
  eventType: Location.GeofencingEventType;
  region: Location.LocationRegion;
};

const TASK_GEOFENCE_LOCATION = 'geofence-location-task';
// eslint-disable-next-line react-hooks/rules-of-hooks
const { scheduleNotification } = useNotifications();

TaskManager.defineTask<TaskData>(
  TASK_GEOFENCE_LOCATION,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      console.error('An error occurred -', error);
      return;
    }
    if (region.state === Location.LocationGeofencingRegionState.Inside) {
      console.log('You are inside region:', region);
    }

    if (region.state === Location.LocationGeofencingRegionState.Outside) {
      console.log('You are outside region:', region);
    }

    if (
      eventType === Location.GeofencingEventType.Enter &&
      region.state === Location.LocationGeofencingRegionState.Outside
    ) {
      triggerNotification('You have entered region of task: ', region.identifier || '');
    } else if (
      eventType === Location.GeofencingEventType.Exit &&
      region.state === Location.LocationGeofencingRegionState.Inside
    ) {
      triggerNotification('You have exited region of task: ', region.identifier || '');
    }
  },
);

const triggerNotification = (title: string, body: string) => {
  scheduleNotification(title, body);
};

const useGeoFencing = () => {
  const setGeofencing = async (regions: Location.LocationRegion[]) => {
    await Location.startGeofencingAsync(TASK_GEOFENCE_LOCATION, regions);
  };

  const removeGeofencing = async () => {
    if (await Location.hasStartedGeofencingAsync(TASK_GEOFENCE_LOCATION))
      await Location.stopGeofencingAsync(TASK_GEOFENCE_LOCATION);
  };

  return { setGeofencing, removeGeofencing };
};

export default useGeoFencing;
