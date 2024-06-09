import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

type TaskData = {
  eventType: Location.GeofencingEventType;
  region: Location.LocationRegion;
};

const TASK_GEOFENCE_LOCATION = 'geofence-location-task';

TaskManager.defineTask<TaskData>(
  TASK_GEOFENCE_LOCATION,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      console.error('An error occurred -', error);
      return;
    }
    if (region.state === Location.LocationGeofencingRegionState.Inside) {
      // do whatever if user is outside the region
    }

    if (region.state === Location.LocationGeofencingRegionState.Outside) {
      // do whatever if user is outside the region
    }

    if (
      eventType === Location.GeofencingEventType.Enter &&
      region.state === Location.LocationGeofencingRegionState.Outside
    ) {
      console.log('You have entered region:', region);
    } else if (
      eventType === Location.GeofencingEventType.Exit &&
      region.state === Location.LocationGeofencingRegionState.Inside
    ) {
      console.log('You have left region:', region);
    }
  },
);

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
