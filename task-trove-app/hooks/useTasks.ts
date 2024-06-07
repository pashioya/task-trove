import { useEffect, useState } from 'react';
import { useMondayQuery } from '~/lib/monday/api';
import { fetchTasksQuery } from '~/lib/monday/queries';
import type { Task, TaskItem } from '~/model/types';
import { useSettingsStore } from '~/store';
import { showMondayAlert } from '~/utils/mondayErrorHandling';
import useUserLocation from './useUserLocation';

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

type Position = {
  address: string;
  changed_at: string;
  lat: number;
  lng: number;
};

const useTasks = () => {
  const [tableTasks, setTableTasks] = useState<Task[]>([]);
  const { taskBoard, taskColumn, descriptionColumnId } = useSettingsStore();
  const { currentLocation } = useUserLocation();

  const {
    data: itemsData,
    isLoading: itemsAreLoading,
    isError: itemsIsError,
    error: itemsError,
  } = useMondayQuery({
    queryKey: [taskBoard?.id || '', 'taskItems'],
    query: fetchTasksQuery,
    variables: {
      boardId: taskBoard?.id || '',
      columnId: taskColumn?.id || '',
      descriptionColumnId,
    },
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (itemsAreLoading || itemsIsError || !currentLocation) {
      if (itemsIsError) showMondayAlert(itemsError);
      return;
    }

    if (!itemsData || !itemsData.boards || !itemsData.boards[0]) return;
    const items = itemsData.boards[0]?.items_page.items;

    const reformattedTasks: Task[] = items
      .map((task: TaskItem) => {
        const descriptionColumn = task.column_values.filter(
          column => column.id === descriptionColumnId,
        );
        const locationColumn = task.column_values.filter(column => column.id === taskColumn?.id);
        const description = descriptionColumn[0]?.text || '';
        const value = locationColumn[0].value;
        if (value) {
          const jsonValue = JSON.parse(value) as Position;
          let distance = calculateDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            jsonValue.lat,
            jsonValue.lng,
          );
          distance = Math.round(distance * 1000) / 1000;
          return {
            id: task.id,
            name: task.name,
            description,
            lat: jsonValue.lat,
            long: jsonValue.lng,
            address: jsonValue.address || '',
            changedAt: jsonValue.changed_at || '',
            distanceTo: distance,
          };
        }
        return null;
      })
      .filter(task => task !== null) as Task[];

    // Sort tasks by distance
    reformattedTasks.sort((a, b) => a.distanceTo - b.distanceTo);

    setTableTasks(reformattedTasks);
  }, [
    itemsData,
    currentLocation,
    itemsAreLoading,
    itemsIsError,
    itemsError,
    descriptionColumnId,
    taskColumn?.id,
  ]);

  return { tableTasks, itemsAreLoading };
};

export default useTasks;
