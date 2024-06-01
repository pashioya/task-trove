import { useMemo } from 'react';
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
import { useTasks } from '~/hooks';

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function SimpleTable() {
  const { width } = useWindowDimensions();
  const { tableTasks } = useTasks();

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
          {tableTasks.map(task => (
            <TableRow key={task.id}>
              <TableCell style={{ width: columnWidths[0] * 2 }}>
                <Text>{task.name}</Text>
              </TableCell>
              <TableCell style={{ width: columnWidths[1] }}>
                <Text>{task.address}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
}
