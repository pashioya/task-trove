import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';

// Function to request location permissions and get the current position
const getCurrentLocation = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }
  return await Location.getCurrentPositionAsync({});
};

// Function to get the last known location
const getLastKnownLocation = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }
  return await Location.getLastKnownPositionAsync({});
};

const useLastKnownLocation = () => {
  return useQuery({
    queryKey: ['lastKnownLocation'],
    queryFn: getLastKnownLocation,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
    refetchInterval: 1000,
  });
};

const useCurrentLocation = () => {
  return useQuery({
    queryKey: ['currentLocation'],
    queryFn: getCurrentLocation,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
    refetchInterval: 1000,
  });
};

const useUserLocation = () => {
  const {
    data: currentLocation,
    error: currentError,
    isLoading: currentLoading,
  } = useCurrentLocation();

  const {
    data: lastKnownLocation,
    error: lastKnownLocationError,
    isLoading: lastKnownLocationLoading,
  } = useLastKnownLocation();

  return {
    currentLocation,
    currentError,
    currentLoading,
    lastKnownLocation,
    lastKnownLocationError,
    lastKnownLocationLoading,
  };
};

export default useUserLocation;
