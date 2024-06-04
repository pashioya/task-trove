import { useEffect, useState, type SetStateAction } from 'react';
import { useMondayQuery } from '~/lib/monday/api';
import { fetchTasksQuery } from '~/lib/monday/queries';
import type { Task, TaskItem } from '~/model/types';
import { useSettingsStore } from '~/store';
import showAlert from '~/utils/ShowAlert';
import * as ExpoLocation from 'expo-location';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [tableTasks, setTableTasks] = useState<Task[]>([]);
  const { taskBoard, taskColumn } = useSettingsStore();
  const [currentLocation, setCurrentLocation] = useState({ coords: { latitude: 0, longitude: 0 } });

  const {
    data: itemsData,
    isLoading: itemsAreLoading,
    isError: itemsIsError,
    error: itemsError,
  } = useMondayQuery({
    queryKey: [taskBoard?.id || '', 'taskItems'],
    query: fetchTasksQuery,
    variables: { boardId: taskBoard?.id || '', columnId: taskColumn?.id || '' },
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (itemsAreLoading) {
      return;
    }
    if (itemsIsError) {
      showAlert(itemsError);
      return;
    }

    if (!itemsData || !itemsData.boards || !itemsData.boards[0]) return;
    const items = itemsData.boards[0]?.items_page.items;

    setTasks(items);

    type Position = {
      address: string;
      changed_at: string;
      lat: number;
      lng: number;
    };

    const reformattedTasks: SetStateAction<Task[]> = [];

    const getLocation = async () => {
      try {
        setCurrentLocation(await ExpoLocation.getCurrentPositionAsync({}));
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();

    tasks.map(task => {
      const value = task.column_values[0].value;
      if (value) {
        const jsonValue = JSON.parse(value) as Position;

        let distance = calculateDistance(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          jsonValue.lat,
          jsonValue.lng,
        );
        distance = Math.round(distance * 1000) / 1000;
        const reformattedTask = {
          id: task.id,
          name: task.name,
          lat: jsonValue.lat,
          long: jsonValue.lng,
          address: jsonValue.address || '',
          changedAt: jsonValue.changed_at || '',
          distanceTo: distance,
        } as Task;
        reformattedTasks.push(reformattedTask);
      }
    });

    // Sort tasks by distance
    reformattedTasks.sort((a, b) => a.distanceTo - b.distanceTo);

    setTableTasks(reformattedTasks);
  }, [itemsAreLoading, itemsData, itemsError, currentLocation, itemsIsError, tasks]);

  return { tableTasks, itemsAreLoading };
};

export default useTasks;
