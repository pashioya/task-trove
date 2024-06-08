import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const TASK_GEOFENCE_LOCATION = 'background-location-task';

TaskManager.defineTask(TASK_GEOFENCE_LOCATION, ({ data, error }) => {
  if (error) {
    console.error('An error occurred -', error);
    return;
  }
  console.log('Geofencing event:', data.locations);
});

const useGeoFencing = () => {
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
