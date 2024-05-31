import { useEffect, useMemo, useState, type SetStateAction } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Text } from '~/components/ui/text';
import { useMondayQuery } from '~/lib/monday/api';
import { fetchTasksQuery } from '~/lib/monday/queries';
import type { TaskItem, Task } from '~/model/types';
import { useSettingsStore } from '~/store';
import showAlert from '~/utils/ShowAlert';

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function SimpleTable() {
  const { width } = useWindowDimensions();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [tableTasks, setTableTasks] = useState<Task[]>([]);

  const { taskBoard } = useSettingsStore();

  const {
    data: itemsData,
    isLoading: itemIsLoading,
    isError: itemsIsError,
    error: itemsError,
  } = useMondayQuery({
    queryKey: [taskBoard?.id || '', 'taskItems'],
    query: fetchTasksQuery,
    variables: { boardId: taskBoard?.id || '' },
  });

  useEffect(() => {
    if (itemIsLoading) {
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
        } as Task;
        reformattedTasks.push(reformattedTask);
      }
    });
    setTableTasks(reformattedTasks);
  }, [itemIsLoading, itemsData, itemsError, itemsIsError, tasks]);

  const columnWidths = useMemo(() => {
    return MIN_COLUMN_WIDTHS.map(minWidth => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  console.log(tableTasks);
  return (
    <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
      <Table aria-labelledby="invoice-table">
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: columnWidths[0] * 2 }}>
              <Text>Task Name</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[1] }}>
              <Text>Task Location</Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableTasks.map(task => (
            <TableRow key={task.id}>
              <TableCell style={{ width: columnWidths[0] * 2 }}>
                <Text>{task.name}</Text>
              </TableCell>
              <TableCell style={{ width: columnWidths[1] }}>
                <Text>
                  {task.lat}, {task.long}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
}
