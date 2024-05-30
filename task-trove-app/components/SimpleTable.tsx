import { useEffect, useMemo, useState } from 'react';
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
import type { Task } from '~/model/types';
import { useSettingsStore } from '~/store';
import showAlert from '~/utils/ShowAlert';

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function SimpleTable() {
  const { width } = useWindowDimensions();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [columnNames, setColumnNames] = useState<string[]>([]);

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

    console.log(itemsData.boards[0]?.items_page.items[0].column_values);

    const columnNames = items[0].column_values.map(column => column.id.toString() || '');
    setColumnNames(columnNames);
    //TODO: fix types (Type string | null is not assignable to type string)
    const columns = items[0].column_values.map((column, index) => {
      return {
        id: column.id.toString() || '',
        title: column.text,
        value: column.value,
      };
    });
    //TODO: put columns in column_values
    setTasks(items);

  }, [itemIsLoading, itemsData, itemsError, itemsIsError]);

  const columnWidths = useMemo(() => {
    return MIN_COLUMN_WIDTHS.map(minWidth => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

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
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell style={{ width: columnWidths[0] * 2 }}>
                <Text>{task.name}</Text>
              </TableCell>
              <TableCell style={{ width: columnWidths[1] }}>
                <Text>{task.column_values[0].value}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
}
