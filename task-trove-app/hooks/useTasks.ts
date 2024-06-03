import { useEffect, useState, type SetStateAction } from 'react';
import { useMondayQuery } from '~/lib/monday/api';
import { fetchTasksQuery } from '~/lib/monday/queries';
import type { Task, TaskItem } from '~/model/types';
import { useSettingsStore } from '~/store';
import showAlert from '~/utils/ShowAlert';

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [tableTasks, setTableTasks] = useState<Task[]>([]);

  const { taskBoard, taskColumn } = useSettingsStore();

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

    tasks.map(task => {
      const value = task.column_values[0].value;
      if (value) {
        const jsonValue = JSON.parse(value) as Position;
        const reformattedTask = {
          id: task.id,
          name: task.name,
          lat: jsonValue.lat,
          long: jsonValue.lng,
          address: task.column_values[0].text || '',
        } as Task;
        reformattedTasks.push(reformattedTask);
      }
    });
    setTableTasks(reformattedTasks);
  }, [itemsAreLoading, itemsData, itemsError, itemsIsError, tasks]);

  return { tableTasks };
};

export default useTasks;
