import * as React from 'react';
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
import { fetchItemsQuery } from '~/lib/monday/queries';
import { useSettingsStore } from '~/store';

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function SimpleTable() {
  const { width } = useWindowDimensions();

  const { taskBoard } = useSettingsStore();

  const {
    data: itemsData,
    isLoading: itemIsLoading,
    isError: itemsIsError,
    error: itemsError,
  } = useMondayQuery({
    queryKey: [taskBoard?.id || '', 'items'],
    query: fetchItemsQuery,
    variables: { boardId: taskBoard?.id || '' },
  });

  useEffect(() => {
    if (itemsIsError) {
      showAlert(itemsError);
    } else
  }, []);

  const columnWidths = React.useMemo(() => {
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
            <TableHead className="px-0.5" style={{ width: columnWidths[0] }}>
              <Text>Invoice</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[1] }}>
              <Text>Status</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[2] }}>
              <Text>Method</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[3] }}>
              <Text className="text-center md:text-right md:pr-5">Amount</Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: columnWidths[0] }}>
              <Text>INV-001</Text>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollView>
  );
}
